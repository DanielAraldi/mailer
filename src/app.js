import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';

import { routes } from './routes';

import { AsyncErrors } from './errors/AsyncErrors';

config();

export const app = express();

app.use((req, res, next) => {
  delete req.headers['content-encoding'];
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(AsyncErrors);
