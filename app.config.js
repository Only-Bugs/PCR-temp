import "dotenv/config";

export default {
  expo: {
    name: "Verde",
    slug: "Verde",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#16a34a",
      },
      edgeToEdgeEnabled: true,
      package: "com.spra0063.Verde",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: "0eac9ceb-e1f1-48b0-acb7-a32efe8f6955",
      },
    },
  },
};
