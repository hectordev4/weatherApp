import React from 'react';

const FavoritesSidebar = ({ favorites, handleMapClick, removeFromFavorites }) => {
  return (
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
  );
};

export default FavoritesSidebar;