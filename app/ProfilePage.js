import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTAButton from "../components/CTAButton";
import AvatarCard from "../components/profile/AvatarCard";
import MonthlySnapshot from "../components/profile/MonthlySnapshot";
import ProfileHeader from "../components/profile/ProfileHeader";
import ScoreCard from "../components/profile/ScoreCard";
import colors from "../theme/colors";

const ProfilePage = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ProfileHeader />
          <ScoreCard variant="baseline" />
          <ScoreCard variant="carbon" />
          <AvatarCard />
          <MonthlySnapshot />
          <CTAButton
            label="View My Rewards"
            onPress={() => console.log("Navigate to Rewards")}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ProfilePage;
