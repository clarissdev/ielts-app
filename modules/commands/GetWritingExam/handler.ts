import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Params } from "./typing";

import { WritingExam } from "@/modules/business-types";

export async function handler$GetWritingExam(db: Db, { examId }: Params) {
  const agg = [
    {
      $match: { _id: ObjectId.createFromHexString(examId) }
    }
  ];
  const records = await db.collection("writing-exam").aggregate(agg).toArray();
  assert(records?.length === 1, "exam not found");
  return WritingExam.parse({
    examId: records[0]._id.toHexString(),
    ...records[0]
  });
}
