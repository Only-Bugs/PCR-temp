/**
 * @fileoverview UserInfoCard component.
 * Standalone card to display Eco ID with copy functionality.
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const UserInfoCard = ({ ecoId, onCopy }) => {
  // Function to shorten Eco ID for display
  const getTruncatedId = (id) => {
    if (!id) return "No Eco ID found";
    return `${id.slice(0, 6)}...${id.slice(-4)}`; // e.g. usr_3k8m...7u8v
  };

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#3B82F6", "#60A5FA"]}
          style={styles.iconWrapper}
        >
          <Ionicons name="person" size={20} color="white" />
        </LinearGradient>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>User Information</Text>
          <Text style={styles.subtitle}>Your Eco ID</Text>
        </View>
      </View>

      {/* Eco ID Box */}
      <View style={styles.ecoIdWrapper}>
        <Text style={styles.ecoIdText} numberOfLines={1} ellipsizeMode="middle">
          {ecoId ? ecoId : "No Eco ID found"}
        </Text>
        {ecoId && (
          <TouchableOpacity style={styles.copyButton} onPress={onCopy}>
            <Ionicons name="copy-outline" size={18} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserInfoCard;
