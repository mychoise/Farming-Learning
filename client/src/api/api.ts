import { axiosInstance } from "../lib/axios"

// const data:{latitudeInput:string, longitudeInput:string} = {
//   "latitudeInput": "28.2669",
//   "longitudeInput": "83.9685"
// }

export const getMyWeather = async(data: { lat: string; lon: string }) => {
    const result = await axiosInstance.post("/weather/my-weather",{
        latitudeInput: data.lat,
        longitudeInput: data.lon
    })
    return result.data.data
}
