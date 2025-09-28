import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import colors from "../../../theme/colors";
import styles from "./styles";

const HOBART_TZ = "Australia/Hobart";
const WEEKDAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CHART_HEIGHT = 168;
const CHART_VERTICAL_PADDING = 20;
const CHART_HORIZONTAL_PADDING = 16;
const GRID_LINE_COUNT = 4;
const AXIS_LABEL_WIDTH = 60;
const TOOLTIP_HEIGHT = 52;

const getDateParts = (date) => {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: HOBART_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const partValue = (type) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: partValue("year"),
    month: partValue("month"),
    day: partValue("day"),
  };
};

const createDateFromKey = (dateKey) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const buildFallbackTrend = (tickFormatter, axisFormatter) => {
  const now = new Date();
  const currentLabel = tickFormatter.format(now);
  const offset = WEEKDAY_ORDER.indexOf(currentLabel);
  const template = [];

  for (let i = 0; i < WEEKDAY_ORDER.length; i += 1) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + (i - offset));
    date.setUTCHours(0, 0, 0, 0);

    const parts = getDateParts(date);
    template.push({
      date,
      dateKey: `${parts.year}-${parts.month}-${parts.day}`,
      label: WEEKDAY_ORDER[i],
      axisLabel: axisFormatter.format(date),
      value: 0,
    });
  }

  return template;
};

const formatNumber = (value) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const formatWithPrecision = (num, precision) => {
    const str = num.toFixed(precision);
    if (!str.includes(".")) return str;
    return str.replace(/0+$/, "").replace(/\.$/, "");
  };

  if (abs >= 1_000_000_000) {
    return `${sign}${formatWithPrecision(abs / 1_000_000_000, 1)}B`;
  }

  if (abs >= 1_000_000) {
    return `${sign}${formatWithPrecision(abs / 1_000_000, 1)}M`;
  }

  if (abs >= 1_000) {
    return `${sign}${formatWithPrecision(abs / 1_000, 1)}K`;
  }

  if (abs >= 100) {
    return `${sign}${formatWithPrecision(abs, 0)}`;
  }

  if (abs >= 1) {
    return `${sign}${formatWithPrecision(abs, 1)}`;
  }

  if (abs >= 0.01) {
    return `${sign}${formatWithPrecision(abs, 2)}`;
  }

  if (abs > 0) {
    return `${sign}${formatWithPrecision(abs, 3)}`;
  }

  return "0";
};

const formatValue = (value) => `${formatNumber(value)} kg CO₂`;

