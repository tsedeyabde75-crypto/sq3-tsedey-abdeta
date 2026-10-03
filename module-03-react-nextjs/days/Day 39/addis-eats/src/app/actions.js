"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schemas";

export async function placeOrder(previousState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    items: JSON.parse(formData.get("items") || "[]"),
    total: Number(formData.get("total")) || 0,
  };

  const parsed = orderSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const newOrderId = `ord_${Date.now()}`;

  revalidatePath("/orders");

  return {
    success: true,
    orderId: newOrderId,
    fieldErrors: {},
  };
}