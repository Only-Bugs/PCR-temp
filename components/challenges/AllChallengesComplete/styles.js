import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: "#22C55E",
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#E6FCEB",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 13,
    color: "#E6FCEB",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
});
