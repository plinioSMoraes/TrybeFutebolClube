import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getAwayLeaderboard();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
