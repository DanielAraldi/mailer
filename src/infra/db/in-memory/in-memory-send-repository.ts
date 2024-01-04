import { SendEmailRepository } from "../../../data/protocols/db";
import { MailModel } from "../../../domain";

export class InMemorySendRepository implements SendEmailRepository {
  public table: MailModel[] = [];
  async send(data: SendEmailRepository.Params):
  Promise<SendEmailRepository.Result> {
    const result = this.table.push(data);
    return !!result;
  }
}
