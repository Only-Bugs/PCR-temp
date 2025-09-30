// src/theme/colors.ts
const colors = {
  eco: {
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e", // base eco green
      600: "#16a34a", // strong eco green
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    yellow: "#f59e0b",
    blue: "#3b82f6",
    purple: "#8b5cf6",
  },
  neutral: {
    white: "#ffffff",
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray600: "#4b5563",
    gray800: "#1f2937",
    gray900: "#111827",
  },
  gradients: {
    green: ["#10b981", "#059669"], // ✅ switched to array for LinearGradient
    purple: ["#8b5cf6", "#7c3aed"],
  },

  // ✅ Semantic tokens
  textPrimary: "#111827", // neutral.gray900
  textSecondary: "#4b5563", // neutral.gray600
  error: "#ef4444", // Tailwind red-500
  info: "#3b82f6", // eco.blue
  success: "#22c55e", // eco.green[500]
  warning: "#f59e0b", // eco.yellow

  background: "#ffffff", // neutral.white
};

export default colors;
