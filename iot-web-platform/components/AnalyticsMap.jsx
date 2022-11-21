import { useJsApiLoader, GoogleMap, Circle } from '@react-google-maps/api';

export default function AnalyticsMap(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    })

    const center = { lat: 40.256310, lng: -98.177603 }
    const usWest = { lat: 37.087596, lng: -119.697997 }
    const usCentral = { lat: 38.025883, lng: -100.378311 }
    const usEast = { lat: 38.964653, lng: -79.710132 }

    const options = {
        strokeColor: '#FF0000',
        fillColor: '#FF0000',
    }

    if (!isLoaded) {
        return (
            <div>Loading...</div>
        );
    }

    let usWestRadius = 0;
    let usCentralRadius = 0;
    let usEastRadius = 0;

    for (let i = 0; i < props.mapData.length; i++) {
        if (props.mapData[i].region === 'US West') {
            usWestRadius += 1;
        } else if (props.mapData[i].region === 'US Central') {
            usCentralRadius += 1;
        } else if (props.mapData[i].region === 'US East') {
            usEastRadius += 1;
        }
    }

    const total = usWestRadius + usCentralRadius + usEastRadius;

    usWestRadius = (usWestRadius / total) * 1000000;
    usCentralRadius = (usCentralRadius / total) * 1000000;
    usEastRadius = (usEastRadius / total) * 1000000;

    return (
        <div className="flex justify-center">
            <GoogleMap center={center} zoom={4} mapContainerStyle={{ width: "700px", height: "700px" }}>
                <Circle center={usWest} radius={usWestRadius} options={options} />
                <Circle center={usCentral} radius={usCentralRadius} options={options} />
                <Circle center={usEast} radius={usEastRadius} options={options} />
            </GoogleMap>
        </div>
    );
}
