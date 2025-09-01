import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import ProgressCircle from "../../ProgressCircle";
import styles from "./styles";

const CarbonCard = ({ data }) => {
  return (
    <View style={styles.carbon.card}>
      {/* Header */}
      <View style={styles.carbon.header}>
        <MaterialIcons
          name={data.icon.name}
          size={20}
          color={colors.eco.yellow}
        />
        <Text style={styles.carbon.title}>{data.title}</Text>
      </View>

      {/* Score + Circle */}
      <View style={styles.carbon.mainRow}>
        <Text style={styles.carbon.value}>{data.value}</Text>
        <ProgressCircle
          progress={data.progress}
          size={72}
          strokeWidth={6}
          color={colors.eco.green[600]} // ✅ semantic eco green
        >
          <Text style={styles.carbon.percentText}>
            {Math.round(data.progress * 100)}%
          </Text>
        </ProgressCircle>
      </View>

      {/* Level */}
      <View style={styles.carbon.levelRow}>
        <MaterialIcons
          name={data.level.icon.name}
          size={18}
          color={colors.eco.purple} // ✅ semantic purple
        />
        <Text style={styles.carbon.levelText}>{data.level.text}</Text>
      </View>
    </View>
  );
};

export default CarbonCard;
