import React from 'react';

const SearchButton = ({ onClick, loading }) => (
  <button className="ripple" onClick={onClick} disabled={loading} style={{marginTop:'20px', height:'45px', width:'100%', fontSize:'16px', fontWeight:'bold', backgroundColor:'#000000', color:'#ffffff', border:'none', borderRadius:'8px', cursor:'pointer'}}>
    {loading ? <div className="loader"></div> : "🔍 Search Nearby Hospitals"}
  </button>
);
export default SearchButton;



// import React from "react";

// const SearchButton = ({ onClick, loading }) => (
//   <button
//     className={`pro-search-btn ${loading ? "loading-btn" : ""}`}
//     onClick={onClick}
//     disabled={loading}
//   >
//     {loading ? <div className="pro-loader"></div> : "🔍 Search Nearby Hospitals"}
//   </button>
// );

// export default SearchButton;
