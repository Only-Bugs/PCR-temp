import { Text, View } from "react-native";
import styles from "./styles";

const sources = [
  { label: "Transport", value: "45%", icon: "🚗" },
  { label: "Food", value: "30%", icon: "🍽️" },
  { label: "Energy", value: "25%", icon: "⚡" },
];

const EmissionSourceList = () => {
  return (
    <View>
      {sources.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default EmissionSourceList;
