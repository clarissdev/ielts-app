import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionSpeakingList } from "@/modules/commands/GetSubmissionSpeakingList/handler";
import { GetSubmissionSpeakingList$Params } from "@/modules/commands/GetSubmissionSpeakingList/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionSpeakingList$Params.parse(searchParams);
  const result = await handler$GetSubmissionSpeakingList(db, params);
  return NextResponse.json(result);
}
