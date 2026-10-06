import express from "express"

import LocationsController from '../controllers/locations.js'



const router = express.Router();

router.get('/', LocationsController.getLocations);

router.get('/:borough/gyms', LocationsController.getGymsByLocation);



export default router;
