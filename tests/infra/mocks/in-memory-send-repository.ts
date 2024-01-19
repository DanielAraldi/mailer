import { SendEmailRepository } from '../../../src/data/protocols/db';
import { MailModel } from '../../../src/domain';

export class InMemorySendRepository implements SendEmailRepository {
  public table: MailModel[] = [];

  async send(
    data: SendEmailRepository.Params
  ): Promise<SendEmailRepository.Result> {
    const result = this.table.push(data);
    return !!result;
  }
}
