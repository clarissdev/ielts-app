import { Db, ObjectId } from "mongodb";

import { EditProfile$Params, EditProfile$Result } from "./typing";

type Options = {
  userId: string;
  params: EditProfile$Params;
};

export async function handler$EditProfile(db: Db, { userId, params }: Options) {
  const { displayName } = params;
  await db.collection("user").updateOne(
    { _id: ObjectId.createFromHexString(userId) },
    {
      $set: { displayName, updatedAt: Date.now() }
    }
  );
  return EditProfile$Result.parse({
    userId
  });
}
