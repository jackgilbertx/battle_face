import jwt from 'jsonwebtoken';
import { jwt_secret } from './db.js';

export const generateToken = (id) => {
  return jwt.sign({ id }, jwt_secret, { expiresIn: '30d' });
};

export const findLoad = (age) => {
  if (18 <= age && age <= 30) {
    return 0.6;
  }
  if (31 <= age && age <= 40) {
    return 0.7;
  }
  if (41 <= age && age <= 50) {
    return 0.8;
  }
  if (51 <= age && age <= 60) {
    return 0.9;
  }
  if (61 <= age) {
    return 1;
  }
};
