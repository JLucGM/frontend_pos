import { z } from "zod"
 
export const loginSchema = z.object({
  email: z.string({required_error:"Email is required" })
  .email("Invalid email")
  .min(2, "Email is too short"),
  password: z.string({required_error:"Password is required" })
    .min(6, "Password is too short"),
})

export const clientsSchema = z.object({
  client_name: z.string({required_error:"Name is required" })
  .min(2, "Email is too short"),
  client_identification: z.string({required_error:"C.I is required" })
    .min(6, "Password is too short"),
})