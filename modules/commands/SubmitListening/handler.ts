import { Db } from "mongodb";

import { getScoreFromNumCorrectQuestions } from "../../../app/submission/reading/[submissionId]/utils";
import { handler$GetAnswerListening } from "../GetAnswerListening/handler";

import { SubmitListening$Params, SubmitListening$Result } from "./typing";

import { getQuestionId } from "@/modules/common-utils";

type Options = {
  params: SubmitListening$Params;
  createdBy: string;
};

export async function handler$SubmitListening(
  db: Db,
  { params, createdBy }: Options
) {
  const answer = await handler$GetAnswerListening(db, {
    examId: params.examId
  });
  const numCorrectAnswers = params.answer.filter((item, index) =>
    answer.answers[getQuestionId(index + 1)]
      .map((item) => item.toLowerCase())
      .includes(item.toLowerCase())
  ).length;

  const grade = getScoreFromNumCorrectQuestions(numCorrectAnswers);

  const { insertedId } = await db.collection("submission-listening").insertOne({
    createdBy,
    createdAt: Date.now(),
    grade,
    ...params
  });
  return SubmitListening$Result.parse({
    submissionId: insertedId.toHexString()
  });
}
