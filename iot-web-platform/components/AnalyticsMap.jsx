import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

export default function AnalyticsMap(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    })

    const centerChina = { lat: 26.282581, lng: 107.896686 }
    const guandong = { lat: 24.043248, lng: 114.740903 }
    const guangxi = { lat: 24.062199, lng: 110.517365 }
    const yunnan = { lat: 24.545885, lng: 101.519394 }
    const hainan = { lat: 19.339891, lng: 109.755478 }

    const centerIndonesia = { lat: -6.419890, lng: 108.117360 }
    const lampung = { lat: -4.810370, lng: 105.250977 }
    const eastJava = { lat: -7.428161, lng: 112.114438 }
    const westJava = { lat: -6.997026, lng: 107.713104 }

    if (!isLoaded) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        // Create div to center map
        <div className="flex justify-center">
            <GoogleMap center={centerIndonesia} zoom={4} mapContainerStyle={{ width: "700px", height: "700px" }}>
                <Marker position={lampung} />
                <Marker position={eastJava} />
                <Marker position={westJava} />
            </GoogleMap>
        </div>
    );
}
