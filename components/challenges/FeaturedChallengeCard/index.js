import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CTAButton from "../../CTAButton";
import ProgressBar from "../../ProgressBar";
import styles from "./styles";

const FeaturedChallengeCard = () => {
  return (
    <View style={styles.card}>
      {/* Top row: icon + Featured badge */}
      <View style={styles.topRow}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="directions-bike" size={24} color="white" />
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Weekly Eco Challenge: Bike to work 3 times
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Reduce your carbon footprint by cycling to work this week
      </Text>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={styles.progressValue}>2 of 3 completed</Text>
      </View>
      <ProgressBar
        progress={0.66}
        color="white"
        height={8}
        backgroundColor="rgba(255,255,255,0.3)"
      />

      {/* Rewards */}
      <View style={styles.rewardsRow}>
        <View style={styles.rewardItem}>
          <MaterialIcons name="emoji-events" size={20} color="white" />
          <Text style={styles.rewardText}>+100 points</Text>
        </View>
        <View style={styles.rewardItem}>
          <MaterialIcons name="military-tech" size={20} color="white" />
          <Text style={styles.rewardText}>Eco Warrior badge</Text>
        </View>
      </View>

      {/* CTA */}
      <CTAButton
        label="Track Progress"
        onPress={() => console.log("Track Progress")}
        variant="outlineLight" // we can extend CTAButton to support light outline style
      />
    </View>
  );
};

export default FeaturedChallengeCard;
