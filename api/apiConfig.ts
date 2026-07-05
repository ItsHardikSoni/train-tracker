import Constants from "expo-constants";

// Check if the environment variables are defined, if not, provide default values or throw an error.
const API_KEY = Constants.expoConfig?.extra?.env?.API_KEY;
const API_HOST = Constants.expoConfig?.extra?.env?.API_HOST;
const PNR_API_HOST = Constants.expoConfig?.extra?.env?.PNR_API_HOST;
const TRAIN_ROUTE_API_HOST = Constants.expoConfig?.extra?.env?.TRAIN_ROUTE_API_HOST;

if (!API_KEY || !API_HOST || !PNR_API_HOST || !TRAIN_ROUTE_API_HOST) {
  throw new Error("API keys and hosts are not defined in the environment variables.");
}

export { API_KEY, API_HOST, PNR_API_HOST, TRAIN_ROUTE_API_HOST };
