import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handler$EditProfile } from "@/modules/commands/EditProfile/handler";
import { EditProfile$Params } from "@/modules/commands/EditProfile/typing";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
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
  const result = await handler$EditProfile(db, {
    params: EditProfile$Params.parse(body),
    userId: loginStatus.userId
  });
  return NextResponse.json(result);
}
