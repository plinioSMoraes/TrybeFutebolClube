import { Request, Response } from 'express';
import UserService from '../services/userServices';
import { createTokenJWT, decodeToken } from '../utils/tokenGenerator';
import validations from '../utils/validations';

const invalidError = 'Invalid email or password';

class UserController {
  constructor(private userService: UserService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    console.log(email, password);
    const validation = validations(email, password);
    console.log(validation);
    if (!validation) return res.status(401).json({ message: invalidError });
    const payloadUser = await this.userService.getUser(email);
    if (!payloadUser) return res.status(404).json({ message: invalidError });
    if (password === decodeToken(payloadUser.password)) {
      console.log(401, invalidError);
      return res.status(401).json({ message: invalidError });
    }
    console.log(payloadUser);
    const token = await createTokenJWT(payloadUser);
    return res.status(200).json({ token });
  };
}

export default UserController;
