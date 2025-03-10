import React, { useState, useEffect, useRef, useReducer } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import FavoritesSidebar from "../components/FavoritesSidebar";
import WeatherForecast from "../components/WeatherForecast";

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
    default:
      return state;
  }
};

const MapComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { position, cityName, favorites } = state;
  const mapRef = useRef();
  const animateRef = useRef(true);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch({ type: "SET_FAVORITES", payload: savedFavorites });
  }, []);

  const getCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const city =
        response.data.address?.city || response.data.address?.town || "Unknown";
      dispatch({ type: "SET_CITY_NAME", payload: city });
    } catch (error) {
      console.error("Error fetching city name:", error);
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
        animate: animateRef.current,
      });
    }
  };

  const handleMapClick = (lat, lon) => {
    dispatch({ type: "SET_POSITION", payload: [lat, lon] });
    getCityName(lat, lon);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], mapRef.current.getZoom(), {
        animate: animateRef.current,
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
          <WeatherForecast lat={position[0]} lon={position[1]} />
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
      <FavoritesSidebar
        favorites={favorites}
        handleMapClick={handleMapClick}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
};

export default MapComponent;