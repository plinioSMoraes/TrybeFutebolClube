import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

const Errors = [
  'Token not found',
  'Token must be a valid token',
];
const secret = process.env.JWT_SECRET || 'jwt_secret';

const tokenVerifier = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: Errors[0] });
    const verification = verify(req.headers.authorization, secret) as JwtPayload;
    // console.log('token verifier ', verification);
    if (!req.params.id) {
      req.params.id = verification.id;
    }
    // console.log(req.params.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: Errors[1] });
  }
};

export default tokenVerifier;
