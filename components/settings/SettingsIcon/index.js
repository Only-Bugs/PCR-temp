import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

/**
 * SettingsIcon component.
 * Renders a rounded square background with an Ionicon inside.
 *
 * @param {Object} props
 * @param {string} props.name - Ionicons icon name.
 * @param {string} props.bgColor - Background color.
 * @param {number} [props.size=22] - Icon size.
 * @returns {JSX.Element}
 */
const SettingsIcon = ({ name, bgColor, size = 22 }) => {
  return (
    <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
      <Ionicons name={name} size={size} color="white" />
    </View>
  );
};

export default SettingsIcon;
