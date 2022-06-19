import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateCategoryInput } from "../schema/category.schema";
import {
  createCategory,
  findCategory,
  getCategories,
} from "../service/category.service";
import logger from "../utils/logger";

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) {
  try {
    const category = await createCategory(req.body);
    
    return res.send(category);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getCategoryHandler(req: Request, res: Response) {
  // const userId = res.locals.user._id;

  const category = await getCategories();
  return res.send(category);
}


