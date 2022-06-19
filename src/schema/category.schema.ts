import { array,object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Category:
 *       type: object
 *       required:
 *        - category
 *        - handyman
 *      
 *       properties:
 *         category:
 *           type: string
 
 *       handyman: array <string>
 */

const payload = {
  body: object({
    category: string({ required_error: " category is required" }),
    
  }),
};

const params = {
  params: object({
    CategoryId: string({
      required_error: "CategoryID is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
