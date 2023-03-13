import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import UserService from '../services/userServices';
import { createTokenJWT } from '../utils/tokenGenerator';
import validations from '../utils/validations';

const invalidError = 'Invalid email or password';

class UserController {
  constructor(private userService: UserService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    const validation = validations(email, password);
    if (!validation) return res.status(401).json({ message: invalidError });
    const payloadUser = await this.userService.getUser(email);
    if (!payloadUser) return res.status(401).json({ message: invalidError });
    const validatePass = compareSync(password, payloadUser.password);
    if (!validatePass) return res.status(401).json({ message: invalidError });
    const token = await createTokenJWT(payloadUser);
    return res.status(200).json({ token });
  };

  public role = async (req: Request, res: Response) => {
    const userRole = await this.userService.role(+req.params.id);
    return res.status(200).json({ role: userRole });
  };
}

export default UserController;
