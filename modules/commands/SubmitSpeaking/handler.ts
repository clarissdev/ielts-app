import { Db } from "mongodb";

import { SubmitSpeaking$Params, SubmitSpeaking$Result } from "./typing";

type Options = {
  params: SubmitSpeaking$Params;
  createdBy: string;
};

export async function handler$SubmitSpeaking(
  db: Db,
  { params, createdBy }: Options
) {
  const { insertedId } = await db.collection("submission-speaking").insertOne({
    createdBy,
    createdAt: Date.now(),
    ...params
  });
  return SubmitSpeaking$Result.parse({
    submissionId: insertedId.toHexString()
  });
}
