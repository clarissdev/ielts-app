import { Db, ObjectId } from "mongodb";

import { SubmitReadingGrade$Params, SubmitReadingGrade$Result } from "./typing";

export async function handler$SubmitReadingGrade(
  db: Db,
  params: SubmitReadingGrade$Params
) {
  const { submissionId, ...others } = params;
  await db.collection("submission-reading").updateOne(
    { _id: ObjectId.createFromHexString(params.submissionId) },
    {
      $set: { ...others }
    }
  );
  return SubmitReadingGrade$Result.parse({
    submissionId
  });
}
