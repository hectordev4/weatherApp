import React, { useState, useEffect, useRef, useReducer } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";

// OpenWeatherMap API Key
const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const initialState = {
  position: [41.416969, 2.133021], // Default position (CIFO La Violeta)
  cityName: "",
  favorites: [],
  weather: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSITION":
      return { ...state, position: action.payload };
    case "SET_CITY_NAME":
      return { ...state, cityName: action.payload };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "SET_WEATHER":
      return { ...state, weather: action.payload };
    default:
      return state;
  }
};

const MapComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { position, cityName, favorites, weather } = state;
  const mapRef = useRef();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch({ type: "SET_FAVORITES", payload: savedFavorites });
  }, []);

  const animateRef = useRef(true);

  const getCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const city =
        response.data.address?.city || response.data.address?.town || "Unknown";
      dispatch({ type: "SET_CITY_NAME", payload: city });
      fetchWeather(lat, lon);
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      dispatch({ type: "SET_WEATHER", payload: response.data.list.slice(0, 3) }); // Get 3-day forecast
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const addToFavorites = () => {
    if (cityName && !favorites.some(fav => fav.name === cityName)) {
      const updatedFavorites = [...favorites, { name: cityName, lat: position[0], lon: position[1] }];
      dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== city);
    dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearchSelect = ({ lat, lon }) => {
    dispatch({ type: "SET_POSITION", payload: [lat, lon] });
    getCityName(lat, lon);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], mapRef.current.getZoom(), {
        animate: true,
      });
    }
  };

  const handleMapClick = (lat, lon) => {
    dispatch({ type: "SET_POSITION", payload: [lat, lon] });
    getCityName(lat, lon);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], mapRef.current.getZoom(), {
        animate: true,
      });
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return (
      <Marker position={position}>
        <Popup>
          <h2>{cityName || "Click on a city"}</h2>
          {weather &&
            weather.map((day, index) => (
              <div key={index}>
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>{day.weather[0].main}</p>
                <p>{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          <button onClick={addToFavorites}>⭐ Save to Favorites</button>
        </Popup>
      </Marker>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      
      <div style={{ flex: 1 }}>
      <SearchBar onSelect={handleSearchSelect} />
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "100vh", width: "100%" }}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
        
      </div>

      {/* Favorites Sidebar */}
      <div
        style={{
          width: "250px",
          padding: "10px",
          background: "#f8f9fa",
          borderLeft: "1px solid #ddd",
          listStyle: "none",
        }}
      >
        <h3>Favorites</h3>
        <ul style={{ listStyle: "none" }}>
          {favorites.map((city, index) => (
            <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                onClick={() => {
                  handleMapClick(city.lat, city.lon);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {city.name}
              </span>
              <button
                onClick={() => removeFromFavorites(city.name)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
