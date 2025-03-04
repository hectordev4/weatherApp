import React, {useState, useEffect} from 'react';
import { Container } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useMapEvents } from 'react-leaflet';


const MapEvents = () => {
  const map = useMapEvents({
    click(e) {
      alert(`Map clicked at ${e.latlng}`);
    }
  });
  return null;
};

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <Container sx={{ 
      marginTop: 2,
      }}>
      <MapContainer
        center={[41.416969, 2.133021]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, idx) => (
          <Marker key={idx} position={[location.lat, location.lon]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
        <MapEvents />
      </MapContainer>
    </Container>
  );
};

export default Map;