import { FastifyInstance } from 'fastify';
import { fastifyHelmet } from '@fastify/helmet';

export async function helmet(app: FastifyInstance): Promise<void> {
  await app.register(fastifyHelmet, {
    hidePoweredBy: true,
  });
}
