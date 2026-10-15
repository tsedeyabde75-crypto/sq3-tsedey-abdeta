"use server";

import { orderSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user) {
    return {
      success: false,
      message: "Unauthorized. Please sign in to place an order."
    };
  }

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

  revalidatePath("/menu");
  revalidatePath("/orders");

  return {
    success: true,
    message: "Order placed successfully! We will contact you shortly.",
    orderId: "ADDIS-" + Math.floor(100000 + Math.random() * 900000),
    userId: user.id
  };
}