const City = require('../models/City');

exports.createCity = async (req, res) => {
  try {
    const { name, country, description } = req.body;
    const city = await City.create({ name, country, description });
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await City.update(req.body, { where: { id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'City not found' });
    res.json({ message: 'City updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await City.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'City not found' });
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
