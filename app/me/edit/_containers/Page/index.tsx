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
import { DisplayableError } from "@/modules/error";

export default function Page() {
  const loginStatus = useLoginStatus();
  const [displayName, setDisplayName] = React.useState(
    loginStatus?.loggedIn ? loginStatus.displayName : ""
  );
  const router = useRouter();
  const [notificationApi, notificationContextHolder] = useNotification();
  return (
    <div>
      {notificationContextHolder}
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <h1>Edit Profile</h1>
        <div>Name:</div>
        <Input
          placeholder="Enter the name here.."
          style={{ marginTop: "4px" }}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Flex.Row justifyContent="center" paddingTop="20px">
          <Button
            type="primary"
            onClick={async () => {
              try {
                await httpPost$EditProfile(`/api/v1/me/edit`, { displayName });
                notificationApi.success({
                  message: "Profile edited successfully!"
                });
                router.push("/");
              } catch (error) {
                const displayableError = DisplayableError.from(error);
                notificationApi.error({
                  message: displayableError.title,
                  description: displayableError.description
                });
              }
            }}
          >
            Edit
          </Button>
        </Flex.Row>
      </main>
    </div>
  );
}
