import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Params } from "./typing";

import { SpeakingExam } from "@/modules/business-types";

export async function handler$GetSpeakingExam(db: Db, params: Params) {
  const agg = [
    {
      $match: {
        _id: ObjectId.createFromHexString(params.examId)
      }
    }
  ];
  const records = await db.collection("speaking-exam").aggregate(agg).toArray();
  assert(records?.length === 1, "speaking exam not found");
  const exam: SpeakingExam = SpeakingExam.parse({
    examId: records[0]._id.toHexString(),
    ...records[0]
  });
  return exam;
}
