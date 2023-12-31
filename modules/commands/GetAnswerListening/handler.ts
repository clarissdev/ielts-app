import { Db } from "mongodb";

import { assert } from "../utils";

import { GetAnswerListening$Result, Params } from "./typing";

export async function handler$GetAnswerListening(db: Db, params: Params) {
  const agg = [
    {
      $match: {
        examId: params.examId
      }
    }
  ];
  const records = await db
    .collection("answer-listening")
    .aggregate(agg)
    .toArray();
  assert(records?.length === 1, "answer listening not found");
  const exam: GetAnswerListening$Result = GetAnswerListening$Result.parse({
    answerId: records[0]._id.toHexString(),
    ...records[0]
  });
  return exam;
}
