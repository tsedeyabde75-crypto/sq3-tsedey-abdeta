import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^(09|\+2519)\d{8}$/, "Invalid phone number format"),
  items: z.array(z.any()).optional(),
  total: z.coerce.number().optional(),
});