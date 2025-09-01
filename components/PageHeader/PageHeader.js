import { Text, View } from "react-native";
import NotificationBell from "./NotificationBell";
import styles from "./styles";

const PageHeader = ({ title, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Bell */}
      <NotificationBell onPress={onNotificationPress} />
    </View>
  );
};

export default PageHeader;
