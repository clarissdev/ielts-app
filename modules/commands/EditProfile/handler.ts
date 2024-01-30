import { Db, ObjectId } from "mongodb";

import { EditProfile$Params, EditProfile$Result } from "./typing";

type Options = {
  userId: string;
  params: EditProfile$Params;
};

export async function handler$EditProfile(db: Db, { userId, params }: Options) {
  await db.collection("user").updateOne(
    { _id: ObjectId.createFromHexString(userId) },
    {
      $set: { ...params, updatedAt: Date.now() }
    }
  );
  return EditProfile$Result.parse({
    userId
  });
}
