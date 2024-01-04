import app from './config/app';
import env from './config/env';

app
  .listen({ port: env.port, host: '0.0.0.0' })
  .then(() => console.log(`Server running in http://localhost:${env.port}`))
  .catch(console.error);
