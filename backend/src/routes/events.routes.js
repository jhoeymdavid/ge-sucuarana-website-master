import { Router } from 'express';

const eventsRouter = Router();

// TODO: Implement events routes (CRUD operations)

eventsRouter.get('/', (req, res) => {
  // Placeholder for getting events
  res.status(501).json({ message: 'Get events endpoint not implemented yet.' });
});

export default eventsRouter;