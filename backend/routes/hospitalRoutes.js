import { Router } from 'express';
import { searchHospitals } from '../controllers/hospitalController.js';

const router = Router();

router.get('/', searchHospitals);

export default router;
