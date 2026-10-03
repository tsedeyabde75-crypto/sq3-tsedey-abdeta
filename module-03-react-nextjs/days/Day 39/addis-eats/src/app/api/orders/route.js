import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          fieldErrors: result.error.flatten().fieldErrors 
        },
        { status: 422 }
      );
    }

    const order = {
      id: `ord_${Math.floor(Math.random() * 9000) + 1000}`,
      ...result.data,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Malformed request payload" },
      { status: 400 }
    );
  }
}