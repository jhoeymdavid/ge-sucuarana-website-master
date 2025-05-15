import { Router } from 'express';

const galleryRouter = Router();

// TODO: Implement gallery routes (CRUD operations)

galleryRouter.get('/', (req, res) => {
  // Placeholder for getting gallery items
  res.status(501).json({ message: 'Get gallery endpoint not implemented yet.' });
});

export default galleryRouter;