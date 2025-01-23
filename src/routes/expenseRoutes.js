const express = require('express');
const { createOrUpdateExpense, getExpense } = require('../controllers/expenseController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/expense', authenticate, createOrUpdateExpense);
router.get('/expense', authenticate, getExpense);

module.exports = router;
