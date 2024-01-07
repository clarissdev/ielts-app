import { Db } from "mongodb";

import { GetSubmissionWritingList$Params, Result } from "./typing";

export async function handler$GetSubmissionWritingList(
  db: Db,
  { graded }: GetSubmissionWritingList$Params
) {
  const agg = [
    ...(graded != null ? [{ $match: { grade: { $exists: graded } } }] : [])
  ];
  const records = await db
    .collection("submission-writing")
    .aggregate(agg)
    .toArray();
  const result = Result.parse(
    records.map((doc) => ({
      submissionId: doc._id.toHexString()
    }))
  );
  return result;
}
