import { NextResponse } from "next/server";
import { DISHES } from "@/data/dishes";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = DISHES.find((item) => String(item.id) === String(id));

  if (!dish) {
    return NextResponse.json(
      { error: "No such dish" },
      { status: 404 }
    );
  }

  return NextResponse.json(dish, { status: 200 });
}