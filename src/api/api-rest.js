import axios from "axios";
const VITE_OPEN_WEATHER_API_KEY = process.env.VITE_OPEN_WEATHER_API_KEY;

export const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_OPEN_WEATHER_API_KEY}`
  );
  return response.data;
}