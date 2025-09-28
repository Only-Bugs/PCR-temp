import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import CTAButton from "../../components/CTAButton";
import PageHeader from "../../components/PageHeader";
import ActivityCard from "../../components/tracking/ActivityCard";
import ImpactChart from "../../components/tracking/ImpactChart";
import WeeklySummary from "../../components/tracking/WeeklySummary";
import { useTracking } from "../../context/TrackingContext";
import colors from "../../theme/colors";

const TrackingPage = () => {
  const router = useRouter();
  const { weeklyImpact, todaysActivities, longTermActivities } = useTracking();

  const handleActivityPress = (activityTitle) => {
    switch (activityTitle) {
      case 'Transport':
        router.push('/LogTransportActivity');
        break;
      case 'Meals':
        router.push('/LogMealActivity');
        break;
      case 'Shopping':
        router.push('/LogShoppingActivity');
        break;
      case 'Energy':
        router.push('/LogEnergyActivity');
        break;
      default:
        console.log(`Enter ${activityTitle}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader title="Tracking" />

        <ImpactChart
          weeklyTrend={weeklyImpact.trend}
          baseline={weeklyImpact.baseline}
          total={weeklyImpact.total}
        />

        {/* Today’s activities */}
        <Text style={styles.sectionTitle}>Log Today’s Activities</Text>
        {todaysActivities.map((item) => (
          <ActivityCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            description={item.description}
            actionText={item.actionText || "Enter"}
            onEdit={() => handleActivityPress(item.title)}
          />
        ))}

        {/* Long-Term Tracking */}
        <Text style={styles.sectionTitle}>Long-Term Tracking</Text>
        {longTermActivities.map((item) => (
          <ActivityCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            actionText={item.actionText || "Enter"}
            description={item.description}
            onEdit={() => handleActivityPress(item.title)}
          />
        ))}

        <WeeklySummary
          total={weeklyImpact.total}
          baseline={weeklyImpact.baseline}
          previous={weeklyImpact.previous}
        />

        <View style={{ marginTop: 20 }}>
          <CTAButton
            label="+ Add Activity"
            onPress={() => console.log("Add Activity")}
          />
        </View>
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
