import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../theme/colors";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";

const TrackingPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader title="Tracking" />

        {/* <ImpactChart /> */}

        {/* Today’s activities */}
        <Text style={styles.sectionTitle}>Log Today’s Activities</Text>
        {/* {activities.map((item) => (
          <ActivityCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            icon={item.icon}
          />
        ))} */}
        {/* 
        <WeeklySummary
          total={weeklyImpact.saved}
          baseline={weeklyImpact.baseline}
        /> */}

        <View style={{ marginTop: 20 }}>
          <CTAButton
            label="+ Add Activity"
            onPress={() => console.log("Add Activity")}
          />
        </View>
        <Text>Work in progress</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 16,
  },
});

export default TrackingPage;
