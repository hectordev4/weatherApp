import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'

export default function Map() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }} />
    )
    }