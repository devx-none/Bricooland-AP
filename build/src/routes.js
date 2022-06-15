"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var session_controller_1 = require("./controller/session.controller");
// import { createUserHandler } from "./controller/user.controller";
var requireUser_1 = __importDefault(require("./middleware/requireUser"));
var validateResource_1 = __importDefault(require("./middleware/validateResource"));
var handyman_schema_1 = require("./schema/handyman.schema");
var handyman_controller_1 = require("./controller/handyman.controller");
var session_schema_1 = require("./schema/session.schema");
var customer_schema_1 = require("./schema/customer.schema");
var customer_controller_1 = require("./controller/customer.controller");
var service_schema_1 = require("./schema/service.schema");
var service_controller_1 = require("./controller/service.controller");
var category_schema_1 = require("./schema/category.schema");
var category_controller_1 = require("./controller/category.controller");
function routes(app) {
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
    app.get("/healthcheck", function (req, res) { return res.sendStatus(200); });
    /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post("/api/categories", (0, validateResource_1.default)(category_schema_1.createCategorySchema), category_controller_1.createCategoryHandler);
    app.get("/api/categories", category_controller_1.getCategoryHandler);
    app.post("/api/handyman", (0, validateResource_1.default)(handyman_schema_1.createHandymanSchema), handyman_controller_1.createHandymanHandler);
    app.get("/api/handymen/:id/:city", handyman_controller_1.getHandymenHandler);
    app.post("/api/customer", (0, validateResource_1.default)(customer_schema_1.createCustomerSchema), customer_controller_1.createCustomerHandler);
    app.post("/api/service", (0, validateResource_1.default)(service_schema_1.createServiceSchema), service_controller_1.createServiceHandler);
    // app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
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
exports.default = routes;
