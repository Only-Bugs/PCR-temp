import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, Text, View } from "react-native";
// import AppIcon from "../components/AppIcon";
import CarbonPersona from "../components/persona/CarbonPersona";
import colors from "../theme/colors";
import { getLevelTier } from "../utils/levelTiers";

/**
 * PosterCard – shareable version with branding watermark, icon backdrop,
 * and gradient depth for social sharing.
 */
const PosterCard = ({
  points = 1247,
  co2SavedKg = 47.3,
  badgeName,
  dateRangeLabel = "this month",
  personaStage,
}) => {
  const levelTier = getLevelTier(points);
  const displayBadgeName = badgeName || levelTier.name;
  const formattedSavings = Number(co2SavedKg).toFixed(0);

  return (
    <View style={styles.posterContainer}>
      <LinearGradient
        colors={["#0B7E55", "#12B46E", "#1DD580"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradient}
      >
        {/* Top-right App Icon watermark */}
        {/* <View style={styles.iconWrapper}>
          <AppIcon size={36} />
        </View> */}

        {/* Vignette overlay */}
        <View style={styles.vignette} />

        {/* Decorative backdrop icons */}
        {/* <Image
          source={require("../../assets/icons/leaf-pattern.png")}
          style={[styles.backdropIcon, { top: 80, left: 40, opacity: 0.08 }]}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/icons/globe-outline.png")}
          style={[
            styles.backdropIcon,
            { bottom: 100, right: 60, opacity: 0.06 },
          ]}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/icons/lightning.png")}
          style={[
            styles.backdropIcon,
            { bottom: 40, left: 100, opacity: 0.05 },
          ]}
          resizeMode="contain"
        /> */}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandText}>Verde</Text>
          <Text style={styles.brandSubtext}>Eco Action Tracker</Text>
        </View>

        {/* Persona with glow */}
        <View style={styles.personaWrapper}>
          <LinearGradient
            colors={["rgba(255,255,255,0.4)", "transparent"]}
            style={styles.glow}
          />
          <View style={styles.personaCircle}>
            <CarbonPersona stage={personaStage} />
          </View>
        </View>

        {/* CO₂ savings */}
        <View style={styles.impactSection}>
          <Text style={styles.savingsLabel}>You've saved</Text>
          <Text style={styles.savingsValue}>{formattedSavings} kg CO₂</Text>
          <Text style={styles.savingsContext}>This month</Text>
        </View>

        {/* Level + Points */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Level · {displayBadgeName}</Text>
          <Text style={styles.metaText}>{points.toLocaleString()} pts</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    width: "100%",
    aspectRatio: 9 / 16,
    maxWidth: 540,
    alignSelf: "center",
    borderRadius: 32,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 32,
  },
  iconWrapper: {
    position: "absolute",
    top: 38,
    right: 28,
    opacity: 0.85,
    transform: [{ scale: 1.05 }],
    zIndex: 2,
  },
  backdropIcon: {
    position: "absolute",
    width: 120,
    height: 120,
    tintColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 4,
  },
  brandText: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.neutral.white,
    letterSpacing: 1.1,
  },
  brandSubtext: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
  },

  personaWrapper: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  glow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 90,
    top: -10,
    backgroundColor: "rgba(255,255,255,0.2)",
    blurRadius: 60,
  },
  personaCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  impactSection: {
    alignItems: "center",
    marginTop: 16,
  },
  savingsLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  savingsValue: {
    fontSize: 46,
    fontWeight: "800",
    color: colors.neutral.white,
    letterSpacing: 0.5,
    marginTop: 6,
  },
  savingsContext: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  tagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 10,
    fontStyle: "italic",
  },

  metaRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  metaText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.neutral.white,
  },
});

export default PosterCard;
