import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const CTAButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>[CTAButton Placeholder]</Text>
    </TouchableOpacity>
  );
};

export default CTAButton;
