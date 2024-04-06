import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { GetSubmissionListening$Result, Params } from "./typing";

export async function handler$GetSubmissionListening(db: Db, params: Params) {
  const agg = [
    {
      $match: params.submissionId
        ? {
            _id: ObjectId.createFromHexString(params.submissionId)
          }
        : {
            examId: params.examId,
            createdBy: params.createdBy
          }
    }
  ];
  const records = await db
    .collection("submission-listening")
    .aggregate(agg)
    .toArray();
  assert(records?.length === 1, "submission listening not found");

  const submission = GetSubmissionListening$Result.parse({
    submissionId: records[0]._id.toHexString(),
    ...records[0]
  });

  return submission;
}
