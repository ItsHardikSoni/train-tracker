export const fetchPnrStatusAPI = async (pnr: string) => {
  try {

    const response = await fetch(
      `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            process.env.EXPO_PUBLIC_RAPIDAPI_KEY ?? '',
          'X-RapidAPI-Host':
            'irctc-indian-railway-pnr-status.p.rapidapi.com',
        },
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {

      return {

        success: true,

        data: result.data

      };

    }

    return {

      success: false,

      error:
        result.message ||
        'Failed to fetch PNR status'

    };

  } catch (error) {

    console.log(error);

    return {

      success: false,

      error:
        'Network Error'

    };

  }

};