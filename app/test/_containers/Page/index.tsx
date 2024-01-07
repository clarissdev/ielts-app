"use client";

import { Button } from "antd";
import { FaHeadphones } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
// import { RiSpeakFill } from "react-icons/ri";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";
import { GetSubmissionListening$Result } from "@/modules/commands/GetSubmissionListening/typing";
import { GetSubmissionReading$Result } from "@/modules/commands/GetSubmissionReading/typing";
import { GetSubmissionWriting$Result } from "@/modules/commands/GetSubmissionWriting/typing";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

type Props = {
  submissionReading: GetSubmissionReading$Result | undefined;
  submissionListening: GetSubmissionListening$Result | undefined;
  submissionWriting: GetSubmissionWriting$Result | undefined;
};

export default function Route({
  submissionReading,
  submissionListening,
  submissionWriting
}: Props) {
  const loginStatus = useLoginStatus();
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        {loginStatus?.loggedIn ? (
          <>
            <h3>Your details</h3>
            <div>{`Your name: ${loginStatus.displayName}`}</div>
            <div>{`Your email: ${loginStatus.email}`}</div>
            <h3>Test ngay</h3>
            <Flex.Row
              flex="1 1 0"
              padding="20px 56px"
              gap="12px"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Flex.Col gap="12px">
                <Button
                  type="primary"
                  target="_blank"
                  rel="noreferrer"
                  size="large"
                  href="/exam/listening/658f86ff578ef4f9988f2eef"
                  className={styles.button}
                  icon={<FaHeadphones />}
                  disabled={submissionListening != null}
                >
                  Listening
                </Button>
                {submissionListening ? (
                  <div>{`Your result: ${submissionListening?.grade?.toFixed(
                    1
                  )}`}</div>
                ) : undefined}
              </Flex.Col>
              <Flex.Col gap="12px">
                <Button
                  type="primary"
                  target="_blank"
                  rel="noreferrer"
                  size="large"
                  href="/exam/reading/657bd98a5b375e28c31b3ba2"
                  className={styles.button}
                  icon={<FaBookOpen />}
                  disabled={submissionReading != null}
                >
                  Reading
                </Button>
                {submissionReading ? (
                  <div>{`Your result: ${submissionReading?.grade?.toFixed(
                    1
                  )}`}</div>
                ) : undefined}
              </Flex.Col>
              <Flex.Col gap="12px">
                <Button
                  type="primary"
                  target="_blank"
                  rel="noreferrer"
                  size="large"
                  href="/exam/writing/658baf8b872548f88a2ca396"
                  className={styles.button}
                  icon={<MdModeEdit />}
                  disabled={submissionWriting != null}
                >
                  Writing
                </Button>
                {submissionWriting ? (
                  <div>{`Your result: ${
                    submissionWriting?.grade
                      ? submissionWriting.grade.toFixed(1)
                      : "TBD"
                  }`}</div>
                ) : undefined}
              </Flex.Col>
              {/* <Button
                type="primary"
                target="_blank"
                rel="noreferrer"
                size="large"
                className={styles.button}
                href={`/exam/speaking?${new URLSearchParams({
                  redirectUrl: "/exam/speaking/65938f57dc0c9c2ee05f3501"
                })}`}
                icon={<RiSpeakFill />}
              >
                Speaking
              </Button> */}
            </Flex.Row>
          </>
        ) : (
          <Button size="large" href="/login">
            Login to Continue
          </Button>
        )}
      </main>
    </div>
  );
}
