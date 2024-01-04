import { PrismaClient } from '@prisma/client';
import { GetTableKey } from '../protocols';

export const PrismaHelper = {
  client: new PrismaClient(),
  isConnected: false,

  async connect(): Promise<void> {
    if (!this.isConnected && this.client) {
      await this.client.$connect();
      this.isConnected = true;
    }
  },

  async disconnect(): Promise<void> {
    if (this.isConnected && this.client) {
      await this.client.$disconnect();
      this.isConnected = false;
    }
  },

  async getTable(name: GetTableKey): Promise<PrismaClient[GetTableKey]> {
    const table: PrismaClient[typeof name] = await this.client[name];
    return table;
  },
};
