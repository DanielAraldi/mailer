import { PrismaClient } from '@prisma/client';

export const PrismaHelper = {
  client: new PrismaClient(),

  async connect(): Promise<void> {
    await this.client.$connect();
  },

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  },

  async getTable(name: string): Promise<any> {
    const table = await this.client[name];
    return table;
  },
};
