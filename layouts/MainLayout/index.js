import React from "react";
import { View } from "react-native";
// import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import styles from "./styles";

export default function MainLayout({ children }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Header /> */}

      {/* Page content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      <BottomNav />
    </View>
  );
}
