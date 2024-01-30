import * as cookie from "cookie";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { AuthenticateByGoogle$Params } from "@/modules/commands/AuthenticateWithGoogle/typing";
import { SERVER_ENV } from "@/modules/env/server";
import { ClientError } from "@/modules/errors";
import { getDb } from "@/modules/mongodb";

const MAX_AGE = 604800; // seconds, 7 days

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = AuthenticateByGoogle$Params.safeParse(body);
  ClientError.assert(parsedBody.success, "invalid params");
  const { credential } = parsedBody.data;
  const client = new OAuth2Client();
  const ticket = await client
    .verifyIdToken({
      idToken: credential,
      audience: SERVER_ENV.CLIENT_ID
    })
    .catch((error) => {
      throw new ClientError({ message: "invalid token" }, { cause: error });
    });

  const payload = ticket.getPayload();
  ClientError.assert(!!payload, { message: "invalid payload" });

  const authenticatorUserId = payload.sub;
  const email = payload.email;
  ClientError.assert(!!email, { message: "email missing" });
  const db = await getDb();

  const user = await db
    .collection("user")
    .findOne({ authenticator: "Google", authenticatorUserId });
  let userId;
  if (user) {
    userId = user._id.toHexString();
  } else {
    const { insertedId } = await db.collection("user").insertOne({
      authenticator: "Google",
      authenticatorUserId,
      email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      displayName: payload.name || null,
      isAgent: false,
      school: "",
      phoneNumber: ""
    });
    userId = insertedId.toHexString();
  }

  const tokenEncoded = jwt.sign({ userId }, SERVER_ENV.SECRET_KEY, {
    expiresIn: MAX_AGE
  });

  return NextResponse.json(
    {
      userId,
      email
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Set-Cookie": cookie.serialize("token", tokenEncoded, {
          maxAge: MAX_AGE,
          httpOnly: true,
          secure: true,
          path: "/"
        })
      }
    }
  );
}
