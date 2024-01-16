import { Db } from "mongodb";

import { GetSubmissionSpeakingList$Params, Result } from "./typing";

export async function handler$GetSubmissionSpeakingList(
  db: Db,
  { graded }: GetSubmissionSpeakingList$Params
) {
  const agg = [
    ...(graded != null ? [{ $match: { grade: { $exists: graded } } }] : [])
  ];
  const records = await db
    .collection("submission-speaking")
    .aggregate(agg)
    .toArray();
  const result = Result.parse(
    records.map((doc) => ({
      submissionId: doc._id.toHexString()
    }))
  );
  return result;
}
