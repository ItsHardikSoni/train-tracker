import { API_KEY, API_HOST } from "./apiConfig";

const LIVE_TRAIN_STATUS_URL = `https://${API_HOST}/train-running-status.php`;

export const fetchLiveTrainStatusAPI = async (trainNo: string) => {
  if (!trainNo || trainNo.trim() === "") {
    return { success: false, error: "Train number cannot be empty." };
  }

  // Manually create the URL-encoded body string to avoid polyfill issues.
  const body = `train_no=${trainNo}`;

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  };

  try {
    const response = await fetch(LIVE_TRAIN_STATUS_URL, options);
    const result = await response.json();

    // The API sends specific error messages in the body, even with a 200 status.
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
