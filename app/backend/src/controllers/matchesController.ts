import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

class MatchesController {
  constructor(private matchesController: MatchesServices = new MatchesServices()) { }

  public getMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesController.getMatches();
    if (!req.query.inProgress) return res.status(200).json(matches);
    if (req.query.inProgress === 'false') {
      return res.status(200).json(matches.filter((match) => match.inProgress === false));
    }
    return res.status(200).json(matches.filter((match) => match.inProgress === true));
  };

  public finnishMatches = async (req: Request, res: Response) => {
    if (!req.params.id) return res.status(404).json({ message: 'Id not found' });
    const { id } = req.params;
    console.log('controller ', id);
    const updatedMatch = await this.matchesController.finnishMatch(+id);
    // const match = await this.matchesController.getMatchesById(id);
    // console.log('match to update ', match);
    // console.log('updated match', updatedMatch);
    return res.status(200).json(updatedMatch);
  };
}

export default MatchesController;
