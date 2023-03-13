import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';
import matchVerifier from '../middleware/matchVerifier';
import tokenVerifier from '../middleware/tokenVerifier';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => tokenVerifier(req, res, next),
  (req: Request, res: Response) => matchesController.finnishMatches(req, res),

);

MatchesRouter.patch('/:id', tokenVerifier, matchesController.updateMatches);

MatchesRouter.get('/', matchesController.getMatches);

MatchesRouter.post('/', tokenVerifier, matchVerifier, matchesController.addMatch);

export default MatchesRouter;
