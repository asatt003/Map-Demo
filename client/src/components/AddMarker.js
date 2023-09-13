import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import Read from "../components/fetch/Read";
import Create from "../components/fetch/Create";
import Update from "../components/fetch/Update";
import Delete from "../components/fetch/Delete";

var IDCounter = 1;

export default function AddMarker({ geolocate }) {
    const [coord, setPosition] = useState([]);

    // Create
    useMapEvents({
        click: (e) => {
            if (geolocate === false) {
                Create({param1: IDCounter, param2: e.latlng.lat.toString(), param3: e.latlng.lng.toString(), param4: setPosition});
                // setPosition([...coord,
                // {
                //     markerID: IDCounter,
                //     markerPosition: e.latlng
                // }
                // ]);
                IDCounter+= 1;
            }
        }
    });

    // Read
    useEffect(() => {
    Read({param1: setPosition});
    }, []);

    // Update
    const handleMarkerDragEnd = (idx, e) => {
        const latlng = e.target.getLatLng();
        const newCoord = [...coord];
        newCoord[idx] = {
            ...newCoord[idx],
            markerPosition: latlng
        }
        Update({param1: newCoord[idx].markerID, param2: latlng.lat.toString(), param3: latlng.lng.toString(), param4: setPosition});
        //setPosition(newCoord);
    };

    // Delete
    const removeMarker = (pos) => {
        Delete({param1: pos.markerID, param2: setPosition});
        // setPosition((prevCoord) =>
        //     prevCoord.filter((coord) => JSON.stringify(coord.markerPosition) !== JSON.stringify(pos.markerPosition))
        // );
    };

    return (
        <div>
            {coord.map((pos, idx) => (
                <Marker
                    key={`marker-${idx}`}
                    position={pos.markerPosition}
                    draggable={true}
                    eventHandlers={{
                        dragend: (e) => { handleMarkerDragEnd(idx, e) }
                    }}
                >
                    <Popup>
                        <button onClick={() => setTimeout(() => {
                            removeMarker(pos)
                        }, 100)}>Remove marker</button>
                    </Popup>
                </Marker>
            ))}
        </div>
    );
}
