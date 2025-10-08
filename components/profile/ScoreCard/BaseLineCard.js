import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import ProgressBar from "../../ProgressBar";
import styles from "./styles";

const BaseLineCard = ({ data }) => {
  return (
    <LinearGradient
      colors={colors.gradients.green}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.base.card}
    >
      {/* Header */}
      <View style={styles.base.header}>
        <MaterialIcons name={data.icon.name} size={20} color={colors.success} />
        <Text style={styles.base.title}>{data.title}</Text>
      </View>

      {/* Values */}
      <View style={styles.base.row}>
        <View style={styles.base.left}>
          <Text style={styles.base.value}>{data.value}</Text>
          <Text style={styles.base.unit}>{data.unit}</Text>
        </View>
        <View style={styles.base.right}>
          <Text style={styles.base.subText}>
            National avg: {data.nationalAvg}
          </Text>
          <View style={styles.base.changeRow}>
            <MaterialIcons
              name={
                data.changeDirection === "down"
                  ? "arrow-downward"
                  : "arrow-upward"
              }
              size={14}
              color={
                data.changeDirection === "down" ? colors.success : colors.error
              }
            />
            <Text style={styles.base.change}>{data.change}</Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={data.progress}
        color={colors.success}
        height={10}
      />
    </LinearGradient>
  );
};

export default BaseLineCard;
