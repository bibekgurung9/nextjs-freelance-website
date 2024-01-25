import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
})

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must atleast be 6 characters"
  }),
  name: z.string().min(1, {
    message: "Name is Required"
  }),
})