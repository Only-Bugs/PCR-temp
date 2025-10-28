import { createContext, useCallback, useContext, useMemo, useState } from "react";

const TrackingDataContext = createContext(null);

const clampToStep = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return 0;
  }
  return Number.parseFloat(numeric.toFixed(1));
};

const sortByDateKey = (a, b) => {
  const left = a?.dateKey ?? "";
  const right = b?.dateKey ?? "";
  return left.localeCompare(right);
};

export const TrackingDataProvider = ({ children }) => {
  const [trendByDate, setTrendByDate] = useState([]);
  const [categoryTotalsByDay, setCategoryTotalsByDay] = useState({});

  const replaceTrend = useCallback((trend = []) => {
    if (!Array.isArray(trend)) {
      setTrendByDate([]);
      setCategoryTotalsByDay({});
      return;
    }

    const normalizedTrend = trend
      .filter((point) => point && point.dateKey)
      .map((point) => ({
        dateKey: point.dateKey,
        label: point.label ?? point.day ?? "",
        value: clampToStep(point.value ?? 0),
      }))
      .sort(sortByDateKey);

    setTrendByDate(normalizedTrend);
    setCategoryTotalsByDay((previous) => {
      if (!normalizedTrend.length) {
        return {};
      }

      return normalizedTrend.reduce((accumulator, point) => {
        const existing = previous[point.dateKey];
        accumulator[point.dateKey] = {
          label: point.label,
          categories: existing?.categories ?? {},
        };
        return accumulator;
      }, {});
    });
  }, []);

  const recordCategoryTotals = useCallback(
    ({
      dateKey,
      label,
      categoryKey,
      totalImpact,
      increment = 0,
      summary = null,
      metadata = null,
    }) => {
      if (!dateKey || !categoryKey) {
        return;
      }

      setCategoryTotalsByDay((previous) => {
        const existingDay = previous[dateKey] ?? {
          label: label ?? "",
          categories: {},
        };

        const updatedDay = {
          label: label ?? existingDay.label,
          categories: {
            ...existingDay.categories,
            [categoryKey]: {
              total: clampToStep(totalImpact ?? 0),
              lastIncrement: clampToStep(increment ?? 0),
              summary:
                summary ??
                existingDay.categories?.[categoryKey]?.summary ??
                null,
              metadata,
            },
          },
        };

        const next = { ...previous, [dateKey]: updatedDay };
        const aggregatedTotal = Object.values(updatedDay.categories).reduce(
          (sum, entry) => sum + (entry?.total ?? 0),
          0
        );

        setTrendByDate((previousTrend) => {
          const otherDays = previousTrend.filter(
            (point) => point.dateKey !== dateKey
          );

          return [
            ...otherDays,
            {
              dateKey,
              label: updatedDay.label,
              value: clampToStep(aggregatedTotal),
            },
          ].sort(sortByDateKey);
        });

        return next;
      });
    },
    []
  );

  const resetCategoryTotals = useCallback(({ dateKey, label, categoryKey }) => {
    if (!dateKey || !categoryKey) {
      return;
    }

    setCategoryTotalsByDay((previous) => {
      const existingDay = previous[dateKey];

      if (!existingDay) {
        return previous;
      }

      const updatedCategories = {
        ...existingDay.categories,
        [categoryKey]: {
          total: 0,
          lastIncrement: 0,
          summary: null,
          metadata: null,
        },
      };

      const updatedDay = {
        label: label ?? existingDay.label,
        categories: updatedCategories,
      };

      const next = { ...previous, [dateKey]: updatedDay };
      const aggregatedTotal = Object.values(updatedCategories).reduce(
        (sum, entry) => sum + (entry?.total ?? 0),
        0
      );

      setTrendByDate((previousTrend) => {
        const otherDays = previousTrend.filter(
          (point) => point.dateKey !== dateKey
        );

        return [
          ...otherDays,
          {
            dateKey,
            label: updatedDay.label,
            value: clampToStep(aggregatedTotal),
          },
        ].sort(sortByDateKey);
      });

      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setTrendByDate([]);
    setCategoryTotalsByDay({});
  }, []);

  const value = useMemo(
    () => ({
      dailyTrend: trendByDate,
      categoryTotalsByDay,
      replaceTrend,
      recordCategoryTotals,
      resetCategoryTotals,
      clearAll,
    }),
    [
      trendByDate,
      categoryTotalsByDay,
      replaceTrend,
      recordCategoryTotals,
      resetCategoryTotals,
      clearAll,
    ]
  );

  return (
    <TrackingDataContext.Provider value={value}>
      {children}
    </TrackingDataContext.Provider>
  );
};

export const useTrackingData = () => {
  const context = useContext(TrackingDataContext);

  if (!context) {
    throw new Error("useTrackingData must be used within a TrackingDataProvider");
  }

  return context;
};
