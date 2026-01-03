const express = require('express');
const router = express.Router();
const { createTrip, getTrips } = require('../controllers/tripController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createTrip);
router.get('/', authMiddleware, getTrips); // make sure getTrips is exported in controller

module.exports = router;
