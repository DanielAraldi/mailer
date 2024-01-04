import { FastifyInstance } from 'fastify';
import { cors, helmet } from '../middlewares';

export async function setupMiddlewares(app: FastifyInstance): Promise<void> {
  await cors(app);
  await helmet(app);
}
