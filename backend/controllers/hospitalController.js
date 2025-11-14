import { fetchHospitalsWithProgressiveRadius } from '../utils/overpassAPI.js';

// Handles GET /search-hospitals?lat=...&lng=...
export async function searchHospitals(req, res, next) {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'Invalid latitude or longitude' });
    }

    const result = await fetchHospitalsWithProgressiveRadius(lat, lng);

    if (!result.hospitals.length) {
      return res.json({ success: true, radiusUsed: null, hospitals: [] });
    }

    res.json({
      success: true,
      radiusUsed: result.radiusUsed,
      hospitals: result.hospitals,
    });
  } catch (error) {
    next(error);
  }
}
