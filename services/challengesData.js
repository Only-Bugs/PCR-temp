// src/services/challengesData.js

/**
 * Temporary mock API data for Challenges Page.
 * Each challenge has:
 * - id: unique identifier
 * - title: short challenge name
 * - description: details of the challenge
 * - progress: { current, target }
 * - rewards: { points, badge? }
 * - status: available | active | completed
 * - isActive: boolean flag for quick checks
 * - icon: symbolic identifier for UI
 */

const challengesData = [
  {
    id: "c1",
    title: "Weekly Eco Challenge: Bike to work 3 times",
    description:
      "Reduce your carbon footprint by cycling to work instead of driving or taking public transport for at least 3 days this week.",
    progress: { current: 0, target: 3 },
    rewards: { points: 100, badge: "Eco Warrior" },
    status: "available",
    isActive: false,
    icon: "bicycle",
  },
  {
    id: "c2",
    title: "Go meat-free 2 days this week",
    description: "Replace meat meals with plant-based options for 2 days.",
    progress: { current: 0, target: 2 },
    rewards: { points: 50 },
    status: "available",
    isActive: false,
    icon: "leaf",
  },
  {
    id: "c3",
    title: "Recycle 5 items this week",
    description:
      "Recycle at least 5 household items like plastic, paper, or cans.",
    progress: { current: 0, target: 5 },
    rewards: { points: 80 },
    status: "available",
    isActive: false,
    icon: "recycle",
  },
  {
    id: "c4",
    title: "7-Day Streak Challenge",
    description:
      "Complete eco-friendly actions for 7 consecutive days to build a sustainable habit.",
    progress: { current: 0, target: 7 },
    rewards: { points: 120 },
    status: "available",
    isActive: false,
    icon: "flame",
  },
];

export default challengesData;
