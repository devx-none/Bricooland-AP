import { object, string, TypeOf } from "zod";


export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({ required_error: "Password is required" }),
  }),
  role:string({required_error: "User is required"}).nullable(),
  
});
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
