import { API_KEY, TRAIN_ROUTE_API_HOST } from "./apiConfig";

const TRAIN_ROUTE_URL = `https://${TRAIN_ROUTE_API_HOST}/route`;

export const fetchTrainRouteAPI = async (trainNo: string) => {
  if (!trainNo || trainNo.trim() === "") {
    return { success: false, error: "Train number cannot be empty." };
  }

  const url = `${TRAIN_ROUTE_URL}/${trainNo}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": TRAIN_ROUTE_API_HOST,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.error) {
      return { success: false, error: result.error };
    }

    if (result.status === false) {
      return { success: false, error: result.message || "Unknown API error" };
    }

    if (!response.ok) {
      return { success: false, error: `API Error: ${response.status}` };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      error: "An unexpected error occurred. Please check your network connection and try again.",
    };
  }
};
