import { ModelStatic } from 'sequelize';
import UserModel from '../database/models/userModels';
import IUser from '../interfaces/IUser';

class UserServices {
  private userModel: ModelStatic<UserModel>;

  constructor() {
    this.userModel = UserModel;
  }

  public async getUser(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ raw: true, where: { email } });
    return user;
  }
}

export default UserServices;
