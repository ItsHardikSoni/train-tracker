import { API_KEY as apiKey, API_HOST as apiHost, PNR_API_HOST as pnrApiHost } from "@env";

const API_KEY = apiKey;
const API_HOST = apiHost;
const PNR_API_HOST = pnrApiHost;

if (!API_KEY || !API_HOST || !PNR_API_HOST) {
  console.error(
    "API_KEY, API_HOST, and PNR_API_HOST are not defined in your environment variables."
  );
}

export { API_KEY, API_HOST, PNR_API_HOST };
