import { Request, Response } from "express";
import { omit } from "lodash";
import { Roles } from "../../config/constant";
import { CreateHandymanInput } from "../schema/handyman.schema";
import {
  createHandyman,
  findAndUpdateHandyman,
  findHandyman,
  findHandymenByCategory,
} from "../service/handyman.service";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createHandymanHandler(
  req: Request<{}, {}, CreateHandymanInput["body"]>,
  res: Response
) {
  try {
    const Handyman = await createHandyman(req.body);
    
    await createUser({ email: Handyman.email, password:Handyman.password, role:Roles.HANDYMAN });
    return res.send(Handyman);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getHandymanHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const handyman = await findHandyman({ user: userId });

  return res.send(handyman);
}

export async function getHandymenHandler(req: Request, res: Response) {
  // const userId = res.locals.user._id;

  const handymen = await findHandymenByCategory({ category: req.params.category ,city: req.params.city});

  if (!handymen) {
    return res.status(404).send("No handymen found");
  }
  
  return res.send(handymen);


}

//handymen by category and city