const ImpactChart = ({ weeklyTrend = [], baseline = 0, total = 0 }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const tickFormatter = useMemo(
    () => new Intl.DateTimeFormat("en-AU", { timeZone: HOBART_TZ, weekday: "short" }),
    []
  );

  const axisFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-AU", {
        timeZone: HOBART_TZ,
        month: "short",
        day: "numeric",
      }),
    []
  );

  const mappedTrend = useMemo(() => {
    return weeklyTrend
      .map((point) => {
        const dateKey = point.dateKey ?? point.day;
        if (!dateKey) {
          return null;
        }
        const date = createDateFromKey(dateKey);
        const label = point.label ?? tickFormatter.format(date);
        return {
          date,
          dateKey,
          label,
          value: point.value ?? 0,
          axisLabel: axisFormatter.format(date),
        };
      })
      .filter(Boolean);
  }, [axisFormatter, tickFormatter, weeklyTrend]);

  const sortedTrend = useMemo(() => {
    if (mappedTrend.length === 0) {
      return buildFallbackTrend(tickFormatter, axisFormatter);
    }

    return [...mappedTrend].sort((a, b) => a.date - b.date);
  }, [axisFormatter, mappedTrend, tickFormatter]);

  const hasPositiveData = sortedTrend.some((point) => point.value > 0);
  const baselinePerDay = sortedTrend.length ? baseline / sortedTrend.length : 0;

  const safeMax = useMemo(() => {
    const values = sortedTrend.map((point) => point.value ?? 0);
    const maxTrendValue = values.length ? Math.max(...values) : 0;
    const rawMax = Math.max(maxTrendValue, baselinePerDay);
    const padded = rawMax * 1.15;
    return padded > 0 ? padded : 1;
  }, [baselinePerDay, sortedTrend]);

  const plotWidth = useMemo(
    () => Math.max(containerWidth - CHART_HORIZONTAL_PADDING * 2, 0),
    [containerWidth]
  );

  const plotHeight = Math.max(CHART_HEIGHT - CHART_VERTICAL_PADDING * 2, 0);

  const chartPoints = useMemo(() => {
    if (!plotWidth || !sortedTrend.length) {
      return [];
    }

    const step =
      sortedTrend.length > 1 ? plotWidth / (sortedTrend.length - 1) : plotWidth / 2;

    return sortedTrend.map((point, index) => {
      const value = point.value ?? 0;
      const normalized = Math.min(value / safeMax, 1);
      const y =
        CHART_VERTICAL_PADDING + (1 - normalized) * plotHeight;

      return {
        ...point,
        x: CHART_HORIZONTAL_PADDING + (sortedTrend.length > 1 ? step * index : step),
        y,
        normalized,
      };
    });
  }, [plotHeight, plotWidth, safeMax, sortedTrend]);

  const [activePoint, setActivePoint] = useState(null);

  useEffect(() => {
    if (chartPoints.length === 0) {
      setActivePoint(null);
      return;
    }

    setActivePoint((current) => {
      if (!current) {
        return chartPoints[chartPoints.length - 1];
      }

      const stillExists = chartPoints.find((point) => point.dateKey === current.dateKey);
      return stillExists ?? chartPoints[chartPoints.length - 1];
    });
  }, [chartPoints]);

  const linePath = useMemo(() => {
    if (!chartPoints.length || !hasPositiveData) {
      return "";
    }

    const smoothing = 0.22;

    const buildCommand = (point, index, points) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = points[index - 1];
      const prevPrev = points[index - 2] ?? previous;
      const next = points[index + 1] ?? point;

      const cp1x = previous.x + (point.x - prevPrev.x) * smoothing;
      const cp1y = previous.y + (point.y - prevPrev.y) * smoothing;
      const cp2x = point.x - (next.x - previous.x) * smoothing;
      const cp2y = point.y - (next.y - previous.y) * smoothing;

      return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${point.x} ${point.y}`;
    };

    return chartPoints.map(buildCommand).join(" ");
  }, [chartPoints, hasPositiveData]);

  const areaPath = useMemo(() => {
    if (!chartPoints.length || !hasPositiveData) {
      return "";
    }

    const lastPoint = chartPoints[chartPoints.length - 1];
    const firstPoint = chartPoints[0];

    return `${linePath} L ${lastPoint.x} ${CHART_HEIGHT - CHART_VERTICAL_PADDING} L ${firstPoint.x} ${
      CHART_HEIGHT - CHART_VERTICAL_PADDING
    } Z`;
  }, [chartPoints, hasPositiveData, linePath]);

  const baselineY = useMemo(() => {
    if (!plotWidth || baselinePerDay <= 0) {
      return null;
    }

    const normalized = baselinePerDay / safeMax;
    return CHART_VERTICAL_PADDING + (1 - normalized) * plotHeight;
  }, [baselinePerDay, plotHeight, plotWidth, safeMax]);

  const xAxisY = CHART_HEIGHT - CHART_VERTICAL_PADDING;

  const horizontalGridLines = useMemo(() => {
    if (!containerWidth || GRID_LINE_COUNT <= 0) {
      return [];
    }

    return Array.from({ length: GRID_LINE_COUNT + 1 }, (_, index) => {
      const ratio = GRID_LINE_COUNT ? index / GRID_LINE_COUNT : 0;
      return {
        y: CHART_VERTICAL_PADDING + ratio * plotHeight,
        isAxis: index === GRID_LINE_COUNT,
      };
    });
  }, [containerWidth, plotHeight]);

  const tooltipConfig = useMemo(() => {
    if (!activePoint || !containerWidth) {
      return null;
    }

    const dateLabel = activePoint.axisLabel ?? activePoint.label;
    const prefix = activePoint.value > 0 ? "+" : "";
    const valueLabel = `${prefix}${formatNumber(activePoint.value)} kg CO₂`;
    const maxChars = Math.max(dateLabel.length, valueLabel.length);
    const width = Math.max(128, maxChars * 7 + 24);
    const maxX = Math.max(containerWidth - CHART_HORIZONTAL_PADDING - width, CHART_HORIZONTAL_PADDING);
    const x = Math.min(Math.max(activePoint.x - width / 2, CHART_HORIZONTAL_PADDING), maxX);
    const pointerX = Math.min(
      Math.max(activePoint.x, CHART_HORIZONTAL_PADDING + 12),
      containerWidth - CHART_HORIZONTAL_PADDING - 12
    );
    const y = Math.max(activePoint.y - 70, 10);

    return {
      width,
      x,
      y,
      pointerX,
      dateLabel,
      valueLabel,
    };
  }, [activePoint, containerWidth]);

  const difference = baseline - total;
  const remaining = difference > 0 ? difference : 0;
  const overage = difference <= 0 ? Math.abs(difference) : 0;
  const isOverTarget = difference <= 0;
  const remainingLabel = isOverTarget
    ? `${formatNumber(overage)} kg CO₂ over`
    : `${formatNumber(remaining)} kg CO₂ remaining`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerIcon}>
          <MaterialIcons
            name="show-chart"
            size={22}
            color={colors.eco.green[600]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Weekly Emissions</Text>
          <Text style={styles.subtitle}>
            {hasPositiveData
              ? "Tracking your daily CO₂ progress."
              : "Log your activities today to unlock the weekly trend."}
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Week to date</Text>
          <Text style={styles.metricValue}>{formatValue(total)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Remaining</Text>
          <Text style={[styles.metricValue, isOverTarget && styles.metricValueWarning]}>
            {remainingLabel}
          </Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        <View
          style={styles.chartArea}
          onLayout={({ nativeEvent }) => setContainerWidth(nativeEvent.layout.width)}
        >
          {containerWidth > 0 && hasPositiveData ? (
            <Svg width={containerWidth} height={CHART_HEIGHT}>
              <Defs>
                <LinearGradient id="fillGradient" x1="0" x2="0" y1="0" y2="1">
                  <Stop offset="0%" stopColor={colors.eco.green[400]} stopOpacity={0.25} />
                  <Stop offset="100%" stopColor={colors.eco.green[100]} stopOpacity={0} />
                </LinearGradient>
              </Defs>

              {horizontalGridLines.map(({ y, isAxis }, index) => (
                <Line
                  key={`grid-${index}`}
                  x1={CHART_HORIZONTAL_PADDING}
                  x2={containerWidth - CHART_HORIZONTAL_PADDING}
                  y1={y}
                  y2={y}
                  stroke={isAxis ? colors.neutral.gray300 : colors.neutral.gray200}
                  strokeWidth={isAxis ? 1.4 : 1}
                  strokeDasharray={isAxis ? undefined : "4 6"}
                  opacity={isAxis ? 1 : 0.7}
                />
              ))}

              {baselineY !== null && (
                <Line
                  x1={CHART_HORIZONTAL_PADDING}
                  x2={containerWidth - CHART_HORIZONTAL_PADDING}
                  y1={baselineY}
                  y2={baselineY}
                  stroke={colors.eco.green[200]}
                  strokeWidth={1}
                  strokeDasharray="3 6"
                />
              )}

              {tooltipConfig && (
                <Line
                  x1={tooltipConfig.pointerX}
                  x2={tooltipConfig.pointerX}
                  y1={CHART_VERTICAL_PADDING}
                  y2={xAxisY}
                  stroke={colors.eco.green[200]}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              )}

              <Path d={areaPath} fill="url(#fillGradient)" />

              <Path
                d={linePath}
                stroke={colors.eco.green[600]}
                strokeWidth={2.6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {chartPoints.map((point) => {
                const isActive = activePoint?.dateKey === point.dateKey;

                return (
                  <G
                    key={`point-${point.dateKey}`}
                    onPressIn={() => setActivePoint(point)}
                  >
                    <Rect
                      x={point.x - 18}
                      y={CHART_VERTICAL_PADDING}
                      width={36}
                      height={plotHeight}
                      fill="transparent"
                    />
                    {isActive && (
                      <Circle
                        cx={point.x}
                        cy={point.y}
                        r={6.4}
                        fill={colors.neutral.white}
                        stroke={colors.eco.green[600]}
                        strokeWidth={1.4}
                      />
                    )}
                    <Circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 4.2 : 3.6}
                      fill={colors.eco.green[600]}
                    />
                  </G>
                );
              })}

              {tooltipConfig && (
                <>
                  <Rect
                    x={tooltipConfig.x}
                    y={tooltipConfig.y}
                    width={tooltipConfig.width}
                    height={TOOLTIP_HEIGHT}
                    rx={12}
                    ry={12}
                    fill={colors.neutral.white}
                    stroke={colors.eco.green[500]}
                    strokeWidth={0.8}
                    opacity={0.98}
                  />
                  <Path
                    d={`M ${tooltipConfig.pointerX} ${tooltipConfig.y + TOOLTIP_HEIGHT + 8} L ${
                      tooltipConfig.pointerX + 7
                    } ${tooltipConfig.y + TOOLTIP_HEIGHT} L ${tooltipConfig.pointerX - 7} ${
                      tooltipConfig.y + TOOLTIP_HEIGHT
                    } Z`}
                    fill={colors.neutral.white}
                    stroke={colors.eco.green[500]}
                    strokeWidth={0.8}
                  />
                  <SvgText
                    x={tooltipConfig.x + tooltipConfig.width / 2}
                    y={tooltipConfig.y + 20}
                    fill={colors.textSecondary}
                    fontSize={12}
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {tooltipConfig.dateLabel}
                  </SvgText>
                  <SvgText
                    x={tooltipConfig.x + tooltipConfig.width / 2}
                    y={tooltipConfig.y + 38}
                    fill={colors.eco.green[700]}
                    fontSize={14}
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {tooltipConfig.valueLabel}
                  </SvgText>
                </>
              )}
            </Svg>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Time to begin your tracking journey!</Text>
              <Text style={styles.emptySubtitle}>
                Once you record data today, your weekly insights will appear here.
              </Text>
              <View style={styles.emptyBaseline}>
                {sortedTrend.map((point) => (
                  <View key={point.dateKey} style={styles.emptyColumn}>
                    <View style={styles.emptyIndicator} />
                    <Text style={styles.emptyDay}>{point.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {containerWidth > 0 && chartPoints.length > 0 && (
          <View style={[styles.labelsRow, { width: containerWidth }]}>
            {chartPoints.map((point) => (
              <View
                key={`label-${point.dateKey}`}
                style={[
                  styles.axisLabel,
                  {
                    left: point.x,
                    transform: [{ translateX: -AXIS_LABEL_WIDTH / 2 }],
                  },
                ]}
              >
                <Text style={styles.valueLabel}>
                  {point.value > 0
                    ? `+${formatNumber(point.value)}`
                    : point.value < 0
                    ? formatNumber(point.value)
                    : "0"}
                </Text>
                <Text style={styles.dayLabel}>{point.axisLabel ?? point.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBullet, styles.legendBulletDaily]} />
          <Text style={styles.legendLabel}>Daily CO₂ emissions</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, styles.legendLineTrend]} />
          <Text style={styles.legendLabel}>Trend</Text>
        </View>
        {baselinePerDay > 0 && (
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, styles.legendLineBaseline]} />
            <Text style={styles.legendLabel}>Daily target</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImpactChart;
