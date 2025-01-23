const Account = require('../models/accountModel');
const jwt = require('jsonwebtoken');


const createAccount = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Missing required account data' });
  }

  try {
    const newAccount = new Account({ userName, password });
    await newAccount.save();
    res.status(201).json({ message: 'Account created successfully', data: newAccount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const user = await Account.findOne({ userName });
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({
      message: 'Login successful',
      data: {
        userName: user.userName,
        bankDetails: user.bankDetails,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update bank details
const updateBankDetails = async (req, res) => {
  const { bankDetails } = req.body;

  if (!bankDetails) {
    return res.status(400).json({ message: 'Missing bank details' });
  }

  try {
    const account = await Account.findById(req.userId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.bankDetails = bankDetails;
    await account.save();

    res.status(200).json({ message: 'Bank details updated successfully', data: account });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAccount, login, updateBankDetails };
