import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handler$LoginStatus } from "@/modules/commands/LoginStatus/handler";
import { handler$UploadFile } from "@/modules/commands/UploadFile/handler";
import { UploadFile$Params } from "@/modules/commands/UploadFile/typing";
import { SERVER_ENV } from "@/modules/env/server";
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
  const result = await handler$UploadFile(UploadFile$Params.parse(body), {
    db,
    s3Bucket: SERVER_ENV.S3_BUCKET_NAME,
    userId: loginStatus.userId
  });
  return NextResponse.json(result);
}
