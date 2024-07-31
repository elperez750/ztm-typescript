import type { AxiosStatic } from "axios";
import { z } from "zod";

const LocationInfoSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
});

export type LocationInfo = z.infer<typeof LocationInfoSchema>;
export async function fetchLocationData(
  axios: AxiosStatic,
  apiUrl: string,
  locationName: string,
  apiKKey: string
): Promise<LocationInfo> {
  const options = {
    method: "GET",
    url: apiUrl,
    params: {
      q: locationName,
      api_key: apiKKey,
    },
  };

  const response = await axios.request(options);
  if (response.status === 200) {
    try {
      return LocationInfoSchema.parse(response.data[0]);
    } catch (err) {
      console.log(err);
      throw new Error(
        `Unable to find  location information for ${locationName}`
      );
    }
  } else {
    throw new Error(
      `Failed to fetch data with status code: ${response.status}`
    );
  }
}
