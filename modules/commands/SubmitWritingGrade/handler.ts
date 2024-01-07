import { Db, ObjectId } from "mongodb";

import { SubmitWritingGrade$Params, SubmitWritingGrade$Result } from "./typing";

export async function handler$SubmitWritingGrade(
  db: Db,
  params: SubmitWritingGrade$Params
) {
  const { submissionId, ...others } = params;
  await db.collection("submission-writing").updateOne(
    { _id: ObjectId.createFromHexString(params.submissionId) },
    {
      $set: { ...others }
    }
  );
  return SubmitWritingGrade$Result.parse({
    submissionId
  });
}
