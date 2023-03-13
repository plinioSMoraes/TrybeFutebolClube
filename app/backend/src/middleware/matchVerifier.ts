import { NextFunction, Request, Response } from 'express';
import MatchesModel from '../database/models/matchesModel';

const Errors = [
  'It is not possible to create a match with two equal teams',
  'There is no team with such id!',
];

const matchverifier = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (!homeTeamId || !awayTeamId) return res.status(404).json({ message: Errors[1] });
  if (homeTeamId === awayTeamId) return res.status(422).json({ message: Errors[0] });
  const homeTeam = await MatchesModel.findByPk(homeTeamId);
  const awayTeam = await MatchesModel.findByPk(awayTeamId);
  if (!homeTeam || !awayTeam) return res.status(404).json({ message: Errors[1] });
  next();
};

export default matchverifier;
