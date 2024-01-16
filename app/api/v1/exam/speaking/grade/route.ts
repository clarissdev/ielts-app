import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { handler$SubmitSpeakingGrade } from "@/modules/commands/SubmitSpeakingGrade/handler";
import { SubmitSpeakingGrade$Params } from "@/modules/commands/SubmitSpeakingGrade/typing";
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
  if (!loginStatus.isAgent) {
    return NextResponse.json(
      { messsage: "method not allowed" },
      { status: 403 }
    );
  }
  const result = await handler$SubmitSpeakingGrade(
    db,
    SubmitSpeakingGrade$Params.parse(body)
  );
  return NextResponse.json(result);
}
