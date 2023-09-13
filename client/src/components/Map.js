import * as React from "react";

import { Container } from "@mui/material";
import { Map } from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup, LayerGroup, Circle } from 'react-leaflet'
import { useState, useEffect } from 'react';
import { useMapEvents, useMapEvent } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon from "leaflet/dist/images/marker-icon.png";
import AddMarker from "./AddMarker";

//creates an index for each marker
var newIndex = 1;

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// function AddMarker(props) {
//     console.log("Made it to top")
//     const [newPosition, setNewPosition] = useState(null)
//     const map = useMapEvents({
//         click() {
//             map.locate()
//         },
//         locationfound(e) {
//             setNewPosition(e.latlng)
//             props.setMarker({ ...props.marker, newPosition });
//         },
//     })
//     console.log("Made it to bottom")

//     return newPosition === null ? null : (
//         <Marker position={newPosition}>
//             <Popup>
//                 User-added marker.
//             </Popup>
//         </Marker>
//     )
// }

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

function MyComponent() {
    const map = useMapEvent('click', () => {
        map.setView([50.5, 30.5], map.getZoom())
    })
    return null
}

function MyMapComponent() {
    return (
        <MapContainer center={[50.5, 30.5]} zoom={13}>
            <MyComponent />
        </MapContainer>
    )
}

export default function DisplayMap() {
    // const [geolocate, setGeolocate] = useState(false);
    // const marker = [];

    // const handleChange = (event) => {
    //     setGeolocate(event.target.checked);
    // };

    // function MyComponent() {
    //     const map = useMapEvents({
    //       click: (e) => {
    //         const { lat, lng } = e.latlng;
    //         L.marker([lat, lng]).addTo(map);
    //       }
    //     });
    //     return null;
    //   }

    // const label = { inputProps: { 'aria-label': 'Enable Geolocation' } };
    // return (
    //     <>
    //         <MapContainer style={{ height: "50vh", width: "50%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    //             <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             {geolocate === true ? <LocationMarker /> : <MyComponent />}

    //         </MapContainer>
    //         <span>Enable/Disable self-geolocation</span>
    //         <Switch {...label} checked={geolocate} onChange={handleChange} />
    //     </>
    // )

    // const [geolocate, setGeolocate] = useState(false);
    // //var map = L.map('map').setView([51.505, -0.09], 13);
    // var markers = [];

    // const handleChange = (event) => {
    //     setGeolocate(event.target.checked);
    // };

    // function clearMarker(id, map) {
    //     var new_markers = [];
    //     markers.forEach(function (marker) {
    //         if (marker._id == id) map.removeLayer(marker)
    //         else new_markers.push(marker)
    //     })
    //     markers = new_markers;
    // }

    // function MyComponent() {
    //     const map = useMapEvents({
    //         click: (e) => {
    //             var id
    //             if (markers.length < 1) id = 0
    //             else id = markers[markers.length - 1]._id + 1
    //             console.log(id);
    //             var popupContent =
    //             '<p>Some Infomation</p></br>' +
    //             '<p>test</p></br>' +
    //             `<button onclick={
    //                 var new_markers = [];
    //                 console.log(id)
    //                 markers.forEach(function (marker) {
    //                     if (marker._id == id) map.removeLayer(marker)
    //                     else new_markers.push(marker)
    //                 })
    //                 markers = new_markers;
    //             }>Clear Marker</button>`;
    //             let myMarker = L.marker(e.latlng, {
    //                 draggable: true
    //             });
    //             myMarker._id = id
    //             var myPopup = myMarker.bindPopup(popupContent, {
    //                 closeButton: true
    //             });
    //             map.addLayer(myMarker)
    //             markers.push(myMarker)
    //         }
    //     });
    //     return null;
    // }


    // const label = { inputProps: { 'aria-label': 'Enable Geolocation' } };
    // return (
    //     <>
    //         <MapContainer style={{ height: "50vh", width: "50%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    //             <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             {geolocate === true ? <LocationMarker /> : <MyComponent />}

    //         </MapContainer>
    //         <span>Enable/Disable self-geolocation</span>
    //         <Switch {...label} checked={geolocate} onChange={handleChange} />
    //     </>
    // )
    const position = [51.505, -0.09];

    return (
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddMarker />
        </MapContainer>
    );
}