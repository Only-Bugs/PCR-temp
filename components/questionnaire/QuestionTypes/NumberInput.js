import { TextInput, View } from "react-native";
import colors from "../../../theme/colors";
import styles from "./styles";

const NumberInput = ({ value, onChange, placeholder = "AUD 0.00" }) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.numberInput}
        value={String(value)}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral.gray400}
        keyboardType="numeric"
        returnKeyType="done"
      />
    </View>
  );
};

export default NumberInput;
