import { Router } from 'express';

const rootController = Router();

rootController.get('/health-check', (_, res, next) => {
  res.send('<h1>health-check</h1>');
});

export default rootController;
