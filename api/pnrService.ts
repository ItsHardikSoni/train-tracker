export const fetchPnrStatusAPI = async (pnr: string) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'irctc-indian-railway-pnr-status.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(`https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`, options);
    const result = await response.json();

    if (response.ok && result.status === true) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.message || 'Failed to fetch PNR status.' };
    }
  } catch (err) {
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
};
