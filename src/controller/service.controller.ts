import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateServiceInput } from "../schema/service.schema";
import { createService, findService } from "../service/service.service";
import logger from "../utils/logger";

export async function createServiceHandler(
  req: Request<{}, {}, CreateServiceInput["body"]>,
  res: Response
) {
  try {
    const Service = await createService(req.body);
    return res.send(Service);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getServiceHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    

  const Service = await findService({ user: userId });

  return res.send(Service);
}
