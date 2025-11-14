// import React from 'react';

// const HospitalList = ({ hospitals }) =>
//   !(hospitals?.length)
//     ? <div style={{textAlign:'center',margin:24,color:'#777'}}>No hospitals found in this radius.</div>
//     : (
//       <ul className="hosp-list">
//         {hospitals.map((h, i) => (
//           <li key={i}>
//             <span className="hosp-name">{h.name}</span> <span className="hosp-distance">({(h.distance*1000).toFixed(0)} meters)</span>
//             {h.address && <div className="hosp-address">{h.address}</div>}
//           </li>
//         ))}
//       </ul>
//     );
// export default HospitalList;







import React from 'react';

const HospitalList = ({ hospitals }) => {
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="no-hospitals" style={{textAlign:'center',margin:'24px',color:'#777'}}>
        No hospitals found in this radius.
      </div>
    );
  }

  return (
    <div className="hospital-list" style={{marginTop:'20px',    padding:'50px',backgroundColor:'#f5f5f5',borderRadius:'20px',boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
      {hospitals.map((h, i) => (
        <div className="hospital-card" key={i} style={{borderBottom:'1px solid #ddd', padding:'10px 0'}}>
          <div className="hospital-header">
            <h3 className="hospital-name">{h.name}</h3>
            <span className="distance-pill">
              {(h.distance * 1000).toFixed(0)} m
            </span>
          </div>

          {h.address && (
            <div className="hospital-address">{h.address}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
