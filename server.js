import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { protect } from './middleware.js';
import { generateToken } from './generateToken.js';

dotenv.config();
const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
  const { email } = req.body;
  const token = generateToken(email);
  res.json({ token, email });
});

const matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(password, PROCESS.env.password);
};

app.post('/login', (req, res) => {
  const password = req.password;
  const email = req.email;
  if (matchPassword(password)) {
    res.send({
      password,
      email,
      token: generateToken(email),
    });
  }
});

app.post('/quotation', protect, (req, res) => {
  console.log(req.body);
  res.send('Here is your quote');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
