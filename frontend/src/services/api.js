import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust if deployed elsewhere

export const getNearbyHospitals = async (lat, lng) => {
  const response = await axios.get(`${BASE_URL}/search-hospitals`, {
    params: { lat, lng },
  });
  return response.data;
};
