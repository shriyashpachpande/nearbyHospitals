import React from 'react';

const BoxShow = ({ title, children }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px 0' }}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default BoxShow;
