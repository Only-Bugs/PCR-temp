import { StyleSheet, Text, View } from "react-native";

export default function LearningPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Learning Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
