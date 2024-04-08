import { Button } from "antd";
import { MdModeEdit } from "react-icons/md";
import useSWR from "swr";

import styles from "./index.module.scss";

import Flex from "@/modules/app-ui/components/Flex";
import {
  getResourceKey$GetSubmissionSpeaking,
  httpGet$GetSubmissionSpeaking
} from "@/modules/commands/GetSubmissionSpeaking/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

type Props = {
  examId: string;
  disabled?: boolean;
};

export default function ButtonSpeaking({ examId, disabled }: Props) {
  const loginStatus = useLoginStatus();
  const { data: submissionSpeaking } = useSWR(
    loginStatus?.loggedIn
      ? getResourceKey$GetSubmissionSpeaking({
          examId,
          createdBy: loginStatus.userId
        })
      : undefined,
    async () =>
      loginStatus?.loggedIn
        ? await httpGet$GetSubmissionSpeaking(`/api/v1/submission/speaking`, {
            examId,
            createdBy: loginStatus.userId
          }).catch((_) => undefined)
        : undefined
  );
  return (
    <Flex.Col gap="12px">
      <Button
        type="primary"
        target="_blank"
        rel="noreferrer"
        size="large"
        href={`/exam/speaking?${new URLSearchParams({
          redirectUrl: `/exam/speaking/${examId}`
        })}`}
        className={styles.button}
        icon={<MdModeEdit />}
        disabled={
          disabled || !loginStatus?.loggedIn || submissionSpeaking != null
        }
      >
        Speaking
      </Button>
      {submissionSpeaking ? (
        <div>{`Your result: ${
          submissionSpeaking?.grade
            ? submissionSpeaking.grade.toFixed(1)
            : "TBD"
        }`}</div>
      ) : undefined}
    </Flex.Col>
  );
}
