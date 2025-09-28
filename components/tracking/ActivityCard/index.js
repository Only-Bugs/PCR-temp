import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const ActivityCard = ({ icon, title, value, description, actionText = "Enter", onEdit }) => {
  // Define icon colors and backgrounds based on activity type
  const getIconStyle = (iconName) => {
    switch (iconName) {
      case "directions-bike":
        return {
          backgroundColor: "#3b82f6", // Blue
          iconColor: colors.neutral.white,
        };
      case "restaurant":
        return {
          backgroundColor: "#f59e0b", // Orange
          iconColor: colors.neutral.white,
        };
      case "shopping-cart":
        return {
          backgroundColor: "#ec4899", // Pink
          iconColor: colors.neutral.white,
        };
      case "bolt":
        return {
          backgroundColor: "#10b981", // Green
          iconColor: colors.neutral.white,
        };
      default:
        return {
          backgroundColor: colors.neutral.gray100,
          iconColor: colors.neutral.gray900,
        };
    }
  };

  const iconStyle = getIconStyle(icon);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Icon wrapper */}
        <View style={[styles.iconWrapper, { backgroundColor: iconStyle.backgroundColor }]}>
          <MaterialIcons name={icon} size={24} color={iconStyle.iconColor} />
        </View>

        {/* Title */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>

        {/* Value + Action link */}
        <View style={styles.right}>
          <Text style={styles.value}>{value}</Text>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.edit}>{actionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
