"use client";

import { Button, Input } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHeadphones } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";
import { httpPost$EditProfile } from "@/modules/commands/EditProfile/fetcher";
import { GetSubmissionListening$Result } from "@/modules/commands/GetSubmissionListening/typing";
import { GetSubmissionReading$Result } from "@/modules/commands/GetSubmissionReading/typing";
import { GetSubmissionSpeaking$Result } from "@/modules/commands/GetSubmissionSpeaking/typing";
import { GetSubmissionWriting$Result } from "@/modules/commands/GetSubmissionWriting/typing";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";
import { DisplayableError } from "@/modules/error";

type Props = {
  submissionReading: GetSubmissionReading$Result | undefined;
  submissionListening: GetSubmissionListening$Result | undefined;
  submissionWriting: GetSubmissionWriting$Result | undefined;
  submissionSpeaking: GetSubmissionSpeaking$Result | undefined;
};

export default function Route({
  submissionReading,
  submissionListening,
  submissionWriting,
  submissionSpeaking
}: Props) {
  const loginStatus = useLoginStatus();
  const router = useRouter();
  const [notificationApi, notificationContextHolder] = useNotification();
  const [displayName, setDisplayName] = React.useState(
    loginStatus?.loggedIn ? loginStatus?.displayName || "" : ""
  );
  const [phoneNumber, setPhoneNumber] = React.useState(
    loginStatus?.loggedIn ? loginStatus.phoneNumber || "" : ""
  );
  const [school, setSchool] = React.useState(
    loginStatus?.loggedIn ? loginStatus.school || "" : ""
  );

  const handleReset = () => {
    setDisplayName(loginStatus?.loggedIn ? loginStatus?.displayName || "" : "");
    setPhoneNumber(loginStatus?.loggedIn ? loginStatus.phoneNumber || "" : "");
    setSchool(loginStatus?.loggedIn ? loginStatus.school || "" : "");
  };

  const handleSave = async () => {
    try {
      await httpPost$EditProfile(`/api/v1/me/edit`, {
        displayName,
        phoneNumber,
        school
      });
      notificationApi.success({
        message: "Details edited successfully!"
      });
      shamelesslyRevalidateEverything();
      router.refresh();
    } catch (error) {
      const displayableError = DisplayableError.from(error);
      notificationApi.error({
        message: displayableError.title,
        description: displayableError.description
      });
    }
  };
  return (
    <div>
      {notificationContextHolder}
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        {loginStatus?.loggedIn ? (
          <>
            <h3>Your details</h3>
            <div className={styles.label}>{`Your name`}</div>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <div className={styles.label}>{`Your phone number`}</div>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className={styles.label}>{`Your school`}</div>
            <Input value={school} onChange={(e) => setSchool(e.target.value)} />
            <Flex.Row justifyContent="center" gap="8px" paddingTop="20px">
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </Flex.Row>
            <h3>Test ngay</h3>
            <Flex.Row
              flex="1 1 0"
              padding="8px 56px"
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
              <Flex.Col gap="12px">
                <Button
                  type="primary"
                  target="_blank"
                  rel="noreferrer"
                  size="large"
                  disabled={submissionSpeaking != null}
                  className={styles.button}
                  href={`/exam/speaking?${new URLSearchParams({
                    redirectUrl: "/exam/speaking/65938f57dc0c9c2ee05f3501"
                  })}`}
                  icon={<RiSpeakFill />}
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
