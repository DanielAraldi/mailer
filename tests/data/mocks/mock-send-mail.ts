import { faker } from '@faker-js/faker';
import { MailModel } from '../../domain';
import { SendMail, Transporter } from '../protocols/adapters';

export class NodemailerAdapterSpy implements SendMail, Transporter {
  public mail: MailModel;
  public transporter;

  async send(mail: MailModel): Promise<boolean> {
    this.mail = mail;
    return await Promise.resolve(true);
  }

  create(): void {
    this.transporter = faker.lorem.words();
  }
}
