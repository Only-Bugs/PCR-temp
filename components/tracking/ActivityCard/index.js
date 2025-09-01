import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const ActivityCard = ({ icon, title, subtitle, value, color, onEdit }) => {
  const bg = "#f3f4f6"; // light gray default
  const iconColor = "#111827";
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Icon wrapper */}
        <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
          <MaterialIcons name={icon} size={20} color={iconColor} />
        </View>

        {/* Title + subtitle */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Value + Edit link */}
        <View style={styles.right}>
          <Text style={styles.value}>{value}</Text>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
