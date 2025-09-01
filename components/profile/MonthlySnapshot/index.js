import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

const MonthlySnapshot = ({ title, performance, sources, tip, badge }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="show-chart" size={20} color="blue" />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Performance Box */}
      <View style={styles.performanceBox}>
        <View>
          <Text style={styles.performanceTitle}>{performance.title}</Text>
          <Text style={styles.performanceSub}>{performance.message}</Text>
        </View>
        <View style={styles.performanceRight}>
          <MaterialIcons
            name={
              performance.direction === "down"
                ? "arrow-downward"
                : "arrow-upward"
            }
            size={16}
            color={performance.direction === "down" ? "green" : "red"}
          />
          <Text style={styles.performanceChange}>{performance.change}%</Text>
        </View>
      </View>

      {/* Top Emission Sources */}
      <Text style={styles.sectionTitle}>Top Emission Sources</Text>
      {sources.map((s) => (
        <View key={s.id} style={styles.sourceRow}>
          <View style={styles.sourceLeft}>
            <MaterialIcons name={s.icon} size={20} color={s.color} />
            <Text style={styles.sourceLabel}>{s.label}</Text>
          </View>
          <Text style={[styles.sourceValue, { color: s.color }]}>
            {s.value}%
          </Text>
        </View>
      ))}

      {/* Tip Box */}
      <View style={styles.tipBox}>
        <MaterialIcons name={tip.icon} size={20} color={tip.color} />
        <Text style={styles.tipText}>{tip.text}</Text>
      </View>

      {/* Badge Box */}
      <View style={styles.badgeBox}>
        <MaterialIcons name={badge.icon} size={20} color={badge.color} />
        <Text style={styles.badgeText}>
          {badge.text.replace(badge.highlight, "")}
          <Text style={styles.highlight}>{badge.highlight}</Text>
        </Text>
      </View>
    </View>
  );
};

export default MonthlySnapshot;
