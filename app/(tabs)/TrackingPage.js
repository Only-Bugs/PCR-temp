import { ScrollView, StyleSheet, Text, View ,Button} from "react-native";
import { useRouter } from "expo-router";

import PageHeader from "../../components/PageHeader";
import ActivityCard from "../../components/tracking/ActivityCard";
import ImpactChart from "../../components/tracking/ImpactChart";
import WeeklySummary from "../../components/tracking/WeeklySummary";
import { useTracking } from "../../context/TrackingContext";
import colors from "../../theme/colors";
import layout from "../../theme/layout";


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
        <View style={styles.headerSpacing}>
          <PageHeader title="Tracking" />
        </View>

        <ImpactChart
          weeklyTrend={weeklyImpact.trend}
          baseline={weeklyImpact.baseline}
          total={weeklyImpact.total}
        />

        <Text style={styles.sectionHeading}>Log Today’s Activities</Text>
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

        <Text style={styles.sectionHeading}>Long-Term Tracking</Text>
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
  <Button onClick={()=> console.log(user,"user")}title="click me"/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.screenPadding,
    paddingBottom: layout.blockSpacing,
  },
  headerSpacing: {
    marginBottom: layout.sectionSpacing,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: layout.sectionSpacing,
    marginBottom: layout.cardSpacing / 2,
  },
});

export default TrackingPage;

