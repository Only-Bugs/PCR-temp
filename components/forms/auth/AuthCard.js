import { Text, TextInput, View } from "react-native";
import styles from "./styles";

const AuthCard = ({ label, value, onChangeText, placeholder, helper }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize="none"
      />
      {helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
};

export default AuthCard;
