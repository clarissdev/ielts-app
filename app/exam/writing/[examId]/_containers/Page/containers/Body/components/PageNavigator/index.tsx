import { Button } from "antd";
import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

import Flex from "@/modules/app-ui/components/Flex";
import { WritingExam } from "@/modules/business-types";

type Props = {
  initialExam: WritingExam;
  answer: string[];
  currentTask: number;
  onChangeCurrentTask: (value: number) => void;
};

export default function PageNavigator({
  initialExam,
  currentTask,
  answer,
  onChangeCurrentTask
}: Props) {
  return (
    <Flex.Row
      alignItems="center"
      padding="4px 20px"
      justifyContent="space-between"
    >
      <Flex.Row flexWrap="wrap" gap="12px">
        {initialExam.tasks.map((_task, index) => (
          <Button
            style={{ borderWidth: "2px" }}
            size="small"
            type={answer[index] ? "primary" : undefined}
            key={index}
            onClick={() => {
              if (currentTask !== index) {
                onChangeCurrentTask(index);
              }
            }}
          >
            {`Task ${index + 1}`}
          </Button>
        ))}
      </Flex.Row>
      <Flex.Row gap="12px">
        <Button
          size="small"
          icon={<MdArrowLeft size="22px" />}
          disabled={currentTask === 0}
          onClick={() => onChangeCurrentTask(currentTask - 1)}
        ></Button>
        <Button
          size="small"
          icon={<MdArrowRight size="22px" />}
          disabled={currentTask === initialExam.tasks.length - 1}
          onClick={() => onChangeCurrentTask(currentTask + 1)}
        ></Button>
      </Flex.Row>
    </Flex.Row>
  );
}
