import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Params } from "./typing";

import { User } from "@/modules/business-types";

export async function handler$GetUser(db: Db, { userId }: Params) {
  const agg = [
    {
      $match: { _id: ObjectId.createFromHexString(userId) }
    }
  ];
  const records = await db.collection("user").aggregate(agg).toArray();
  assert(records?.length === 1, "user not found");
  return User.parse({
    userId: records[0]._id.toHexString(),
    ...records[0]
  });
}
