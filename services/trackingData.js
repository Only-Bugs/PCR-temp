// Dummy data for TrackingPage (Sprint 2)

export const weeklyImpact = {
  baseline: 15, // kg CO₂ baseline
  total: 0, // weekly emissions in kg CO₂
  saved: 15, // initial savings vs baseline
  previous: 0, // last week's total
  emitted: 2.5, // optional, if you want to show emitted separately
  trend: [],
};

export const todaysActivities = [
  {
    id: 1,
    icon: "directions-bike",
    title: "Transport",
    value: "+0 kg CO₂",
    description: "Add a trip to see your impact",
  },
  {
    id: 2,
    icon: "restaurant",
    title: "Meals",
    value: "+0 kg CO₂",
    description: "Log climate-friendly meals",
  },
];

export const longTermActivities = [
  {
    id: 3,
    icon: "shopping-cart",
    title: "Shopping",
    value: "+0 kg CO₂",
    description: "Track mindful purchases",
  },
  {
    id: 4,
    icon: "bolt",
    title: "Energy",
    value: "+0 kg CO₂",
    description: "Update your home energy habits",
    actionText: "Edit",
  },
];

// Keep the old activities export for backward compatibility
export const activities = todaysActivities;
