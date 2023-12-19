import * as cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Set-Cookie": cookie.serialize("token", "", {
          maxAge: 0,
          httpOnly: true,
          secure: true,
          path: "/"
        })
      }
    }
  );
}
