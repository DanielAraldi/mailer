import { SendEmailRepository } from '../../../src/data/protocols/db';
import { MailModel } from '../../../src/domain';

export class InMemorySendRepository implements SendEmailRepository {
  private readonly table: MailModel[] = [];
  public data: MailModel;

  async send(
    data: SendEmailRepository.Params
  ): Promise<SendEmailRepository.Result> {
    this.data = data;
    this.table.push(data);
    return await Promise.resolve(true);
  }
}
