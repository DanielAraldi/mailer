import { LogControllerDecorator } from "./log-controller-decorator";
import { LogPrismaRepository } from "../../../infra/db";
import { Controller } from "../../../presentation/protocols";

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logPrismaRepository = new LogPrismaRepository();
  return new LogControllerDecorator(controller, logPrismaRepository);
};
