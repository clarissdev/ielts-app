import { Db } from "mongodb";

import { getScoreFromNumCorrectQuestions } from "../../../app/submission/reading/[submissionId]/utils";
import { handler$GetAnswerReading } from "../GetAnswerReading/handler";

import { SubmitReading$Params, SubmitReading$Result } from "./typing";

import { getQuestionId } from "@/modules/common-utils";

type Options = {
  params: SubmitReading$Params;
  createdBy: string;
};

export async function handler$SubmitReading(
  db: Db,
  { params, createdBy }: Options
) {
  const answer = await handler$GetAnswerReading(db, {
    examId: params.examId
  });

  const numCorrectAnswers = params.answer.filter((item, index) =>
    answer.answers[getQuestionId(index + 1)].includes(item)
  ).length;

  const grade = getScoreFromNumCorrectQuestions(numCorrectAnswers);

  const { insertedId } = await db.collection("submission-reading").insertOne({
    createdBy,
    createdAt: Date.now(),
    grade,
    ...params
  });
  return SubmitReading$Result.parse({ submissionId: insertedId.toHexString() });
}
