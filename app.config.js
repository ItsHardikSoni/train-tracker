import 'dotenv/config';

export default {
  expo: {
    name: "app",
    slug: "app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-symbols",
        {
          "source": ["SF", "Entypo"]
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      env: {
        API_KEY: process.env.API_KEY,
        API_HOST: process.env.API_HOST,
        PNR_API_HOST: process.env.PNR_API_HOST,
        TRAIN_ROUTE_API_HOST: process.env.TRAIN_ROUTE_API_HOST,
      },
    },
  },
};
