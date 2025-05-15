import { Router } from 'express';

const newsRouter = Router();

// TODO: Implement news routes (CRUD operations)

newsRouter.get('/', (req, res) => {
  // Placeholder for getting news
  res.status(501).json({ message: 'Get news endpoint not implemented yet.' });
});

export default newsRouter;