import { Db } from "mongodb";

import { SubmitWriting$Params, SubmitWriting$Result } from "./typing";

type Options = {
  params: SubmitWriting$Params;
  createdBy: string;
};

export async function handler$SubmitWriting(
  db: Db,
  { params, createdBy }: Options
) {
  const { insertedId } = await db.collection("submission-writing").insertOne({
    createdBy,
    createdAt: Date.now(),
    ...params
  });
  return SubmitWriting$Result.parse({ submissionId: insertedId.toHexString() });
}
