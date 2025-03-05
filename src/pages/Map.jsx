import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { Container } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useMapEvents, useMapEvent, useMap } from 'react-leaflet';


const center = {
  lat: 41.416969,
  lng: 2.133021,
};

//Draggable Marker
function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'This is Cifo La Violeta!'}
        </span>
      </Popup>
    </Marker>
  )
};

//Animation Marker to center view to a point
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  });
};

//MiniMap
// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  useMapEvents({
    move: onChange,
    zoom: onChange,
  });

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
};

function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 3;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
};


//Main Map
const Map = () => {

  const animateRef = useRef(true);

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
        center={center}
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
        <DraggableMarker />
        <SetViewOnClick animateRef={animateRef} />
        <MinimapControl position="topright" />
      </MapContainer>
    </Container>
  );
};

export default Map;