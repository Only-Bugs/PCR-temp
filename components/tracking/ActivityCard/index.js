import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./styles";

const ActivityCard = ({ icon, title, subtitle, value }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialIcons
          name={icon}
          size={22}
          color="black"
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ActivityCard;
