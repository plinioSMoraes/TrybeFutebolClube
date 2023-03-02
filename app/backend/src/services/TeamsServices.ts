import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/teamsModel';
import ITeam from '../interfaces/ITeam';

class TeamsService {
  private model: ModelStatic<TeamsModel>;

  constructor() {
    this.model = TeamsModel;
  }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getTeam(id: number): Promise<ITeam | null> {
    const teams = await this.model.findOne({ where: { id } });
    return teams;
  }
}

export default TeamsService;
