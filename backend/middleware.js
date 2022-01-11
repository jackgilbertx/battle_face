import jwt from 'jsonwebtoken';
import { jwt_secret } from './db.js';

/* 
   This isnt really doing anything, just checking that the request has a bearer token attached
*/
export const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, jwt_secret);
      req.user = decoded.email;
      next();
    } catch (error) {
      res.status(401).send('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401).send('Not authorized, no token');
  }
};
