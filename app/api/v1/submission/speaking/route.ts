import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionSpeaking } from "@/modules/commands/GetSubmissionSpeaking/handler";
import { GetSubmissionSpeaking$Params } from "@/modules/commands/GetSubmissionSpeaking/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionSpeaking$Params.parse(searchParams);
  const result = await handler$GetSubmissionSpeaking(db, params);
  return NextResponse.json(result);
}
