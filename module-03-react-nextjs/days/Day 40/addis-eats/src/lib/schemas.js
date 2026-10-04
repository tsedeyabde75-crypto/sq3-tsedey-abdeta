import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(09|07|\+2519|\+2517)\d{8}$/, "Please enter a valid Ethiopian phone number (e.g., 0911234567 or +251911234567)"),
  address: z.string().min(5, "Delivery address must be at least 5 characters"),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive()
    })
  ).min(1, "Your cart cannot be empty")
});