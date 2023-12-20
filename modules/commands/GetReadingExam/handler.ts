import { Db, ObjectId } from "mongodb";

import { assert } from "../utils";

import { Params } from "./typing";

import { ReadingExam } from "@/modules/business-types";

type Options = {
  params: Params;
};

export async function handler$GetReadingExam(db: Db, { params }: Options) {
  const agg = [
    {
      $match: {
        _id: ObjectId.createFromHexString(params.examId)
      }
    }
  ];
  const records = await db.collection("reading-exam").aggregate(agg).toArray();
  assert(records?.length === 1, "exam not found");
  const exam: ReadingExam = ReadingExam.parse({
    examId: records[0]._id.toHexString(),
    ...records[0]
  });
  return exam;
}
