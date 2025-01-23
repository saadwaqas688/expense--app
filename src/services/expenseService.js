// /src/services/expenseService.js
const Expense = require('../models/expenseModel');

const createOrUpdateExpense = async (userId, expenseData) => {
  const existingExpense = await Expense.findOne({ userId });
  if (existingExpense) {
    Object.assign(existingExpense, expenseData);
    await existingExpense.save();
    return existingExpense;
  }

  const newExpense = new Expense({ userId, ...expenseData });
  await newExpense.save();
  return newExpense;
};

module.exports = { createOrUpdateExpense };
