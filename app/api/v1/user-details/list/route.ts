import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { handler$GetUserDetailsList } from "@/modules/commands/GetUserDetailsList/handler";
import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { getDb } from "@/modules/mongodb";

export async function GET() {
  const db = await getDb();
  const cookieList = cookies();
  const loginStatus = await handler$LoginStatus(db, {
    token: cookieList.get("token")?.value
  });

  if (!loginStatus?.loggedIn) {
    return NextResponse.json({ message: "not logged in" }, { status: 401 });
  }
  if (!loginStatus.isAgent) {
    return NextResponse.json(
      { messsage: "method not allowed" },
      { status: 403 }
    );
  }
  const result = await handler$GetUserDetailsList(db);
  return NextResponse.json(result);
}
