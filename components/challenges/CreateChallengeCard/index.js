import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import CTAButton from "../../CTAButton";
import styles from "./styles";

const CreateChallengeCard = () => {
  return (
    <View style={styles.card}>
      {/* Plus Icon */}
      <View style={styles.iconWrapper}>
        <MaterialIcons name="add" size={28} color={colors.eco.blue} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Your Challenge</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Set your own eco-friendly goal and track your progress
      </Text>

      {/* CTA */}
      <CTAButton
        label="+ Create Challenge"
        onPress={() => console.log("Navigate to Create Challenge")}
        variant="primary"
      />
    </View>
  );
};

export default CreateChallengeCard;
