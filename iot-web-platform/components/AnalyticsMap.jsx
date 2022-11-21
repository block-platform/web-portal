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

    return (
        <div className="flex justify-center">
            <GoogleMap center={center} zoom={4} mapContainerStyle={{ width: "700px", height: "700px" }}>
                <Circle center={usWest} radius={1000000} options={options} />
                <Circle center={usCentral} radius={1000000} options={options} />
                <Circle center={usEast} radius={1000000} options={options} />
            </GoogleMap>
        </div>
    );
}
