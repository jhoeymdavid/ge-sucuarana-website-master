import { Router } from 'express';

const eventsRouter = Router();



eventsRouter.get('/', (req, res) => {

  res.status(501).json({ message: 'Get events endpoint not implemented yet.' });
});

export default eventsRouter;