import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionWriting } from "@/modules/commands/GetSubmissionWriting/handler";
import { GetSubmissionWriting$Params } from "@/modules/commands/GetSubmissionWriting/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionWriting$Params.parse(searchParams);
  const result = await handler$GetSubmissionWriting(db, params);
  return NextResponse.json(result);
}
