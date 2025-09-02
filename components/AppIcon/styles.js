import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

/**
 * Styles for AppIcon component.
 * Provides a green circle with white leaf icon
 * and a soft blurred glow/bleed effect.
 */
export default StyleSheet.create({
  wrapper: {
    marginBottom: 32,
    backgroundColor: "#E6F6EC", // soft green backdrop
    borderRadius: 9999,
    padding: 32, // slightly larger spread for glow
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#16a34a",
    shadowOpacity: 0.25, // stronger diffusion
    shadowRadius: 40, // wider blur radius
    elevation: 12, // Android glow
  },
  iconCircle: {
    backgroundColor: colors.eco.green[600], // solid green core
    borderRadius: 9999,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
