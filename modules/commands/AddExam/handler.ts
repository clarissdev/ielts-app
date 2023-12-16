import { Db } from "mongodb";

import { Result, Params } from "./typing";

type Options = {
  db: Db;
  userId: string;
};

export async function handler(
  params: Params,
  options: Options
): Promise<Result> {
  const { db, userId } = options;

  // insert reading exam
  const { insertedId: readingExamId } = await db.collection("exam").insertOne({
    type: "reading",
    tasks: params.readingExam,
  });

  // insert writing exam
  const { insertedId: writingExamId } = await db.collection("exam").insertOne({
    type: "writing",
    tasks: params.writingExam,
  });

  // insert full exam
  const { insertedId: examId } = await db.collection("exam").insertOne({
    type: "full",
    title: params.title,
    year: params.year,
    createdBy: userId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    readingExamId: readingExamId.toHexString(),
    writingExamId: writingExamId.toHexString(),
  });
  return { examId: examId.toHexString() };
}

export const handler$AddExam = handler;
