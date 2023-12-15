import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import React, { useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: require("../../assets/mapmarker.png"),
  iconSize: [35, 35],
  iconAnchor: [12, 40],
  popupAnchor: [3, -40]
});

export function Map(props) {
  const zoomLevel = 10;
  const [markerCoords, setMarkerCoords] = useState(null);
  function handleMapClick(e) {
    const newMarker = [e?.latlng?.lat,e?.latlng?.lng]
    props.onAdLoc(newMarker);
    setMarkerCoords(newMarker);
  }

  return (
    <div style={{ width: '41rem', justifyContent: 'center' }}>
      <MapContainer style={{ height: '18rem' }} center={[35.7, 51.4]} zoom={zoomLevel} scrollWheelZoom={true} >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=m3Uw9viTGOipjGtDWWTu"
        />
        <MapClickHandler onClick={handleMapClick} />
        {markerCoords && <Marker icon={markerIcon} position={markerCoords}></Marker>}
      </MapContainer>
    </div>
  );
}

function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e);
    },
  });
  return null;
}
