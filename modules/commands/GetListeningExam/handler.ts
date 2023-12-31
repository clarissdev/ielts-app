import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Params } from "./typing";

import { ListeningExam } from "@/modules/business-types";

export async function handler$GetListeningExam(db: Db, params: Params) {
  const agg = [
    {
      $match: {
        _id: ObjectId.createFromHexString(params.examId)
      }
    }
  ];
  const records = await db
    .collection("listening-exam")
    .aggregate(agg)
    .toArray();
  assert(records?.length === 1, "exam not found");
  const exam: ListeningExam = ListeningExam.parse({
    examId: records[0]._id.toHexString(),
    ...records[0]
  });
  return exam;
}
