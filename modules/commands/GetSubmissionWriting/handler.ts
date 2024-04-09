import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Result, Params } from "./typing";
import { z } from "zod";

export async function handler$GetSubmissionWriting(db: Db, params: Params) {
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
    .collection("submission-writing")
    .aggregate(agg)
    .toArray();
  assert(records?.length >= 1, "submission writing not found");

  const submission = Result.parse({
    submissionId: records[0]._id.toHexString(),
    ...records[0]
  });

  return submission;
}
