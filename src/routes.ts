import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
// import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createHandymanSchema,
  deleteHandymanSchema,
  getHandymanSchema,
  updateHandymanSchema,
} from "./schema/handyman.schema";
import { createHandymanHandler, getHandymenHandler } from "./controller/handyman.controller";
import { createSessionSchema } from "./schema/session.schema";
// import { createUserSchema } from "./schema/user.schema";
import { createCustomerSchema } from "./schema/customer.schema";
import { createCustomerHandler } from "./controller/customer.controller";
import { createServiceSchema } from "./schema/service.schema";
import { createServiceHandler, findAndUpdateServiceHandler, getMissionsHandler, getServiceHandler } from "./controller/service.controller";

import { createCategorySchema } from "./schema/category.schema";
import { createCategoryHandler, getCategoryHandler } from "./controller/category.controller";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/handyman':
   *  post:
   *     tags:
   *     - Handyman
   *     summary: Register a Handyman
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateHandymanInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateHandymanResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/categories", validateResource(createCategorySchema), createCategoryHandler);
  app.get("/api/categories", getCategoryHandler);

  app.post("/api/handyman", validateResource(createHandymanSchema), createHandymanHandler);
  app.get("/api/handymen/:category/:city", getHandymenHandler);

  app.post("/api/customer", validateResource(createCustomerSchema), createCustomerHandler);
  app.post("/api/service", validateResource(createServiceSchema), createServiceHandler);
  app.get("/api/service", getServiceHandler);
  app.patch("/api/service", findAndUpdateServiceHandler);
  app.get("/api/missions", getMissionsHandler);
  // app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // app.post(
  //   "/api/products",
  //   [requireUser, validateResource(createHandymanSchema)],
  //   createProductHandler
  // );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  // app.put(
  //   "/api/products/:productId",
  //   [requireUser, validateResource(updateHandymanSchema)],
  //   updateProductHandler
  // );

  // app.get(
  //   "/api/products/:productId",
  //   validateResource(getHandymanSchema),
  //   getProductHandler
  // );

  // app.delete(
  //   "/api/products/:productId",
  //   [requireUser, validateResource(deleteHandymanSchema)],
  //   deleteProductHandler
  // );
}

export default routes;
