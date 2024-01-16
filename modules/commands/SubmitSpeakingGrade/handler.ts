import { Db, ObjectId } from "mongodb";

import {
  SubmitSpeakingGrade$Params,
  SubmitSpeakingGrade$Result
} from "./typing";

export async function handler$SubmitSpeakingGrade(
  db: Db,
  params: SubmitSpeakingGrade$Params
) {
  const { submissionId, ...others } = params;
  await db.collection("submission-speaking").updateOne(
    { _id: ObjectId.createFromHexString(params.submissionId) },
    {
      $set: { ...others }
    }
  );
  return SubmitSpeakingGrade$Result.parse({
    submissionId
  });
}
