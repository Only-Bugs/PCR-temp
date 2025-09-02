/**
 * @fileoverview SettingsCard component.
 * Reusable card container for SettingsPage.
 * Displays an icon, title, subtitle, and customizable right-side content.
 */

import { Text, View } from "react-native";
import styles from "./styles";

const SettingsCard = ({ icon, title, subtitle, rightContent, children }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {/* Left Icon */}
        <View style={styles.iconWrapper}>{icon}</View>

        {/* Title + Subtitle */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Right-Side Content */}
        {rightContent && (
          <View style={styles.rightContent}>{rightContent}</View>
        )}
      </View>

      {/* Children below */}
      {children && <View style={styles.children}>{children}</View>}
    </View>
  );
};

export default SettingsCard;
