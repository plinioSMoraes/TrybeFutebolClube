import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const LeaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

LeaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);
LeaderboardRouter.get('/away', leaderboardController.getAwayLeaderboard);

export default LeaderboardRouter;
