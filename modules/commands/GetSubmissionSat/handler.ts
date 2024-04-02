import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { GetSubmissionSat$Result, Params } from "./typing";

export async function handler$GetSubmissionSat(db: Db, params: Params) {
  const agg = [
    {
      $match: params.submissionId
        ? {
            _id: ObjectId.createFromHexString(params.submissionId)
          }
        : {
            createdBy: params.createdBy
          }
    }
  ];
  const records = await db
    .collection("submission-sat")
    .aggregate(agg)
    .toArray();
  assert(records?.length === 1, "submission sat not found");

  const submission = GetSubmissionSat$Result.parse({
    submissionId: records[0]._id.toHexString(),
    ...records[0]
  });

  return submission;
}
