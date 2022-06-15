import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Customer:
 *       type: object
 *       required:
 *        - fisrtName
 *        - lastName
 *        - email
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const payload = {
  body: object({
    firstName: string({ required_error: "firstName is required" }),
    lastName: string({ required_error: "lastName is required" }),
    phone: string({ required_error: "phone is required" }),
    email: string({ required_error: "email is required" }).email(
      "Not a valid email"
    ),
    password: string({ required_error: "password is required" }),
  }),
};

const params = {
  params: object({
    customerId: string({
      required_error: "customerID is required",
    }),
  }),
};

export const createCustomerSchema = object({
  ...payload,
});

export const updateCustomerSchema = object({
  ...payload,
  ...params,
});

export const deleteCustomerSchema = object({
  ...params,
});

export const getCustomerSchema = object({
  ...params,
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type ReadCustomerInput = TypeOf<typeof getCustomerSchema>;
export type DeleteCustomerInput = TypeOf<typeof deleteCustomerSchema>;
