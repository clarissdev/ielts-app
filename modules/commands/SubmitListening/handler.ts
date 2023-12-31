import { Db } from "mongodb";

import { SubmitListening$Params, SubmitListening$Result } from "./typing";

type Options = {
  params: SubmitListening$Params;
  createdBy: string;
};

export async function handler$SubmitListening(
  db: Db,
  { params, createdBy }: Options
) {
  const { insertedId } = await db.collection("submission-listening").insertOne({
    createdBy,
    createdAt: Date.now(),
    ...params
  });
  return SubmitListening$Result.parse({
    submissionId: insertedId.toHexString()
  });
}
