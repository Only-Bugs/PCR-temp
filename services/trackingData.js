// Dummy data for TrackingPage (Sprint 2)

export const weeklyImpact = {
  baseline: 18, // kg CO₂ baseline for the week
  total: 0, // will be recomputed from trend
  saved: 0, // will be recomputed from baseline - total
  previous: 14.5, // last week's total
  emitted: 0, // will be recomputed
  // Pre-populated trend for a nice-looking chart; values are in kg CO₂.
  // The labels will be merged onto the current week automatically.
  trend: [
    { day: "Mon", value: 1.8 },
    { day: "Tue", value: 2.4 },
    { day: "Wed", value: 1.2 },
    { day: "Thu", value: 2.9 },
    { day: "Fri", value: 3.1 },
    { day: "Sat", value: 2.2 },
    { day: "Sun", value: 1.6 },
  ],
};

export const todaysActivities = [
  {
    id: 1,
    icon: "directions-bike",
    title: "Transport",
    value: "+2.3 kg CO₂",
    description: "Logged trips by bike, train, and on foot",
  },
  {
    id: 2,
    icon: "restaurant",
    title: "Meals",
    value: "+1.1 kg CO₂",
    description: "Two plant-based meals and one mixed meal",
  },
];

export const longTermActivities = [
  {
    id: 3,
    icon: "shopping-cart",
    title: "Shopping",
    value: "+0.8 kg CO₂",
    description: "Clothing and home purchases logged this month",
  },
  {
    id: 4,
    icon: "bolt",
    title: "Energy",
    value: "+3.4 kg CO₂",
    description: "Latest electricity and gas bill snapshot",
    actionText: "Edit",
  },
];

// Keep the old activities export for backward compatibility
export const activities = todaysActivities;
