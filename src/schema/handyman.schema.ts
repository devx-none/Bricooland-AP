import { object, number, string, TypeOf } from "zod";
import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *   schema:
 *     Handyman:
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
    city: string({ required_error: "city is required" }),
    category: string({ required_error: "category is required" }),
    email: string({ required_error: "email is required" }),
    password: string({ required_error: "password is required" }),
  }),
};

const params = {
  params: object({
    handymanId: string({
      required_error: "handymanId is required",
    }),
  }),
};

export const createHandymanSchema = object({
  ...payload,
});

export const updateHandymanSchema = object({
  ...payload,
  ...params,
});

export const deleteHandymanSchema = object({
  ...params,
});

export const getHandymanSchema = object({
  ...params,
});

export type CreateHandymanInput = TypeOf<typeof createHandymanSchema>;
export type UpdateHandymanInput = TypeOf<typeof updateHandymanSchema>;
export type ReadHandymanInput = TypeOf<typeof getHandymanSchema>;
export type DeleteHandymanInput = TypeOf<typeof deleteHandymanSchema>;
