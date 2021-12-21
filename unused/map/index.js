import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import './index.css'

const Map = () => {


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
      </MapContainer>
      <p>sssssssssssssss</p>
    </div>
  )
}

export default Map;

// const Map = () => {


//   return (
//     <div className="map">
//       <MapContainer center={[42.69751, 23.32415]} zoom={10} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[42.69751, 23.32415]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//       <p>sssssssssssssss</p>
//     </div>
//   )
// }
