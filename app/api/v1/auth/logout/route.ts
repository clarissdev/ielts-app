import * as cookie from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
          path: "/",
        }),
      },
    }
  );
}
