import express from 'express';
import helmet from 'helmet';

import { routes } from './routes';

export const app = express();

app.use(helmet());
app.use(express.json());

app.use(routes);
