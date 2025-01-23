const express = require('express');
const { createAccount, login, updateBankDetails } = require('../controllers/accountController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/account', createAccount);
router.post('/login', login);
router.patch('/account', authenticate, updateBankDetails);

module.exports = router;
