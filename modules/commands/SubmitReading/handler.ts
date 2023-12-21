import { Db } from "mongodb";

import { SubmitReading$Params, SubmitReading$Result } from "./typing";

type Options = {
  params: SubmitReading$Params;
  createdBy: string;
};

export async function handler$SubmitReading(
  db: Db,
  { params, createdBy }: Options
) {
  const { insertedId } = await db.collection("submission-reading").insertOne({
    createdBy,
    createdAt: Date.now(),
    ...params
  });
  return SubmitReading$Result.parse({ submissionId: insertedId.toHexString() });
}
