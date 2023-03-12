import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

class TeamsConstroller {
  constructor(private teamService = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const team = await this.teamService.getTeam(id);

    if (!team) {
      return res.status(404)
        .json({ message: 'team not found!' });
    }

    return res.status(200).json(team);
  };
}

export default TeamsConstroller;
