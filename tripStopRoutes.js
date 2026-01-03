const express = require('express');
const router = express.Router();
const tripStopController = require('../controllers/tripStopController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Protect all trip stop routes

router.post('/', tripStopController.createTripStop);
router.get('/', tripStopController.getTripStops);
router.get('/:id', tripStopController.getTripStopById);
router.put('/:id', tripStopController.updateTripStop);
router.delete('/:id', tripStopController.deleteTripStop);

module.exports = router;
