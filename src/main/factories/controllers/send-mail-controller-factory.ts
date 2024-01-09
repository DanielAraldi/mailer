import { SendMailController } from '../../../presentation/controllers';
import { Controller } from '../../../presentation/protocols';
import { makeDbSendMail } from '../usecases';
import { makeSendMailValidation } from '.';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';

export const makeSendMailController = (): Controller => {
  const controller = new SendMailController(
    makeSendMailValidation(),
    makeDbSendMail()
  );

  return makeLogControllerDecorator(controller);
};
