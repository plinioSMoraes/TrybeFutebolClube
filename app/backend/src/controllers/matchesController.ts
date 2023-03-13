import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

class MatchesController {
  constructor(private matchesServices: MatchesServices = new MatchesServices()) { }

  public getMatches = async (req: Request, res: Response) => {
    const matches = await this.matchesServices.getMatches();
    if (!req.query.inProgress) return res.status(200).json(matches);
    if (req.query.inProgress === 'false') {
      return res.status(200).json(matches.filter((match) => match.inProgress === false));
    }
    return res.status(200).json(matches.filter((match) => match.inProgress === true));
  };

  public finnishMatches = async (req: Request, res: Response) => {
    if (!req.params.id) return res.status(404).json({ message: 'Id not found' });
    const { id } = req.params;
    // console.log('controller ', id);
    const updatedMatch = await this.matchesServices.finnishMatch(+id);
    // const match = await this.matchesServices.getMatchesById(id);
    // console.log('match to update ', match);
    // console.log('updated match', updatedMatch);
    return res.status(200).json(updatedMatch);
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchesServices.updateMatch(+id, req.body);
    if (!updatedMatch) return res.status(404).json({ message: 'Match not found' });
    return res.status(200).json(updatedMatch);
  };

  public addMatch = async (req: Request, res: Response) => {
    const match = await this.matchesServices.addMatch(req.body);
    return res.status(201).json(match);
  };
}

export default MatchesController;
