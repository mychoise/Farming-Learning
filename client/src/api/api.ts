import { axiosInstance } from "../lib/axios"

export type WeatherApiResponse = {
  success: boolean;
  data: WeatherData;
};

export type WeatherData = {
  location: Location;
  current: Current;
  hourly: Hourly;
  daily: Daily;
  farming: Farming;
};

type Location = {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  country: string;
  city: string;
  formated_address: string; // typo is intentional — matches API
};

type Description = {
  en: string;
  np: string;
};

type Current = {
  time: string;
  temperature_2m: number;
  precipitation: number;
  rain: number;
  soil_temperature_0cm: number;
  soil_temperature_6cm: number;
  soil_temperature_18cm: number;
  weather_code: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation_probability: number;
  icon: string;
  icon_url: string;
  description: Description;
};

type Hourly = {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  soil_temperature_0cm: number[];
  soil_temperature_6cm: number[];
  soil_temperature_18cm: number[];
  weather_code: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
  icons: string[];
  icon_urls: string[];
};

type Daily = {
  time: string[];
  temperature_max: number[];
  temperature_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  weather_code: number[];
  wind_speed_max: number[];
  icons: string[];
  icon_urls: string[];
  descriptions: Description[];
};

type CropSuggestion = {
  crop: string;
  emoji: string;
  np: string;
  en: string;
};

type FarmingAlert = {
  type: "success" | "warning" | "danger" | "info";
  en: string;
  np: string;
};

type Farming = {
  crop_suggestions: CropSuggestion[];
  alerts: FarmingAlert[];
};

export const getMyWeather = async(data: { lat: number | string; lon: number | string }) => {
    const result = await axiosInstance.post("/weather/my-weather",{
        latitudeInput: Number(data.lat),
        longitudeInput: Number(data.lon)
    })
    return result.data.data as WeatherData
}
