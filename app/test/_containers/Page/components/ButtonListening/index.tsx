import { Button } from "antd";
import { MdModeEdit } from "react-icons/md";
import useSWR from "swr";

import styles from "./index.module.scss";

import Flex from "@/modules/app-ui/components/Flex";
import {
  getResourceKey$GetSubmissionListening,
  httpGet$GetSubmissionListening
} from "@/modules/commands/GetSubmissionListening/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

type Props = {
  examId: string;
  disabled?: boolean;
};

export default function ButtonListening({ examId, disabled }: Props) {
  const loginStatus = useLoginStatus();
  const { data: submissionListening } = useSWR(
    loginStatus?.loggedIn
      ? getResourceKey$GetSubmissionListening({
          examId,
          createdBy: loginStatus.userId
        })
      : undefined,
    async () =>
      loginStatus?.loggedIn
        ? await httpGet$GetSubmissionListening(`/api/v1/submission/listening`, {
            examId,
            createdBy: loginStatus.userId
          }).catch(() => undefined)
        : undefined
  );
  return (
    <Flex.Col gap="12px">
      <Button
        type="primary"
        target="_blank"
        rel="noreferrer"
        size="large"
        href={`/exam/listening/${examId}`}
        className={styles.button}
        icon={<MdModeEdit />}
        disabled={
          disabled || !loginStatus?.loggedIn || submissionListening != null
        }
      >
        Listening
      </Button>
      {submissionListening ? (
        <div>{`Your result: ${
          submissionListening?.grade
            ? submissionListening.grade.toFixed(1)
            : "TBD"
        }`}</div>
      ) : undefined}
    </Flex.Col>
  );
}
