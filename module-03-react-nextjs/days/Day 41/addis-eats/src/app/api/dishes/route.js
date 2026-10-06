import { NextResponse } from "next/server";
import { DISHES } from "@/data/dishes";

export async function GET() {
  return NextResponse.json(DISHES, { status: 200 });
}