import { Db, ObjectId } from "mongodb";
import { Params } from "./typing";
import { assert } from "../utils";
import { WritingExam } from "@/modules/business-types";

export async function handler$GetWritingExam(db: Db, { examId }: Params) {
  const agg = [
    {
      $match: { _id: ObjectId.createFromHexString(examId), type: "writing" },
    },
  ];
  const records = await db.collection("exam").aggregate(agg).toArray();
  assert(records?.length === 1, "exam not found");
  return WritingExam.parse({
    examId: records[0]._id.toHexString(),
    ...records[0],
  });
}
