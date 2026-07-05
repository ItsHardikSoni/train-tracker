import Constants from "expo-constants";

// Check if the environment variables are defined, if not, provide default values or throw an error.
const API_KEY = Constants.expoConfig?.extra?.env?.API_KEY || "demo_api_key";
const API_HOST = Constants.expoConfig?.extra?.env?.API_HOST || "demo_api_host";
const PNR_API_HOST = Constants.expoConfig?.extra?.env?.PNR_API_HOST || "demo_pnr_host";
const TRAIN_ROUTE_API_HOST = Constants.expoConfig?.extra?.env?.TRAIN_ROUTE_API_HOST || "demo_route_host";

export { API_HOST, API_KEY, PNR_API_HOST, TRAIN_ROUTE_API_HOST };

