import { API_KEY, PNR_API_HOST } from "./apiConfig";

export const fetchPnrStatusAPI = async (pnr: string) => {
  try {
    const response = await fetch(
      `https://${PNR_API_HOST}/getPNRStatus/${pnr}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY ?? "",
          "X-RapidAPI-Host": PNR_API_HOST,
        },
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.message || "Failed to fetch PNR status",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Network Error",
    };
  }
};
