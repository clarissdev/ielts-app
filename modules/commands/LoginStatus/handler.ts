import * as JsonWebToken from "jsonwebtoken";
import { Db, ObjectId } from "mongodb";

import { ClientError } from "../../errors";

import { Result, Token } from "./typing";

import { SERVER_ENV } from "@/modules/env/server";

type Options = {
  token: string | undefined;
};

export async function handler(db: Db, options: Options): Promise<Result> {
  try {
    if (!options.token) {
      throw new Error();
    }
    const tokenDecoded = JsonWebToken.verify(
      options.token,
      SERVER_ENV.SECRET_KEY
    );
    const token = Token.parse(tokenDecoded);
    const user = await db
      .collection("user")
      .findOne(ObjectId.createFromHexString(token.userId), {
        projection: {
          authenticator: 0,
          authenticatorUserId: 0
        }
      });
    ClientError.assert(!!user, { message: "user not found" });
    return {
      loggedIn: true,
      userId: token.userId,
      displayName: user.displayName,
      email: user.email,
      isAgent: user.isAgent
    };
  } catch {
    return { loggedIn: false };
  }
}

export const handler$LoginStatus = handler;
