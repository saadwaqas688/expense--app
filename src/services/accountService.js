// /src/services/accountService.js
const Account = require('../models/accountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccount = async (userName, password) => {
  const newAccount = new Account({ userName, password });
  await newAccount.save();
  return newAccount;
};

const login = async (userName, password) => {
  const user = await Account.findOne({ userName });
  if (!user || password !== user.password) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  return { user, token };
};

module.exports = { createAccount, login };
