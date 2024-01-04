import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = await controller.handle(request.body);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      await reply.send(httpResponse.body).status(httpResponse.statusCode);
    } else {
      await reply
        .send({ error: httpResponse.body.message })
        .status(httpResponse.statusCode);
    }
  };
};
