import Flex from "@/modules/app-ui/components/Flex";
import { Button } from "antd";
import styles from "./index.module.scss";
import { MdModeEdit } from "react-icons/md";
import useSWR from "swr";
import {
  getResourceKey$GetSubmissionReading,
  httpGet$GetSubmissionReading
} from "@/modules/commands/GetSubmissionReading/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { FaBookOpen } from "react-icons/fa";

type Props = {
  examId: string;
  disabled?: boolean;
};

export default function ButtonReading({ examId, disabled }: Props) {
  const loginStatus = useLoginStatus();
  const { data: submissionReading } = useSWR(
    loginStatus?.loggedIn
      ? getResourceKey$GetSubmissionReading({
          examId,
          createdBy: loginStatus.userId
        })
      : undefined,
    async () =>
      loginStatus?.loggedIn
        ? await httpGet$GetSubmissionReading(`/api/v1/submission/reading`, {
            examId,
            createdBy: loginStatus.userId
          })
        : undefined
  );
  return (
    <Flex.Col gap="12px">
      <Button
        type="primary"
        target="_blank"
        rel="noreferrer"
        size="large"
        href={`/exam/reading/${examId}`}
        className={styles.button}
        icon={<FaBookOpen />}
        disabled={
          disabled || !loginStatus?.loggedIn || submissionReading != null
        }
      >
        Reading
      </Button>
      {submissionReading ? (
        <div>{`Your result: ${
          submissionReading?.grade ? submissionReading.grade.toFixed(1) : "TBD"
        }`}</div>
      ) : undefined}
    </Flex.Col>
  );
}
