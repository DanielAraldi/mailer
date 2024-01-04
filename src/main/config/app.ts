import Fastify from 'fastify';
import { setupRoutes } from './routes';
import { setupMiddlewares } from './middlewares';

const app = Fastify({
  logger: true,
});

setupMiddlewares(app)
  .then(() => console.log('Middlewares initialized!'))
  .catch(console.error);
setupRoutes(app)
  .then(() => console.log('Routes initialized!'))
  .catch(console.error);

export default app;
