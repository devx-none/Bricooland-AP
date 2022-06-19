import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateServiceInput } from "../schema/service.schema";
import { findHandyman } from "../service/handyman.service";
import { createService, findAndUpdateService, findService, getMissions } from "../service/service.service";
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
    const userId = res.locals.user.handyman;
    
  // console.log(userId);

  const handyman:any = await findHandyman({ _id: userId });
  const Service = await findService({ category: handyman.category ,statue:"pending" });
  return res.send(Service);
}


export async function findAndUpdateServiceHandler(req: Request, res: Response) {
  const userId = res.locals.user.handyman;
  const Service = await findAndUpdateService({ _id: req.body.id },{ handyman:userId, statue: "accepted" },{lean:true});
  return res.send(Service);
}

export async function getMissionsHandler(req: Request, res: Response) {
  const userId = res.locals.user.handyman;

  const Service = await getMissions({ handyman: userId });
  return res.send(Service);
}