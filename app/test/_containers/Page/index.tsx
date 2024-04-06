"use client";

import { Button, Input } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";
import { httpPost$EditProfile } from "@/modules/commands/EditProfile/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";
import { DisplayableError } from "@/modules/error";
import ButtonListening from "./components/ButtonListening";
import ButtonReading from "./components/ButtonReading";
import ButtonWriting from "./components/ButtonWriting";
import ButtonSpeaking from "./components/ButtonSpeaking";

export default function Page() {
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

  const shouldDisableAllTests =
    !loginStatus?.loggedIn ||
    !loginStatus.displayName ||
    !loginStatus.phoneNumber ||
    !loginStatus.school;

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
            <div className={styles.alert}>
              Before proceeding with the test, please ensure you have entered
              the following information.
            </div>
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
            <h4>IELTS Practice 1</h4>
            <Flex.Row
              flex="1 1 0"
              padding="0 56px"
              gap="12px"
              justifyContent="center"
              flexWrap="wrap"
            >
              <ButtonListening
                disabled={shouldDisableAllTests}
                examId="658f86ff578ef4f9988f2eef"
              />
              <ButtonReading
                disabled={shouldDisableAllTests}
                examId="657bd98a5b375e28c31b3ba2"
              />
              <ButtonWriting
                disabled={shouldDisableAllTests}
                examId="658baf8b872548f88a2ca396"
              />
              <ButtonSpeaking
                disabled={shouldDisableAllTests}
                examId="65938f57dc0c9c2ee05f3501"
              />
            </Flex.Row>
            <h4>IELTS Practice 2</h4>
            <Flex.Row
              flex="1 1 0"
              padding="0 56px"
              gap="12px"
              justifyContent="center"
              flexWrap="wrap"
            >
              <ButtonReading
                disabled={shouldDisableAllTests}
                examId="660d595c085c87fd48ba271b"
              />
              <ButtonListening
                disabled={shouldDisableAllTests}
                examId="661153bf5e805cd51bd54159"
              />
            </Flex.Row>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button size="large" href="/login">
              Login to Continue
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
