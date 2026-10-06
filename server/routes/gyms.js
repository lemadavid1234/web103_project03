import express from "express"

import GymsController from '../controllers/gyms.js'



const router = express.Router();

router.get('/', GymsController.getGyms);

router.get('/:gymId', GymsController.getGymsById);


export default router;
