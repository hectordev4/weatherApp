import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const SearchBar = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(localStorage.getItem("inputValue") || "");
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") ? JSON.parse(localStorage.getItem("selectedOption")) : null
  );
  const [recentSearches, setRecentSearches] = useState(
    localStorage.getItem("recentSearches") ? JSON.parse(localStorage.getItem("recentSearches")) : []
  );

  useEffect(() => {
    if (inputValue) {
      handleSearch(inputValue);
    }
  }, []);

  const handleSearch = async (inputValue) => {
    if (!inputValue) return;
    try {
      console.log(`Searching for: ${inputValue}`); // Debug log
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
      );
      const results = response.data.map((place) => ({
        label: place.display_name,
        value: { lat: parseFloat(place.lat), lon: parseFloat(place.lon) },
      }));
      console.log('Search results:', results); // Debug log
      setOptions(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleRecentSearches = (selected) => {
    const updatedRecentSearches = [selected, ...recentSearches.filter(item => item.label !== selected.label)];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the dropdown appears above the map
    }),
  };

  return (
    <Select
      options={inputValue ? options : recentSearches}
      value={selectedOption}
      inputValue={inputValue}
      onInputChange={(newValue, { action }) => {
        if (action === "input-change") {
          setInputValue(newValue);
          localStorage.setItem("inputValue", newValue);
          handleSearch(newValue);
        }
      }}
      onChange={(selected) => {
        if (selected) {
          setSelectedOption(selected);
          setInputValue(selected.label);
          localStorage.setItem("selectedOption", JSON.stringify(selected));
          localStorage.setItem("inputValue", selected.label);
          handleRecentSearches(selected);
          onSelect(selected.value);
        } else {
          setSelectedOption(null);
          setInputValue("");
          localStorage.removeItem("selectedOption");
          localStorage.removeItem("inputValue");
        }
      }}
      placeholder="Search for a city..."
      noOptionsMessage={() => "No options"}
      isClearable
      styles={customStyles}
    />
  );
};

export default SearchBar;