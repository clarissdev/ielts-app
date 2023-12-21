import { Db } from "mongodb";

import { assert } from "../utils";

import { GetAnswerReading$Result, Params } from "./typing";

export async function handler$GetAnswerReading(db: Db, params: Params) {
  const agg = [
    {
      $match: {
        examId: params.examId
      }
    }
  ];
  const records = await db
    .collection("answer-reading")
    .aggregate(agg)
    .toArray();
  assert(records?.length === 1, "answer reading not found");
  const exam: GetAnswerReading$Result = GetAnswerReading$Result.parse({
    answerId: records[0]._id.toHexString(),
    ...records[0]
  });
  return exam;
}
