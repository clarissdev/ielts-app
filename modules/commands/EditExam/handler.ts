import { Db, ObjectId } from "mongodb";

import { Result, Params } from "./typing";
import { assert } from "../utils";

export async function handler(
  db: Db,
  { examId, title, year, readingExam, writingExam }: Params
): Promise<Result> {
  const documents = await db
    .collection("exam")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(examId),
          type: "full",
        },
      },
    ])
    .toArray();
  assert(documents.length === 1, "only one exam must exist");
  const readingExamId = documents[0].readingExamId;
  const writingExamId = documents[0].writingExamId;

  // insert reading exam
  const { modifiedCount: countModifiedReadingExam } = await db
    .collection("exam")
    .updateOne(
      {
        _id: ObjectId.createFromHexString(readingExamId),
      },
      [
        {
          $set: {
            tasks: readingExam,
          },
        },
      ]
    );
  assert(countModifiedReadingExam <= 1, "updated reading exam failed!");

  // insert writing exam
  const { modifiedCount: countModifiedWritingExam } = await db
    .collection("exam")
    .updateOne(
      {
        _id: ObjectId.createFromHexString(writingExamId),
      },
      [
        {
          $set: {
            tasks: writingExam,
          },
        },
      ]
    );
  assert(countModifiedWritingExam <= 1, "updated writing exam failed!");

  // insert full exam
  const { modifiedCount: countModifiedExam } = await db
    .collection("exam")
    .updateOne(
      {
        _id: ObjectId.createFromHexString(examId),
        type: "full",
      },
      [
        {
          $set: {
            type: "full",
            title,
            year,
            updatedAt: Date.now(),
          },
        },
      ]
    );
  assert(countModifiedExam <= 1, "updated writing failed!");
  return { examId };
}

export const handler$EditExam = handler;
