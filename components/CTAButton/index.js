import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const CTAButton = ({
  label,
  onPress,
  variant = "primary",
  iconLeft,
  iconRight,
}) => {
  const renderContent = (textStyle) => (
    <View style={styles.content}>
      {iconLeft && (
        <MaterialIcons
          name={iconLeft}
          size={20}
          color={textStyle.color}
          style={styles.iconLeft}
        />
      )}
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {iconRight && (
        <MaterialIcons
          name={iconRight}
          size={20}
          color={textStyle.color}
          style={styles.iconRight}
        />
      )}
    </View>
  );

  if (variant === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.fullWidth}
      >
        <LinearGradient
          colors={["#8B5CF6", "#EC4899"]} // purple → pink
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, styles.gradient]}
        >
          {renderContent({ color: "white" })}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // primary / outline
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderContent(styles[`${variant}Text`])}
    </TouchableOpacity>
  );
};

export default CTAButton;
