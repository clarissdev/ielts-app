import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";

export async function GET() {
  const db = await getDb();
  const cookieList = cookies();
  const result = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });
  return NextResponse.json(result);
}
