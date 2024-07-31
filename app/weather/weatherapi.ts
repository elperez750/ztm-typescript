import axios from "axios";

// Mapping weather codes to their descriptions
const weatherCodes: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Moderate thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

// Interface for API response
interface CurrentWeatherApiResponse {
  temperature: string;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
  current_weather?: CurrentWeatherApiResponse; // Add this line
}

// Interfaces for temperature and wind
export interface Temperature {
  value: number;
  unit: string;
}

export interface Wind {
  windspeed: number;
  direction: number;
  unit: string;
}

// Formatting functions
const formatTemperature = (temp: Temperature): string => `${temp.value}${temp.unit}`;
const formatWind = (wind: Wind): string => `${wind.windspeed}${wind.unit} ${wind.direction}`;

// CurrentWeather class
export class CurrentWeather {
  temperature: Temperature;
  wind: Wind;
  weathercode: number;
  is_day: boolean;
  time: string;

  constructor(apiResponse: CurrentWeatherApiResponse) {
    this.temperature = { value: parseInt(apiResponse.temperature), unit: "F" };
    this.wind = { windspeed: apiResponse.windspeed, direction: apiResponse.winddirection, unit: "kmh" };
    this.weathercode = apiResponse.weathercode;
    this.is_day = apiResponse.is_day === 1;
    this.time = apiResponse.time;
  }

  condition(): string {
    return weatherCodes[this.weathercode];
  }

  format(): string {
    const description = 16;
    const formatted: string[] = [];
    formatted.push(`Temperature: ${formatTemperature(this.temperature)}`);
    formatted.push(`Wind Speed: ${formatWind(this.wind)}`);
    formatted.push(`Condition: ${this.condition()}`);
    return formatted.join("\n");
  }
}

// Function to fetch weather data
export async function fetchWeatherData(
  apiUrl: string,
  lat: string,
  lon: string,
): Promise<CurrentWeather> {
  const options = {
    method: "GET",
    url: apiUrl,
    params: {
      latitude: lat,
      longitude: lon,
      hourly: "temperature_2m",
      temperature_unit: "fahrenheit",
      windspeed_unit: "kmh",
      current_weather: true
    }
  };

  const response = await axios.request<CurrentWeatherApiResponse>(options);
  if (response.status === 200) {
    if(response.data?.current_weather !== undefined) {
      const res = response.data.current_weather as CurrentWeatherApiResponse;
      return new CurrentWeather(res);
      } else {
        throw new Error("Failed to fetch weather data");
      } 
  }
  else{
    throw new Error("Failed to fetch weather data");
  }
}
