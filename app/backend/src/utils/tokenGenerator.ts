import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export async function createTokenJWT(payload: IUser) {
  const config: SignOptions = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, config);
  return token;
}

export function decodeToken(token: string) {
  const decodedToken = jwt.decode(token);
  return decodedToken;
}
