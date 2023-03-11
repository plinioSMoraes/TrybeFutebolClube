import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', matchesController.getMatches);

export default MatchesRouter;
