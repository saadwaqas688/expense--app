const { default: mongoose } = require('mongoose');
const Expense = require('../models/expenseModel');

const createOrUpdateExpense = async (req, res) => {
  const { expenses, income, taxes, invoices } = req.body;

  try {
    const existingExpense = await Expense.findOne({ userId: req.userId });

    if (existingExpense) {
      if (expenses) existingExpense.expenses = expenses;
      if (income) existingExpense.income = income;
      if (taxes) existingExpense.taxes = taxes;
      if (invoices) existingExpense.invoices = invoices;

      await existingExpense.save();
      return res.json({ message: 'Expense data updated', data: existingExpense });
    }

    const newExpense = new Expense({ userId: req.userId, expenses, income, taxes, invoices });
    await newExpense.save();
    res.status(201).json({ message: 'Expense data created', data: newExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getExpense=async (req, res) => {
    try {
        console.log(req.userId)
      const userId = new mongoose.Types.ObjectId(req.userId)    
      
      const pipeline = [
        { $match: { userId: userId } },
        {
          $project: {
            income: {
              monthlyData: "$income",
              total: { $sum: { $map: { input: { $objectToArray: "$income" }, as: "item", in: "$$item.v" } } },
              firstQuarter: {
                $sum: [
                  { $ifNull: ["$income.1", 0] },
                  { $ifNull: ["$income.2", 0] },
                  { $ifNull: ["$income.3", 0] },
                ],
              },
              secondQuarter: {
                $sum: [
                  { $ifNull: ["$income.4", 0] },
                  { $ifNull: ["$income.5", 0] },
                  { $ifNull: ["$income.6", 0] },
                ],
              },
              thirdQuarter: {
                $sum: [
                  { $ifNull: ["$income.7", 0] },
                  { $ifNull: ["$income.8", 0] },
                  { $ifNull: ["$income.9", 0] },
                ],
              },
              fourthQuarter: {
                $sum: [
                  { $ifNull: ["$income.10", 0] },
                  { $ifNull: ["$income.11", 0] },
                  { $ifNull: ["$income.12", 0] },
                ],
              },
            },
            expenses: {
              monthlyData: "$expenses",
              total: { $sum: { $map: { input: { $objectToArray: "$expenses" }, as: "item", in: "$$item.v" } } },
              firstQuarter: {
                $sum: [
                  { $ifNull: ["$expenses.1", 0] },
                  { $ifNull: ["$expenses.2", 0] },
                  { $ifNull: ["$expenses.3", 0] },
                ],
              },
              secondQuarter: {
                $sum: [
                  { $ifNull: ["$expenses.4", 0] },
                  { $ifNull: ["$expenses.5", 0] },
                  { $ifNull: ["$expenses.6", 0] },
                ],
              },
              thirdQuarter: {
                $sum: [
                  { $ifNull: ["$expenses.7", 0] },
                  { $ifNull: ["$expenses.8", 0] },
                  { $ifNull: ["$expenses.9", 0] },
                ],
              },
              fourthQuarter: {
                $sum: [
                  { $ifNull: ["$expenses.10", 0] },
                  { $ifNull: ["$expenses.11", 0] },
                  { $ifNull: ["$expenses.12", 0] },
                ],
              },
            },
            taxes: {
              monthlyData: "$taxes",
              total: { $sum: { $map: { input: { $objectToArray: "$taxes" }, as: "item", in: "$$item.v" } } },
              firstQuarter: {
                $sum: [
                  { $ifNull: ["$taxes.1", 0] },
                  { $ifNull: ["$taxes.2", 0] },
                  { $ifNull: ["$taxes.3", 0] },
                ],
              },
              secondQuarter: {
                $sum: [
                  { $ifNull: ["$taxes.4", 0] },
                  { $ifNull: ["$taxes.5", 0] },
                  { $ifNull: ["$taxes.6", 0] },
                ],
              },
              thirdQuarter: {
                $sum: [
                  { $ifNull: ["$taxes.7", 0] },
                  { $ifNull: ["$taxes.8", 0] },
                  { $ifNull: ["$taxes.9", 0] },
                ],
              },
              fourthQuarter: {
                $sum: [
                  { $ifNull: ["$taxes.10", 0] },
                  { $ifNull: ["$taxes.11", 0] },
                  { $ifNull: ["$taxes.12", 0] },
                ],
              },
            },
            invoices: {
              monthlyData: "$invoices",
              total: { $sum: { $map: { input: { $objectToArray: "$invoices" }, as: "item", in: "$$item.v" } } },
              firstQuarter: {
                $sum: [
                  { $ifNull: ["$invoices.1", 0] },
                  { $ifNull: ["$invoices.2", 0] },
                  { $ifNull: ["$invoices.3", 0] },
                ],
              },
              secondQuarter: {
                $sum: [
                  { $ifNull: ["$invoices.4", 0] },
                  { $ifNull: ["$invoices.5", 0] },
                  { $ifNull: ["$invoices.6", 0] },
                ],
              },
              thirdQuarter: {
                $sum: [
                  { $ifNull: ["$invoices.7", 0] },
                  { $ifNull: ["$invoices.8", 0] },
                  { $ifNull: ["$invoices.9", 0] },
                ],
              },
              fourthQuarter: {
                $sum: [
                  { $ifNull: ["$invoices.10", 0] },
                  { $ifNull: ["$invoices.11", 0] },
                  { $ifNull: ["$invoices.12", 0] },
                ],
              },
            },
          },
        },
      ];
  
      const [result] = await Expense.aggregate(pipeline);
  
      if (!result) {
        return res.status(404).json({ message: 'Expense data not found' });
      }
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { createOrUpdateExpense, getExpense };
