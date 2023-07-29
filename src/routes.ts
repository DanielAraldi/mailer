import { Router } from 'express';

import Mail from './controllers/Mail/Mail';

import { ApiError } from './errors/ApiError';

export const routes = Router();

routes.post('/mail', Mail.create);

routes.all('*', () => {
  throw new ApiError('Página não encontrada!', 404);
});
