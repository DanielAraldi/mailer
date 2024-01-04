import { FastifyInstance } from 'fastify';
import app from '../../../src/main/config/app';

export async function getInstance(): Promise<FastifyInstance> {
  app.get('/test', (_, reply) => reply.send());
  await app.after();
  await app.ready();
  return await app;
}
