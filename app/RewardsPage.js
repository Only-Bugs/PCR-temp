import { ScrollView, StyleSheet, View } from "react-native";
import colors from "../theme/colors";

import AchievementBanner from "../components/rewards/AchievementBanner";
import BadgeCarousel from "../components/rewards/BadgeCarousel";
import NextRewardCard from "../components/rewards/NextRewardCard";
import RewardsHeader from "../components/rewards/RewardsHeader";
import VoucherCard from "../components/rewards/VoucherCard";

import {
  achievement,
  badges,
  nextReward,
  vouchers,
} from "../services/rewardsData";

const RewardsPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.neutral.white }}>
      <ScrollView contentContainerStyle={styles.container}>
        <RewardsHeader />

        <AchievementBanner {...achievement} />

        <BadgeCarousel badges={badges} />

        {vouchers.map((voucher) => (
          <VoucherCard key={voucher.id} {...voucher} />
        ))}

        <NextRewardCard {...nextReward} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default RewardsPage;
