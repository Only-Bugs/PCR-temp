/**
 * @fileoverview CarbonCard component.
 * Displays carbon points with progress circle and level.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import ProgressCircle from "../../ProgressCircle";
import styles from "./styles";

/**
 * CarbonCard for displaying carbon score.
 *
 * @param {Object} props
 * @param {Object} props.data - Data for the carbon score card.
 * @param {string} props.data.title - Title of the card.
 * @param {number} props.data.value - Carbon points value.
 * @param {number} props.data.progress - Progress ratio (0–1).
 * @param {{ name: string }} props.data.icon - Icon object.
 * @param {{ icon: { name: string }, text: string }} props.data.level - Level info.
 * @returns {JSX.Element}
 */
const CarbonCard = ({ data }) => {
  return (
    <View style={styles.carbon.card}>
      <View style={styles.carbon.header}>
        <MaterialIcons
          name={data.icon.name}
          size={20}
          color={colors.eco.yellow}
        />
        <Text style={styles.carbon.title}>{data.title}</Text>
      </View>

      <View style={styles.carbon.mainRow}>
        <Text key={data.value} style={styles.carbon.value}>
          {String(data.value)}
        </Text>
        <ProgressCircle
          key={data.progress}
          progress={data.progress}
          size={72}
          strokeWidth={6}
          color={colors.eco.green[600]}
        >
          <Text style={styles.carbon.percentText}>
            {Math.round(data.progress * 100)}%
          </Text>
        </ProgressCircle>
      </View>

      <View style={styles.carbon.levelRow}>
        <MaterialIcons
          name={data.level.icon.name}
          size={18}
          color={colors.eco.purple}
        />
        <Text style={styles.carbon.levelText}>{data.level.text}</Text>
      </View>

      <Text style={{ color: "red", marginTop: 8 }}>
        Debug Value: {String(data.value)}
      </Text>
    </View>
  );
};

export default CarbonCard;
