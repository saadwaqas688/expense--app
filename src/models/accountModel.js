const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  bankDetails: {
    name: { type: String },
    accountId: { type: String },
    balance: { type: String },
  },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
