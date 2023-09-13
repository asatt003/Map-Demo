import * as React from "react";
import { MapContainer, TileLayer, LayerGroup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import Switch from '@mui/material/Switch';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import AddMarker from "./components/AddMarker";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
      click() {
          map.locate()
      },
      locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, 6)
      },
  })

  return position === null ? null : (
      <LayerGroup>
          <Circle
              center={position}
              pathOptions={{ fillColor: 'blue' }}
              radius={28800}
          />
      </LayerGroup>
  )
}


function App() {
  const [geolocate, setGeolocate] = useState(false);

  const handleChange = (event) => {
    setGeolocate(event.target.checked);
  };

  const label = { inputProps: { 'aria-label': 'Enable Geolocation' } };

  return (
    <div className="Movie App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MapContainer style={{ height: "50vh", width: "50%" }} center={[39.056198, -95.695312]} zoom={4} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AddMarker geolocate={geolocate}/>
          {geolocate === true ? <LocationMarker /> : null}
        </MapContainer>
        <span>Enable/Disable self-geolocation</span>
        <Switch {...label} checked={geolocate} onChange={handleChange} />
      </header>
    </div>
  );
}

export default App;
