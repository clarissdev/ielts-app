import { Db, ObjectId } from "mongodb";
import { GetExam$Result, Params } from "./typing";
import { assert } from "../utils";

export async function handler$GetExam(db: Db, { examId }: Params) {
  const examRecords = await db
    .collection("exam")
    .aggregate([
      {
        $match: { _id: ObjectId.createFromHexString(examId), type: "full" },
      },
    ])
    .toArray();
  assert(examRecords?.length === 1, "exam not found");
  const writingExamId: string = examRecords[0].writingExamId;
  const readingExamId: string = examRecords[0].readingExamId;

  // get Reading Exam
  const readingExamRecords = await db
    .collection("exam")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(readingExamId),
          type: "reading",
        },
      },
    ])
    .toArray();
  assert(readingExamRecords?.length === 1, "reading exam not found");

  // get Writing Exam
  const writingExamRecords = await db
    .collection("exam")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(writingExamId),
          type: "writing",
        },
      },
    ])
    .toArray();
  assert(writingExamRecords?.length === 1, "writing exam not found");

  return GetExam$Result.parse({
    title: examRecords[0].title,
    year: examRecords[0].year,
    readingExam: readingExamRecords[0].tasks,
    writingExam: writingExamRecords[0].tasks,
  });
}
