import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionWritingList } from "@/modules/commands/GetSubmissionWritingList/handler";
import { GetSubmissionWritingList$Params } from "@/modules/commands/GetSubmissionWritingList/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionWritingList$Params.parse(searchParams);
  const result = await handler$GetSubmissionWritingList(db, params);
  return NextResponse.json(result);
}
