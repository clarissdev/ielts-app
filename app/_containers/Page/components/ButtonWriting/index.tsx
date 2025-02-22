import { Button } from "antd";
import { MdModeEdit } from "react-icons/md";
import useSWR from "swr";

import styles from "./index.module.scss";

import Flex from "@/modules/app-ui/components/Flex";
import {
  getResourceKey$GetSubmissionWriting,
  httpGet$GetSubmissionWriting
} from "@/modules/commands/GetSubmissionWriting/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

type Props = {
  examId: string;
  disabled?: boolean;
};

export default function ButtonWriting({ examId, disabled }: Props) {
  const loginStatus = useLoginStatus();
  const { data: submissionWriting } = useSWR(
    loginStatus?.loggedIn
      ? getResourceKey$GetSubmissionWriting({
          examId,
          createdBy: loginStatus.userId
        })
      : undefined,
    async () =>
      loginStatus?.loggedIn
        ? await httpGet$GetSubmissionWriting(`/api/v1/submission/writing`, {
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
        href={`/exam/writing/${examId}`}
        className={styles.button}
        icon={<MdModeEdit />}
        disabled={
          disabled || !loginStatus?.loggedIn || submissionWriting != null
        }
      >
        Writing
      </Button>
      {submissionWriting ? (
        <div>{`Your result: ${
          submissionWriting?.grade ? submissionWriting.grade.toFixed(1) : "TBD"
        }`}</div>
      ) : undefined}
    </Flex.Col>
  );
}
