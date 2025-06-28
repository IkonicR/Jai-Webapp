import { NextResponse } from "next/server";
import { neighborhoods } from "@/lib/data";

export async function GET() {
  return NextResponse.json(neighborhoods);
} 