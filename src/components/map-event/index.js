import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';

import './index.css'

const MapComponent = ({ point }) => {

   useMapEvent('click', (e) => {
    point = e.latlng;
    console.log(point);
  })
  return null
}

const MapEvent = ({ point }) => {
  return (
    <div className="map">
      <MapContainer center={[42.69751, 23.32415]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[42.69751, 23.32415]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MapComponent point={point} />
      </MapContainer>
    </div>
  )
}

export default MapEvent;
