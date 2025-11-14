import React, { useState, useEffect } from 'react';
import SearchButton from '../components/SearchButton';
import MapView from '../components/MapView';
import HospitalList from '../components/HospitalList';
import { getNearbyHospitals } from '../services/api';

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [radiusUsed, setRadiusUsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
      () => setError("Location permission denied or error getting location."),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSearch = async () => {
    if (!userLocation) { setError("Location not ready."); return; }
    setLoading(true); setError(null); setHospitals([]); setRadiusUsed(null);
    try {
      const data = await getNearbyHospitals(userLocation.lat, userLocation.lng);
      if (data.success) {
        setHospitals(data.hospitals);
        setRadiusUsed(data.radiusUsed);
        if (!data.hospitals.length) setError("No hospitals found nearby.");
      } else setError("Failed to fetch hospitals.");
    } catch {
      setError("Network/server error occurred.");
    } finally { setLoading(false); }
  };

  return (
    <div className="container" style={{backgroundColor:'#f5f5f5',padding:'20px',borderRadius:'8px',maxWidth:'900px',margin:'30px auto',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
      <h1>Emergency Nearby <span style={{color:'#000000ff',backgroundColor:'#f5f5f5'}}>Hospital Finder</span></h1>
      <p style={{marginTop:'20px',textAlign:'center', color:'#374171',fontSize:'20px',fontWeight:'bold'}}>Find real, live hospitals near you, instantly!</p>
      <SearchButton onClick={handleSearch} loading={loading}  />
      {radiusUsed && <div className="radius-badge" style={{textAlign:'center',margin:'24px',color:'#777'}}>Radius Used: {radiusUsed} meters</div>}
      {error && <div className="error">{error}</div>}
      <MapView userLocation={userLocation} hospitals={hospitals} radius={radiusUsed} />
      <HospitalList hospitals={hospitals} />
    </div>
  );
};
export default Home;












// import React, { useState, useEffect } from 'react';
// import SearchButton from '../components/SearchButton';
// import MapView from '../components/MapView';
// import HospitalList from '../components/HospitalList';
// import { getNearbyHospitals } from '../services/api';

// const Home = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [radiusUsed, setRadiusUsed] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
//       () => setError("Location permission denied or error getting location."),
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const handleSearch = async () => {
//     if (!userLocation) {
//       setError("Location not ready.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setHospitals([]);
//     setRadiusUsed(null);

//     try {
//       const data = await getNearbyHospitals(userLocation.lat, userLocation.lng);
//       if (data.success) {
//         setHospitals(data.hospitals);
//         setRadiusUsed(data.radiusUsed);

//         if (!data.hospitals.length) {
//           setError("No hospitals found nearby.");
//         }
//       } else {
//         setError("Failed to fetch hospitals.");
//       }
//     } catch {
//       setError("Network/server error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* HEADER */}
//       <header className="header-box">
//         <h1 className="title">
//           Emergency Nearby <span className="highlight">Hospital Finder</span>
//         </h1>
//         <p className="subtitle">
//           Find real & verified hospitals near you instantly!
//         </p>
//       </header>

//       {/* SEARCH BUTTON */}
//       <div className="center-box">
//         <SearchButton onClick={handleSearch} loading={loading} />
//       </div>

//       {/* RADIUS BADGE */}
//       {radiusUsed && (
//         <div className="radius-tag">Radius Used: {radiusUsed} meters</div>
//       )}

//       {/* ERROR MESSAGE */}
//       {error && <div className="error-box">{error}</div>}

//       {/* MAP VIEW */}
//       <div className="map-wrapper">
//         <MapView userLocation={userLocation} hospitals={hospitals} radius={radiusUsed} />
//       </div>

//       {/* HOSPITAL LIST */}
//       <HospitalList hospitals={hospitals} />
//     </div>
//   );
// };

// export default Home;
