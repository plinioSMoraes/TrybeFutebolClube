import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';
import IMatch from '../interfaces/IMatch';
import INewMatch from '../interfaces/INewMatch';

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
    // console.log('service ', id);
    const match = await this.matchesModel.findByPk(id);
    if (match !== undefined && match?.inProgress !== undefined) {
      match.inProgress = false;
    }
    await match?.save();
    return match;
    // console.log(updatedMatch);
    // return updatedMatch;
  };

  public async updateMatch(id: number, body: IMatch) {
    if (!body.homeTeamGoals || !body.awayTeamGoals || !id) return undefined; // Ve se os dados passados existem
    const match = await this.matchesModel.findByPk(id);
    if (!match) return undefined; // Ve se a partida existe
    if (!match.inProgress) return undefined; // Ve se a partida ainda esta em andamento
    match.awayTeamGoals = body.awayTeamGoals; // Atualiza a partida com novos dados
    match.homeTeamGoals = body.homeTeamGoals; // Atualiza a partida com novos dados
    await match?.save(); // Salva a partida com os novos dados no bd
    return match;
  }

  public async addMatch(body: INewMatch) {
    console.log('--------------- data to add --------------- \n', body);
    const match = await this.matchesModel.create({ ...body, inProgress: true });
    console.log('match to add', match.toJSON());
    return match;
  }
}

export default MatchesServices;
