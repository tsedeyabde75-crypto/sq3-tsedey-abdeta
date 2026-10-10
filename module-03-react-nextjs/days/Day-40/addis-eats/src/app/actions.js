"use server";

import { orderSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function placeOrder(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items: JSON.parse(formData.get("items") || "[]")
  };

  const validation = orderSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      errors: fieldErrors,
      message: "Validation failed. Please check your inputs."
    };
  }

  // Simulating order processing logic
  revalidatePath("/menu");
  
  return {
    success: true,
    message: "Order placed successfully! We will contact you shortly.",
    orderId: "ADDIS-" + Math.floor(100000 + Math.random() * 900000)
  };
}