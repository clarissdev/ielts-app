import { notFound } from "next/navigation";
import React from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import { intentionallyIgnoreError } from "../../../../utils";
import {
  getDescriptionFromScore,
  getScoreFromNumCorrectQuestions
} from "../../reading/[submissionId]/utils";

import styles from "./page.module.scss";

import Flex from "@/modules/app-ui/components/Flex";
import { handler$GetAnswerListening } from "@/modules/commands/GetAnswerListening/handler";
import { handler$GetListeningExam } from "@/modules/commands/GetListeningExam/handler";
import { handler$GetSubmissionListening } from "@/modules/commands/GetSubmissionListening/handler";
import { handler$GetUser } from "@/modules/commands/GetUser/hander";
import { getQuestionId, getQuestionIdsFromTasks } from "@/modules/common-utils";
import { getDb } from "@/modules/mongodb";

type Props = {
  params: { submissionId: string };
};

export default async function Page({ params }: Props) {
  const db = await getDb();

  const submission = await handler$GetSubmissionListening(db, {
    submissionId: params.submissionId
  }).catch(intentionallyIgnoreError);
  if (!submission) {
    notFound();
  }

  const answer = await handler$GetAnswerListening(db, {
    examId: submission.examId
  }).catch(intentionallyIgnoreError);
  if (!answer) {
    notFound();
  }

  const exam = await handler$GetListeningExam(db, {
    examId: submission.examId
  }).catch(intentionallyIgnoreError);
  if (!exam) {
    notFound();
  }

  const user = await handler$GetUser(db, {
    userId: submission.createdBy
  }).catch(intentionallyIgnoreError);
  if (!user) {
    notFound();
  }

  const examIdsFromParts = getQuestionIdsFromTasks(
    exam.tasks.map(({ numQuestions }) => numQuestions)
  );

  const numCorrectAnswers = submission.answer.filter((item, index) =>
    answer.answers[getQuestionId(index + 1)]
      .map((item) => item.toLowerCase())
      .includes(item.toLowerCase())
  ).length;

  const score = getScoreFromNumCorrectQuestions(numCorrectAnswers);
  const details = getDescriptionFromScore(score);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.displayName}>{user.displayName}</div>
        <div className={styles.textYourScoreIs}>Your score is</div>
        <div className={styles.score}>{`${score}/9`}</div>
        <div className={styles.textCorrectAnswer}>
          <span>{`Correct Answers: `}</span>
          <span className={styles.colorSecondary}>
            {numCorrectAnswers}/{submission.answer.length}
          </span>
        </div>
      </div>
      {details ? (
        <div style={{ fontWeight: "500" }}>
          <div>
            <span className={styles.colorPrimary}>{`Skill level: `}</span>
            <span>{details.skillLevel}</span>
          </div>
          <div className={styles.textDescription}>
            <span className={styles.colorPrimary}>{`Description: `}</span>
            <span>{details.description}</span>
          </div>
        </div>
      ) : undefined}
      <Flex.Row flexWrap="wrap" paddingTop="20px">
        {examIdsFromParts.map((task, index) => (
          <Flex.Col gap="12px" key={index} flex="1 1 0">
            <h2 key={index} className={styles.colorPrimary}>{`Part ${
              index + 1
            }`}</h2>
            {task.map((id) => (
              <Flex.Row key={id} alignItems="center" gap="4px">
                <div className={styles.questionId}>{`${
                  id < 10 ? "0" : ""
                }${id}`}</div>
                <span className={styles.correctAnswer}>{` ${answer.answers[
                  getQuestionId(id)
                ].join(", ")}: `}</span>
                <span>{`${submission.answer[id - 1]} `}</span>
                <span>
                  {answer.answers[getQuestionId(id)]
                    .map((item) => item.toLowerCase())
                    .includes(submission.answer[id - 1].toLowerCase()) ? (
                    <IoMdCheckmark className={styles.colorGreen} />
                  ) : (
                    <IoMdClose className={styles.colorRed} />
                  )}
                </span>
              </Flex.Row>
            ))}
          </Flex.Col>
        ))}
      </Flex.Row>
    </div>
  );
}
