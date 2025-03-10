import React, { useState, useEffect, useReducer } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import FavoritesSidebar from "../components/FavoritesSidebar";
import CardMap from "../components/CardMap";
import L from 'leaflet';

// Fix for Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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

const MapUpdater = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      map.flyTo([coords.lat, coords.lng], 13, { animate: true });
    }
  }, [coords, map]);

  return null;
};

const MapComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { position, cityName, favorites } = state;

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

  const handleSearchSelect = ({ lat, lon }) => {
    dispatch({ type: "SET_POSITION", payload: [lat, lon] });
    getCityName(lat, lon);
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

  const handleMapClick = (lat, lon) => {
    dispatch({ type: "SET_POSITION", payload: [lat, lon] });
    getCityName(lat, lon);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return (
      <CardMap position={position} cityName={cityName} addToFavorites={addToFavorites} favorites={favorites} />
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <SearchBar onSearchSelect={handleSearchSelect} />
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "100vh", width: "100%" }}
        >
          <MapUpdater coords={{ lat: position[0], lng: position[1] }} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Favorites Sidebar */}
      <FavoritesSidebar
        favorites={favorites}
        onRemoveFromFavorites={removeFromFavorites}
        handleMapClick={handleMapClick}
      />
    </div>
  );
};

export default MapComponent;