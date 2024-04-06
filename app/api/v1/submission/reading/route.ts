import { NextRequest, NextResponse } from "next/server";

import { handler$GetSubmissionReading } from "@/modules/commands/GetSubmissionReading/handler";
import { GetSubmissionReading$Params } from "@/modules/commands/GetSubmissionReading/typing";
import { getDb } from "@/modules/mongodb";

export async function GET(request: NextRequest) {
  const db = await getDb();
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const params = GetSubmissionReading$Params.parse(searchParams);
  const result = await handler$GetSubmissionReading(db, params);
  return NextResponse.json(result);
}
