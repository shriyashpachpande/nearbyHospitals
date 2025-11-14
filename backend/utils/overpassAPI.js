import axios from 'axios';

const radiusSteps = [500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];

// Haversine distance in km
function calculateDistance(lat1, lng1, lat2, lng2) {
  function toRad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Overpass API query builder
function buildOverpassQuery(lat, lng, radius) {
  return `[out:json];
(
  node["amenity"="hospital"](around:${radius},${lat},${lng});
);
out;`;
}

/**
 * Progressive search for hospitals with early termination.
 */
export async function fetchHospitalsWithProgressiveRadius(userLat, userLng) {
  for (const radius of radiusSteps) {
    const query = buildOverpassQuery(userLat, userLng, radius);
    try {
      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        query,
        { headers: { 'Content-Type': 'text/plain' }, timeout: 10000 }
      );
      if (!response.data || !response.data.elements) continue;

      const hospitalsRaw = response.data.elements;

      const hospitals = hospitalsRaw.map(hospital => {
        const distKm = calculateDistance(userLat, userLng, hospital.lat, hospital.lon);
        return {
          name: hospital.tags?.name || 'Unnamed Hospital',
          lat: hospital.lat,
          lng: hospital.lon,
          distance: Math.round(distKm * 1000) / 1000,
          address: hospital.tags?.['addr:full'] || hospital.tags?.['addr:street'] || null,
        };
      });

      if (hospitals.length > 0) {
        return { radiusUsed: radius, hospitals };
      }
    } catch (error) {
      // continue searching with next radius
      continue;
    }
  }
  return { radiusUsed: null, hospitals: [] };
}
