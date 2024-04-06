import { Db } from "mongodb";

import { handler$GetAnswerListening } from "../GetAnswerListening/handler";

import { SubmitListening$Params, SubmitListening$Result } from "./typing";

import { getQuestionId } from "@/modules/common-utils";

type Options = {
  params: SubmitListening$Params;
  createdBy: string;
};

function getScoreFromNumCorrectQuestions(numCorrectQuestions: number) {
  if (numCorrectQuestions >= 39 && numCorrectQuestions <= 40) return 9;
  if (numCorrectQuestions >= 37 && numCorrectQuestions <= 38) return 8.5;
  if (numCorrectQuestions >= 35 && numCorrectQuestions <= 36) return 8;
  if (numCorrectQuestions >= 33 && numCorrectQuestions <= 34) return 7.5;
  if (numCorrectQuestions >= 30 && numCorrectQuestions <= 32) return 7;
  if (numCorrectQuestions >= 27 && numCorrectQuestions <= 29) return 6.5;
  if (numCorrectQuestions >= 23 && numCorrectQuestions <= 26) return 6;
  if (numCorrectQuestions >= 19 && numCorrectQuestions <= 22) return 5.5;
  if (numCorrectQuestions >= 15 && numCorrectQuestions <= 18) return 5;
  if (numCorrectQuestions >= 13 && numCorrectQuestions <= 14) return 4.5;
  if (numCorrectQuestions >= 10 && numCorrectQuestions <= 12) return 4;
  if (numCorrectQuestions >= 8 && numCorrectQuestions <= 9) return 3.5;
  if (numCorrectQuestions >= 6 && numCorrectQuestions <= 7) return 3;
  return 1;
}

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
