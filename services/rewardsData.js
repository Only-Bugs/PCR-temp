// Mock data for Rewards Page

export const achievement = {
  title: "Eco Warrior Unlocked!",
  message: "You reduced 20kg of CO₂ this month 🎉",
  cta: "Share",
};

export const badges = [
  // {
  //   id: 1,
  //   title: "Eco Warrior",
  //   level: "Level 3",
  //   icon: "leaf",
  //   color: "#22C55E",
  //   locked: false,
  //   progress: 1,
  // },
  {
    id: 2,
    title: "Recycler Pro",
    level: "Level 2",
    icon: "recycle",
    color: "#3B82F6",
    locked: false,
    progress: 0.6,
  },
  {
    id: 3,
    title: "Green Thumb",
    level: "Complete 2 challenges",
    icon: "eco",
    color: "#6B7280",
    locked: true,
    progress: 0,
  },
  {
    id: 4,
    title: "Solar Saver",
    level: "Track energy for 7 days",
    icon: "sunny",
    color: "#6B7280",
    locked: true,
    progress: 0,
  },
  {
    id: 5,
    title: "Water Saver",
    level: "Complete water challenge",
    icon: "water",
    color: "#0EA5E9",
    locked: false,
    progress: 0.3,
  },
];

export const vouchers = [
  {
    id: 1,
    title: "EcoStore Coupon",
    subtitle: "10% off eco-friendly products",
    expiry: "Valid until 30 Nov 2025",
    icon: "storefront", // MaterialIcons name
    color: "#22C55E", // green
  },
  {
    id: 2,
    title: "Local Grocery Voucher",
    subtitle: "$20 off your next purchase",
    expiry: "Valid until 15 Dec 2025",
    icon: "shopping-cart", // MaterialIcons name
    color: "#F97316", // orange
  },
];

export const nextReward = {
  title: "Earn Your Next Reward",
  message:
    "Complete any 2 challenges this week to unlock your next badge and earn more vouchers!",
  cta: "Go to Challenges",
  icon: "lightbulb", // MaterialIcons name
  color: "#F59E0B", // orange
};
