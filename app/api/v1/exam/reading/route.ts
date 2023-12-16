import { NextRequest, NextResponse } from "next/server";

import { handler$GetWritingExam } from "@/modules/commands/GetWritingExam/handler";
import { GetWritingExam$Params } from "@/modules/commands/GetWritingExam/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetWritingExam$Params.parse(searchParams);
  const result = await handler$GetWritingExam(db, params);
  return NextResponse.json(result);
}
