import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function AddMarker({geolocate}) {
    const [coord, setPosition] = useState([]);

    useMapEvents({
        click: (e) => {
            if (geolocate === false) {setPosition([...coord, e.latlng]);}
        }
    });

    useEffect(() => {
        console.log(coord);
    }, [coord]);

    const removeMarker = (pos) => {
        setPosition((prevCoord) =>
            prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(pos))
        );
    };

    const handleMarkerDragEnd = (idx, e) => {
        const latlng = e.target.getLatLng();
        const newCoord = [...coord];
        newCoord[idx] = latlng;
        setPosition(newCoord);
        console.log(coord[idx]);
      };

    return (
        <div>
            {coord.map((pos, idx) => (
                <Marker
                    key={`marker-${idx}`}
                    position={pos}
                    draggable={true}
                    eventHandlers={{
                        dragend: (e) => {handleMarkerDragEnd(idx, e)}
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