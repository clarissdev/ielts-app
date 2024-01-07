import { Db, ObjectId } from "mongodb";

import {
  SubmitListeningGrade$Params,
  SubmitListeningGrade$Result
} from "./typing";

export async function handler$SubmitListeningGrade(
  db: Db,
  params: SubmitListeningGrade$Params
) {
  const { submissionId, ...others } = params;
  await db.collection("submission-listening").updateOne(
    { _id: ObjectId.createFromHexString(params.submissionId) },
    {
      $set: { ...others }
    }
  );
  return SubmitListeningGrade$Result.parse({
    submissionId
  });
}
