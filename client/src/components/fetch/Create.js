export default function Create(props) {

    let newAdd = {
        marker_id: props.param1,
        latitude: props.param2,
        longitude: props.param3
    };

    fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAdd)
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
            props.param4(customizedResponse);
        })
        .catch((error) => console.log(error));
}