import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { GetSubmissionReading$Result, Params } from "./typing";

export async function handler$GetSubmissionReading(db: Db, params: Params) {
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
    .collection("submission-reading")
    .aggregate(agg)
    .toArray();
  assert(records?.length >= 1, "submission reading not found");

  const submission = GetSubmissionReading$Result.parse({
    submissionId: records[0]._id.toHexString(),
    ...records[0]
  });

  return submission;
}
