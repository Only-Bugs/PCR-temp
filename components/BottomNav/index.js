// import { Ionicons } from "@expo/vector-icons";
// import { usePathname, useRouter } from "expo-router";
// import { Text, TouchableOpacity, View } from "react-native";
// import colors from "../../theme/colors";
// import styles from "./styles";

// const tabs = [
//   { name: "Profile", icon: "person-outline", route: "/ProfilePage" },
//   { name: "Challenges", icon: "trophy-outline", route: "/ChallengesPage" },
//   { name: "Tracking", icon: "stats-chart-outline", route: "/TrackingPage" },
//   { name: "Community", icon: "people-outline", route: "/CommunityPage" },
//   { name: "Learning", icon: "book-outline", route: "/LearningPage" },
// ];

// export default function BottomNav() {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <View style={styles.container}>
//       {tabs.map((tab) => {
//         const isActive = pathname.startsWith(tab.route);

//         return (
//           <TouchableOpacity
//             key={tab.name}
//             style={styles.tab}
//             onPress={() => router.push(tab.route)}
//           >
//             <Ionicons
//               name={tab.icon}
//               size={22}
//               color={isActive ? colors.eco.green[600] : colors.neutral.gray600}
//             />
//             <Text
//               style={[
//                 styles.label,
//                 {
//                   color: isActive
//                     ? colors.eco.green[600]
//                     : colors.neutral.gray600,
//                 },
//               ]}
//             >
//               {tab.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }
