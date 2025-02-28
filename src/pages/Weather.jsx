import { useState, useEffect } from "react";
import axios from "axios";
import { getWeather } from "../api/api-rest";

const fetchWeather = async (city) => {
  const response = await getWeather(city);
  return response;
}

export default function Weather() {

  
}