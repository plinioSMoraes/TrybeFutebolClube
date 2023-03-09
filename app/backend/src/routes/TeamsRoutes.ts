import { Router } from 'express';
import TeamsController from '../controllers/teamsConstroller';

const TeamsRouter = Router();

const teamsController = new TeamsController();

TeamsRouter.get('/', teamsController.getAll);
TeamsRouter.get('/:id', teamsController.getById);

export default TeamsRouter;
