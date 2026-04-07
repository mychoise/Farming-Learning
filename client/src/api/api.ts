import { axiosInstance } from "../lib/axios"


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

export const getAllAiChat = async(id:string)=>{
const result = await axiosInstance.get(`/ai/chat/${id}`);
return result.data
}


export const createNewSession = async ()=>{
    const result = await axiosInstance.get("/ai/new-session");
    return result.data
}

export const sendMessageToAI= async(data:{id:string , question:string})=>{
    const result = await axiosInstance.post(`/ai/chat/${data.id}`, {question:data.question});
    return result.data
}

export const chatHistory = async()=>{
    const result = await axiosInstance.get("/ai/all/history")
    return result.data
}


export const detectDisease  = async (data:{image:File , descriptionOfDisease:string , plantName:string})=>{
    console.log("data is",data)
    const result = await axiosInstance.post("/ai/detect-disease",data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return result.data
}

export const login = async(data:{email:string
    , password:string
})=>{
    const result = await axiosInstance.post("/auth/login",data)
    return result.data
}


export const signup = async(data:{email:string,password:string,name:string})=>{
    const result = await axiosInstance.post("/auth/register",data)
    return result.data
}

export const refreshToken = async () => {
  const res = await axiosInstance.get("/auth/refresh");
  return res.data;
};


export const getNotices =  async(page:number, category?:string)=>{
    let url = `/notices/allnews?page=${page}`;
    if (category) {
        url += `&category=${encodeURIComponent(category)}`;
    }
    const result = await axiosInstance.get(url)
    return result.data
}

export const getNoticeById = async(id:string)=>{
    const result = await axiosInstance.get(`/notices/news/${id}`)
    return result.data
}


export const getAllPost = async()=>{
    const result = await axiosInstance.get("/post/get-posts")
    return result.data.posts
}

export const getPostVote = async(postId:string)=>{
    const result = await axiosInstance.get(`/vote/${postId}`)
    return result.data
}

export const votePost = async (data: { postId: string; voteType: "upvote" | "downvote" }) => {
    const result = await axiosInstance.post(`/post/vote/${data.postId}`, { voteType: data.voteType });
    return result.data;
};

export const getComments = async (postId: string) => {
    const result = await axiosInstance.get(`/post/comment/${postId}`);
    return result.data.comments;
};

export const addComment = async (data: { postId: string; comment: string }) => {
    const result = await axiosInstance.post(`/post/comment/${data.postId}`, { comment: data.comment });
    return result.data.comment;
};

export const getPostById = async (postId: string) => {
    const result = await axiosInstance.get(`/post/get-post/${postId}`);
    return result.data;
};
export const getAllVideo = async()=>{
    const result = await axiosInstance.get("/video/allVideo");
    console.log("result is", result)
    return result.data;
}

export const getVideoById = async (videoId: string) => {
    const result = await axiosInstance.get(`/video/get-video/${videoId}`);
    return result.data;
}



export const createPost = async(formData:FormData) => {
    const result = await axiosInstance.post(`/post/create`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("result is", result.data)
    return result.data.data.dataToSend;
}

export const createNotice = async(formData) =>{
    const result  = await axiosInstance.post(`/notices/create`,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return result.data
}

export const addVideo = async(formData:FormData)=>{
    const result = await axiosInstance.post("/video/add",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    console.log("result is", result.data)
    return result.data
}