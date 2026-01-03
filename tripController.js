const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const userId = req.user.id; // set by authMiddleware

    const trip = await Trip.create({ name, description, startDate, endDate, userId });
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({ where: { userId: req.user.id } });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
