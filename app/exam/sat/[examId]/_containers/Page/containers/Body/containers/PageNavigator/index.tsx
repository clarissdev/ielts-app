import { Button, Checkbox, Dropdown, Popover } from "antd";
import cx from "clsx";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useRecoilValue } from "recoil";

import styles from "./index.module.scss";

import { answersState } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { SatExam } from "@/modules/business-types";
import { getQuestionId, getQuestionIdsFromTasks } from "@/modules/common-utils";
import { range } from "@/modules/common-utils";

type Props = {
  currentModule: number;
  initialExam: SatExam;
  currentTask: number;
  onChangeCurrentTask: (value: number) => void;
};

export default function PageNavigator({
  initialExam,
  currentTask,
  currentModule,
  onChangeCurrentTask
}: Props) {
  const answers = useRecoilValue(answersState);
  const questionIdsFromTasks = initialExam.modules[currentModule].tasks.map(
    (_, index) => `question_${index < 10 ? `0${index}` : index}`
  );
  const [openPopover, setOpenPopover] = React.useState(false);

  return (
    <Flex.Row
      alignItems="center"
      padding="4px 20px"
      justifyContent="space-between"
    >
      <Flex.Row gap="12px">
        <Button
          size="large"
          icon={<MdArrowLeft size="26px" />}
          disabled={currentTask === 0}
          onClick={() => onChangeCurrentTask(currentTask - 1)}
        ></Button>
        <Button
          size="large"
          icon={<MdArrowRight size="26px" />}
          disabled={
            currentTask === initialExam.modules[currentModule].tasks.length - 1
          }
          onClick={() => onChangeCurrentTask(currentTask + 1)}
        ></Button>
      </Flex.Row>
    </Flex.Row>
  );
}
