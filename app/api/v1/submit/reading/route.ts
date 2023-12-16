import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { handler$SubmitReading } from "@/modules/commands/SubmitReading/handler";
import { SubmitReading$Params } from "@/modules/commands/SubmitReading/typing";
import { getDb } from "@/modules/mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value,
  });
  if (!loginStatus.loggedIn) {
    return NextResponse.json({ message: "not logged in" }, { status: 401 });
  }
  const result = await handler$SubmitReading(db, {
    params: SubmitReading$Params.parse(body),
    createdBy: loginStatus.userId,
  });
  return NextResponse.json(result);
}
