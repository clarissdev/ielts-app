import { Button, Popover } from "antd";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useRecoilValue } from "recoil";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { ReadingExam } from "@/modules/business-types";
import { getQuestionId, getQuestionIdsFromTasks } from "@/modules/common-utils";
import { range } from "@/modules/common-utils";

type Props = {
  initialExam: ReadingExam;
  currentTask: number;
  onChangeCurrentTask: (value: number) => void;
};

export default function PageNavigator({
  initialExam,
  currentTask,
  onChangeCurrentTask
}: Props) {
  const answers = useRecoilValue(answersState);
  const questionIdsFromTasks = getQuestionIdsFromTasks(
    initialExam.tasks.map(({ numQuestions }) => numQuestions)
  );
  const [openPopover, setOpenPopover] = React.useState(false);
  return (
    <Flex.Row
      alignItems="center"
      padding="4px 20px"
      justifyContent="space-between"
    >
      <div>
        <Popover
          open={openPopover}
          title={
            <Flex.Row justifyContent="space-between">
              <span>Review</span>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                size="small"
                icon={<AiOutlineClose />}
                onClick={() => setOpenPopover(false)}
              ></Button>
            </Flex.Row>
          }
          trigger="click"
          content={
            <div>
              <Flex.Row
                justifyContent="space-between"
                style={{ margin: "0 auto" }}
                gap="20px"
              >
                {questionIdsFromTasks.map((task, index) => (
                  <Flex.Col
                    minWidth="120px"
                    key={index}
                    flex="1 1 0"
                    justifyContent="left"
                    style={{ textAlign: "left" }}
                  >
                    <b>{`Task ${index + 1}: `}</b>
                    {task.map((index) => (
                      <div key={index}>
                        <span>{`${index}: `}</span>
                        <strong>{answers[getQuestionId(index)] || ""}</strong>
                      </div>
                    ))}
                  </Flex.Col>
                ))}
              </Flex.Row>
            </div>
          }
        >
          <Button onClick={() => setOpenPopover(true)}>Review</Button>
        </Popover>
      </div>
      <Flex.Row flexWrap="wrap" gap="8px 20px">
        {(() => {
          let cnt = 0;
          return initialExam.tasks.map((task, indexTask) => (
            <Flex.Row key={indexTask} gap="4px" alignItems="center">
              <b>{`Task ${indexTask + 1}`}</b>
              {range(task.numQuestions).map(() => {
                cnt = cnt + 1;
                const currentTask = cnt;
                const questionId = getQuestionId(currentTask);
                return (
                  <Button
                    size="small"
                    type={answers[questionId] ? "primary" : undefined}
                    key={currentTask}
                    onClick={() => {
                      if (currentTask != indexTask) {
                        onChangeCurrentTask(indexTask);
                      }
                      const element = document.getElementById(questionId);

                      element?.scrollIntoView({ behavior: "smooth" });
                      element?.focus();
                    }}
                  >
                    {currentTask}
                  </Button>
                );
              })}
            </Flex.Row>
          ));
        })()}
      </Flex.Row>
      <Flex.Row gap="12px">
        <Button
          icon={<MdArrowLeft size="22px" />}
          disabled={currentTask === 0}
          onClick={() => onChangeCurrentTask(currentTask - 1)}
        ></Button>
        <Button
          icon={<MdArrowRight size="22px" />}
          disabled={currentTask === initialExam.tasks.length - 1}
          onClick={() => onChangeCurrentTask(currentTask + 1)}
        ></Button>
      </Flex.Row>
    </Flex.Row>
  );
}
