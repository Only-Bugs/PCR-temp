import { StyleSheet, Text, View } from "react-native";
// import PageHeader from "../../components/PageHeader";

export default function CommunityPage() {
  return (
    <View style={styles.container}>
      {/* <PageHeader title="Community"/> */}
      <Text style={styles.text}>Hello Community!</Text>
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
