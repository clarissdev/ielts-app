import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { handler$SubmitSpeaking } from "@/modules/commands/SubmitSpeaking/handler";
import { SubmitSpeaking$Params } from "@/modules/commands/SubmitSpeaking/typing";
import { getDb } from "@/modules/mongodb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });
  if (!loginStatus.loggedIn) {
    return NextResponse.json({ message: "not logged in" }, { status: 401 });
  }
  const result = await handler$SubmitSpeaking(db, {
    params: SubmitSpeaking$Params.parse(body),
    createdBy: loginStatus.userId
  });
  return NextResponse.json(result);
}
