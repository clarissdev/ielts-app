import { NextRequest, NextResponse } from "next/server";

import { handler$GetExamList } from "@/modules/commands/GetExamList/handler";
import { GetExamList$Params } from "@/modules/commands/GetExamList/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetExamList$Params.parse(searchParams);

  const result = await handler$GetExamList(db, params);
  return NextResponse.json(result);
}
