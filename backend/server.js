import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { protect } from './middleware.js';
import { generateToken, findLoad } from './utils.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

/* 
   Hacky way to mock a user db using .env file 
   ONLY 1 user can be logged into app
*/
app.post('/login', (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    res.status(200).json({
      token: generateToken(email),
      email,
    });
  } else {
    res.status(401).json({ error: 'Incorrect username or password' });
  }
});

app.post('/quotation', protect, (req, res) => {
  const { currencyType } = req.body;
  const { ages } = req.body;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const diffTime = Math.abs(endDate - startDate);
  const totalDays = 1 + Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let fixedRate = 3;

  const quote = ages
    .reduce((acc, cur) => acc + fixedRate * findLoad(cur) * totalDays, 0)
    .toFixed(2);
  res.status(200).json({ quote, currencyType });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
