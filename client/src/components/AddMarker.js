import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

var IDCounter = 1;

export default function AddMarker({ geolocate }) {
    const [coord, setPosition] = useState([]);

    // Create
    useMapEvents({
        click: (e) => {
            if (geolocate === false) {
                setPosition([...coord,
                {
                    markerID: IDCounter,
                    markerPosition: e.latlng
                }
                ]);
                IDCounter+= 1;
            }
        }
    });

    // Read
    useEffect(() => {
        console.log(coord);
    }, [coord]);

    // Update
    const handleMarkerDragEnd = (idx, e) => {
        const latlng = e.target.getLatLng();
        const newCoord = [...coord];
        newCoord[idx] = {
            ...newCoord[idx],
            markerPosition: latlng
        }
        setPosition(newCoord);
        console.log(coord[idx].markerPosition);
    };

    // Delete
    const removeMarker = (pos) => {
        setPosition((prevCoord) =>
            prevCoord.filter((coord) => JSON.stringify(coord.markerPosition) !== JSON.stringify(pos))
        );
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
                            removeMarker(pos.markerPosition)
                        }, 100)}>Remove marker</button>
                    </Popup>
                </Marker>
            ))}
        </div>
    );
}