import { axiosInstance } from "../lib/axios"

export const getWeather = async()=>{
        const res = axiosInstance.get("/weather/my-weather");
        return res
}
