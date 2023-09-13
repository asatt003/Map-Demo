export default function Delete (props) {
    fetch(`http://localhost:8080?marker_id=${props.param1}`, {
        method: "DELETE"
    })
        .then((rawResponse) => {
            if (!rawResponse.ok) {
                throw new Error(
                    `code: ${rawResponse.status}, status text: ${rawResponse.statusText}`
                );
            }
        return rawResponse.json();
        })
        .then(response => {
            const customizedResponse = []
            response.map(obj => {
                customizedResponse.push({
                    markerID: obj.marker_id,
                    markerPosition: {lat: Number(obj.latitude), lng: Number(obj.longitude)}
                })
            })
            props.param2(customizedResponse);
        })
        .catch((error) => console.log(error));
}