import NodeEnvironment from 'jest-environment-node';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { generateDatabaseUrl, setDatabaseUrl } from './helpers';
import { PrismaHelper } from '../../src/infra/db';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private readonly previousDatabaseURL = process.env.DATABASE_URL;

  async setup(): Promise<void> {
    await PrismaHelper.connect();

    this.schema = randomUUID();
    const databaseURL = generateDatabaseUrl(this.schema);

    setDatabaseUrl(databaseURL);

    execSync(`npx prisma migrate deploy`);
    await super.setup();
  }

  async teardown(): Promise<void> {
    await PrismaHelper.client.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await PrismaHelper.disconnect();
    await super.teardown();

    setDatabaseUrl(this.previousDatabaseURL);
  }
}
