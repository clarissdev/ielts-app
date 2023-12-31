import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { handler$SubmitListening } from "@/modules/commands/SubmitListening/handler";
import { SubmitListening$Params } from "@/modules/commands/SubmitListening/typing";
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
  const result = await handler$SubmitListening(db, {
    params: SubmitListening$Params.parse(body),
    createdBy: loginStatus.userId
  });
  return NextResponse.json(result);
}
