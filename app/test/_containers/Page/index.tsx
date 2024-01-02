"use client";

import { Button } from "antd";
import { FaHeadphones } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

export default function Route() {
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
              <Button
                type="primary"
                target="_blank"
                rel="noreferrer"
                size="large"
                href="/exam/listening/658f86ff578ef4f9988f2eef"
                icon={<FaHeadphones />}
              >
                Listening
              </Button>
              <Button
                type="primary"
                target="_blank"
                rel="noreferrer"
                size="large"
                href="/exam/reading/657bd98a5b375e28c31b3ba2"
                icon={<FaBookOpen />}
              >
                Reading
              </Button>
              <Button
                type="primary"
                target="_blank"
                rel="noreferrer"
                size="large"
                href="/exam/writing/658baf8b872548f88a2ca396"
                icon={<MdModeEdit />}
              >
                Writing
              </Button>
              {/* <Button
                type="primary"
                target="_blank"
                rel="noreferrer"
                size="large"
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
