import { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';

export async function cors(app: FastifyInstance): Promise<void> {
  await app.register(fastifyCors, {
    allowedHeaders: ['*'],
    methods: ['*'],
    origin: '*',
  });
}
