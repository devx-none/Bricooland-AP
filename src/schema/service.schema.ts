import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Service:
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
    customer: string({ required_error: "Customer is required" }),
    handyman: string({ required_error: "Handyman is required" }),
    category: string({
      required_error: "Category is required",
    }),
    title: string({
      required_error: "title is required",
    }),
    description: string({
      required_error: "description is required",
    }),
    statue: string({
      required_error: "statue is required",
    }),
  })

};

const params = {
  params: object({
    serviceId: string({
      required_error: "serviceId is required",
    }),
  }),
};

export const createServiceSchema = object({
  ...payload,
});

export const updateServiceSchema = object({
  ...payload,
  ...params,
});

export const deleteServiceSchema = object({
  ...params,
});

export const getServiceSchema = object({
  ...params,
});

export type CreateServiceInput = TypeOf<typeof createServiceSchema>;
export type UpdateServiceInput = TypeOf<typeof updateServiceSchema>;
export type ReadServiceInput = TypeOf<typeof getServiceSchema>;
export type DeleteServiceInput = TypeOf<typeof deleteServiceSchema>;
