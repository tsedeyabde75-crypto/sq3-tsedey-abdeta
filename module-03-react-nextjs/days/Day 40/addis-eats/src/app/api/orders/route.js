import { orderSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order received via API",
      data: result.data
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}