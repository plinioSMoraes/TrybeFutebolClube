import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

class MatchesController {
  constructor(private matchesController: MatchesServices = new MatchesServices()) { }

  public getMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesController.getMatches();
    console.log(req.query.inProgress, typeof req.query.inProgress);
    if (!req.query.inProgress) return res.status(200).json(matches);
    console.log('passou no teste se existe a query');
    if (req.query.inProgress === 'false') {
      console.log('entrou no if se query é false');
      return res.status(200).json(matches.filter((match) => match.inProgress === false));
    }
    console.log('query nao é false, só pode ser true');
    return res.status(200).json(matches.filter((match) => match.inProgress === true));
  };
}

export default MatchesController;
