import { SendEmailRepository } from '../../../src/data/protocols/db';

export class InMemorySendRepository implements SendEmailRepository {
  private readonly table: SendEmailRepository.Params[] = [];
  public data: SendEmailRepository.Params;

  async send(
    data: SendEmailRepository.Params
  ): Promise<SendEmailRepository.Result> {
    this.data = data;
    this.table.push(data);
    return await Promise.resolve(true);
  }
}
