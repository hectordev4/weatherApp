import axios from "axios";
import { VITE_OPEN_WEATHER_API_KEY } from "/home/hector/Documents/myProjects/weatherApp/.env";

export const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_OPEN_WEATHER_API_KEY}`
  );
  return response.data;
}