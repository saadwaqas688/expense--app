const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  expenses: { type: Map, of: Number, required: true },
  income: { type: Map, of: Number, required: true },
  taxes: { type: Map, of: Number, required: true },
  invoices: { type: Map, of: Number, required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
