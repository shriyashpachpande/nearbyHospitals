// import React from 'react';
// import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import iconUrl from 'leaflet/dist/images/marker-icon.png';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// const userIcon = L.icon({
//   iconUrl,
//   shadowUrl,
//   iconAnchor: [12, 41]
// });
// const hospitalIcon = L.divIcon({
//   className: "hospital-marker",
//   html: `<div style="
//     width:30px;height:30px;
//     border-radius:50%;
//     background:linear-gradient(120deg,#00dfc0 70%,#008fff);
//     box-shadow:0 2px 14px #00dfc064;
//     display:flex;align-items:center;justify-content:center;
//     animation:bounce 1s infinite alternate;
//     color:#fff;font-weight:900;
//     font-size:1.42em;">🏥</div>`,
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
// });

// const MapView = ({ userLocation, hospitals, radius }) =>
//   !userLocation ? null : (
//     <MapContainer
//       center={[userLocation.lat, userLocation.lng]}
//       zoom={13}
//       style={{ height: '320px', width: '100%', margin: '18px auto', borderRadius:18, boxShadow:'0 2px 28px #00dfc045' }}
//       scrollWheelZoom={false}
//       >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//         <Popup>You are here</Popup>
//       </Marker>
//       {radius && <Circle center={[userLocation.lat, userLocation.lng]} radius={radius} pathOptions={{ color: '#00dfc0', fillOpacity:0.15 }} />}
//       {hospitals.map((h, i) => (
//         <Marker key={i} position={[h.lat, h.lng]} icon={hospitalIcon}>
//           <Popup>
//             <b>{h.name}</b><br />
//             {(h.distance*1000).toFixed(0)} meters away
//             {h.address && <><br/><span style={{fontSize:'0.93em',color:'#059889'}}>{h.address}</span></>}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );

// export default MapView;








import React from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconAnchor: [12, 41],
});

const MapView = ({ userLocation, hospitals, radius }) => {
  if (!userLocation) return null;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: '400px', width: '100%', marginTop: 20 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* User location marker */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={defaultIcon}>
        <Popup>Your Location</Popup>
      </Marker>
      {/* Circle for radius */}
      {radius && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={radius}
          pathOptions={{ color: 'blue', fillOpacity: 0.1 }}
        />
      )}
      {/* Hospital markers */}
      {hospitals.map((hospital, idx) => (
        <Marker key={idx} position={[hospital.lat, hospital.lng]} icon={defaultIcon}>
          <Popup>
            {hospital.name}
            <br />
            Distance: {(hospital.distance * 1000).toFixed(1)} meters
            {hospital.address && <><br />Address: {hospital.address}</>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
