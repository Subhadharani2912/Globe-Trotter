const TripStop = require('../models/TripStop');

exports.createTripStop = async (req, res) => {
  try {
    const { name, location, date, tripId } = req.body;
    if (!name || !date || !tripId) return res.status(400).json({ message: 'Name, date, and tripId are required' });

    const stop = await TripStop.create({ name, location, date, tripId });
    res.status(201).json(stop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTripStops = async (req, res) => {
  try {
    const stops = await TripStop.findAll();
    res.json(stops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTripStopById = async (req, res) => {
  try {
    const stop = await TripStop.findByPk(req.params.id);
    if (!stop) return res.status(404).json({ message: 'TripStop not found' });
    res.json(stop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTripStop = async (req, res) => {
  try {
    const stop = await TripStop.findByPk(req.params.id);
    if (!stop) return res.status(404).json({ message: 'TripStop not found' });

    const { name, location, date } = req.body;
    stop.name = name || stop.name;
    stop.location = location || stop.location;
    stop.date = date || stop.date;
    await stop.save();

    res.json(stop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTripStop = async (req, res) => {
  try {
    const stop = await TripStop.findByPk(req.params.id);
    if (!stop) return res.status(404).json({ message: 'TripStop not found' });

    await stop.destroy();
    res.json({ message: 'TripStop deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
