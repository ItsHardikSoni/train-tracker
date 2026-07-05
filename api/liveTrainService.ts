import { API_KEY, API_HOST } from "./apiConfig";

const LIVE_TRAIN_STATUS_URL = `https://${API_HOST}/train-running-status.php`;

export const fetchLiveTrainStatusAPI = async (trainNo: string) => {
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      train_no: trainNo,
    }),
  };

  try {
    const response = await fetch(LIVE_TRAIN_STATUS_URL, options);
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        return {
          success: false,
          error: errorJson.message || `HTTP error! status: ${response.status}`,
        };
      } catch (e) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status} - ${errorText}`,
        };
      }
    }

    const result = await response.json();

    if (result.status === false) {
      return { success: false, error: result.message || "Unknown API error" };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
};
