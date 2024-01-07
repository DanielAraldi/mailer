import { FastifyInstance } from 'fastify';
import { adaptRoute } from '../adapters';
import { makeSendMailController } from '../factories/controllers';

export default (app: FastifyInstance): void => {
  app.post('/send', adaptRoute(makeSendMailController()));
};
