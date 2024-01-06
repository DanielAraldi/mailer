import Fastify from 'fastify';
import { setupRoutes } from './routes';
import { setupMiddlewares } from './middlewares';

const app = Fastify({
  logger: true,
});

setupMiddlewares(app).catch(console.error);
setupRoutes(app).catch(console.error);

export default app;
