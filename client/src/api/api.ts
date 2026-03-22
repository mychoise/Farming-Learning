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

export type OrganicFertilizerCalculation = {
  crop: string;
  areaInHectare: number;
  nutrientsNeeded: {
    N_kg: number;
    P_kg: number;
    K_kg: number;
  };
  fertilizers: {
    "Farmyard Manure": number;
    Vermicompost: number;
    Compost: number;
    "Mustard Oil Cake": number;
  };
};


export type InOrganicFertilizerCalculation = {
        crop: string,
        areaInHectare: number,
        nutrientsNeeded: {
            N_kg: number,
            P_kg: number,
            K_kg: number
        },
        fertilizers: {
            Urea: number,
            DAP: number,
            MOP: number
        }
}

export type animalWeightEstimationResponse = {
        animalName: string,
        HeartGrith: string,
        BodyLength: string,
        weight: number
}

export const getMyWeather = async(data: { lat: number | string; lon: number | string }) => {
    const result = await axiosInstance.post("/weather/my-weather",{
        latitudeInput: Number(data.lat),
        longitudeInput: Number(data.lon)
    })
    return result.data.data as WeatherData
}

export const getOrganicFertilizerCalculation = async (data: { cropName: string; SystemOfLandCalculation: string; length: number; wide: number }) => {
const result = await axiosInstance.post("/calculate/organic-fertilizer",data)
return result.data.data as OrganicFertilizerCalculation

}


export const InorganicFertilizerCalculation  = async (data:{ cropName: string; SystemOfLandCalculation: string; length: number; wide: number }) => {
    const result = await axiosInstance.post("/calculate/inorganic-fertilizer",data)
    return result.data.data as InOrganicFertilizerCalculation
}

export const getAnimalWeightEstimation = async (data: { HeartGirth: number; BodyLength: number ;animalName: string}) => {
    const result = await axiosInstance.post("/calculate/animal-weight",data)
    return result.data.data as animalWeightEstimationResponse
}

export const getUnitConversion = async (data: { currentUnit: string; firstValue: number; targetUnit: string }) => {
    const result = await axiosInstance.post("/calculate/unit-conversion",data)
    return result.data.result as number
}


export const getCropCalender =  async ()=>{
    console.log('api called')
    const result = await axiosInstance.get("/cropcalender/get")
    return result.data.data
}
