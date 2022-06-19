import { Request, Response } from "express";
import { omit } from "lodash";
import { Roles } from "../../config/constant";
import { CreateCustomerInput } from "../schema/customer.schema";
import { createCustomer, findCustomer  } from "../service/customer.service";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createCustomerHandler(
  req: Request<{}, {}, CreateCustomerInput["body"]>,
  res: Response
) {
  try {
    const chekEmail = await findCustomer({ email: req.body.email });
    if (chekEmail) {
      return res.status(400).send("adresse e-mail déja existe");
    }
    const Customers:any = await createCustomer(req.body);
    await createUser({
      customer: Customers._id,
      email: Customers.email,
      password: Customers.password,
      role: Roles.CUSTOMER,
      handyman: null
    });

    return res.send(Customers);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getCustomerHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const Customer = await findCustomer({ user: userId });

  return res.send(Customer);
}





