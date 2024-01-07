import { FastifyInstance } from 'fastify';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function setupRoutes(app: FastifyInstance): Promise<void> {
  await app.register(
    (instance, _, done) => {
      readdirSync(join(__dirname, '../routes')).map(async file => {
        if (!file.endsWith('.map')) {
          (await import(`../routes/${file}`)).default(instance);
        }
      });
      done();
    },
    { prefix: '/api' }
  );
}
