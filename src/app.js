import express from "express";
import helmet from "helmet";

import { routes } from "./routes";

import { AsyncErrors } from "./errors/AsyncErrors";

export const app = express();

app.use(helmet());
app.use(express.json());

app.use(routes);

app.use(AsyncErrors);
