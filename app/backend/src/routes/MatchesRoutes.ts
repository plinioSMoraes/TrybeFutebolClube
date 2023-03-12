import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';
import tokenVerifier from '../middleware/tokenVerifier';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => tokenVerifier(req, res, next),
  (req: Request, res: Response) => matchesController.finnishMatches(req, res),

);
MatchesRouter.get('/', matchesController.getMatches);

export default MatchesRouter;
