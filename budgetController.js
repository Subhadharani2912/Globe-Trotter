const Budget = require('../models/Budget');

exports.createBudget = async (req, res) => {
  try {
    const { amount, category, tripId } = req.body;
    if (!amount || !category || !tripId) return res.status(400).json({ message: 'Amount, category, and tripId required' });

    const budget = await Budget.create({ amount, category, tripId });
    res.status(201).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    const { amount, category } = req.body;
    budget.amount = amount || budget.amount;
    budget.category = category || budget.category;
    await budget.save();

    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    await budget.destroy();
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
