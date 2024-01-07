import app from './config/app';
import env from './config/env';
import { PrismaHelper } from '../infra/db';

PrismaHelper.connect()
  .then(() => {
    if (PrismaHelper.isConnected) {
      app.listen({ port: env.port, host: '0.0.0.0' }).catch(console.error);
    } else {
      console.error('Server not running! Please connect with database.');
    }
  })
  .catch(console.error);
