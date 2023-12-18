import { ReadingExam } from "@/modules/business-types";
import { getQuestionId } from "@/modules/common-utils";
import { Button } from "antd";
import { range } from "@/modules/common-utils";
import Flex from "@/modules/app-ui/components/Flex";
import { answersState } from "@/modules/app-ui/components/Editor/utils";
import { useRecoilValue } from "recoil";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

type Props = {
  initialExam: ReadingExam;
  currentTask: number;
  onChangeCurrentTask: (value: number) => void;
  onReview: () => void;
};

export default function PageNavigator({
  initialExam,
  currentTask,
  onChangeCurrentTask,
  onReview,
}: Props) {
  const answers = useRecoilValue(answersState);
  return (
    <Flex.Row
      alignItems="center"
      padding="4px 20px"
      justifyContent="space-between"
    >
      <div>
        <Button onClick={onReview}>Review</Button>
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
                    type={!!answers[questionId] ? "primary" : undefined}
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
