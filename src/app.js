const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const accountRoutes = require('./routes/accountRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', accountRoutes);
app.use('/api', expenseRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
