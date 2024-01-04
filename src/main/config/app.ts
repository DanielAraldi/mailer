import Fastify from 'fastify';
import { setupMiddlewares } from './middlewares';

const app = Fastify({
  logger: true,
});

setupMiddlewares(app)
  .then(() => console.log('Middlewares initialized!'))
  .catch(console.error);

export default app;
