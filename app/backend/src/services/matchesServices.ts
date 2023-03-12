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

  public getMatchesById = async (id: string) => {
    const match = await this.matchesModel.findByPk(id);
    return match;
  };

  public finnishMatch = async (id: number) => {
    // const updatedMatch = await this.matchesModel.update(
    //   { inProgress: false },
    //   { where: { id } },
    // );
    console.log('service ', id);
    const match = await this.matchesModel.findByPk(id);
    if (match !== undefined && match?.inProgress !== undefined) {
      match.inProgress = false;
    }
    await match?.save();
    return match;
    // console.log(updatedMatch);
    // return updatedMatch;
  };
}

export default MatchesServices;
