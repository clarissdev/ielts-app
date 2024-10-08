import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionListening } from "@/modules/commands/GetSubmissionListening/handler";
import { GetSubmissionListening$Params } from "@/modules/commands/GetSubmissionListening/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionListening$Params.parse(searchParams);
  const result = await handler$GetSubmissionListening(db, params);
  return NextResponse.json(result);
}
