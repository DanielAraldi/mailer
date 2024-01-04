import { SendMailController } from '../../../presentation/controllers';
import { Controller } from '../../../presentation/protocols';
import { makeDbSendMail } from '../usecases';
import { makeSendMailValidation } from '.';

export const makeSendMailController = (): Controller =>
  new SendMailController(makeSendMailValidation(), makeDbSendMail());
