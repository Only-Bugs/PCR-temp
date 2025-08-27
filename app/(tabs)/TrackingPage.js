import { ScrollView, StyleSheet, View } from "react-native";
import colors from "../../theme/colors";

import CTAButton from "../../components/CTAButton";
import ActivityCard from "../../components/tracking/ActivityCard";
import ImpactChart from "../../components/tracking/ImpactChart";
import TrackingHeader from "../../components/tracking/TrackingHeader";
import WeeklySummary from "../../components/tracking/WeeklySummary";

import { activities, weeklyImpact } from "../../services/trackingData";

const TrackingPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TrackingHeader />

        <ImpactChart />

        {/* Today’s activities */}
        {activities.map((item) => (
          <ActivityCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            icon={item.icon}
          />
        ))}

        <WeeklySummary
          total={weeklyImpact.saved}
          baseline={weeklyImpact.baseline}
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
});

export default TrackingPage;
