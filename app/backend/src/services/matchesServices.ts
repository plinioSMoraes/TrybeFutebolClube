import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';

class MatchesServices {
  private matchesModel: ModelStatic<MatchesModel>;

  constructor() {
    this.matchesModel = MatchesModel;
  }

  public getMatches = async () => {
    const matches = await this.matchesModel.findAll(
      {
        include: [
          { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return matches;
  };
}

export default MatchesServices;
