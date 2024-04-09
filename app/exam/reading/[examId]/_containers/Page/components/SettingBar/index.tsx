import { Button } from "antd";
import useNotification from "antd/es/notification/useNotification";
import cx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

import ModalSetting from "./containers/ModalSetting";
import styles from "./index.module.scss";

import CountdownTimer from "@/modules/app-components/CountdownTimer";
import {
  colorState,
  fontSizeState
} from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { httpPost$SubmitReading } from "@/modules/commands/SubmitReading/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { EM_DASH } from "@/modules/common-utils/unicode";
import { DisplayableError } from "@/modules/error";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  answer: string[];
  examId: string;
  buttonSubmitRef: React.RefObject<HTMLButtonElement>;
  duration: number;

  onChangeHideScreen: (value: boolean) => void;
};

export default function SettingBar({
  className,
  style,
  answer,
  examId,
  buttonSubmitRef,
  duration,

  onChangeHideScreen
}: Props) {
  const router = useRouter();
  const [showModalSetting, setShowModalSetting] = React.useState(false);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [color, setColor] = useRecoilState(colorState);
  const loginStatus = useLoginStatus();
  const [notificationApi, notificationContextHolder] = useNotification();

  const handleSubmit = async () => {
    try {
      await httpPost$SubmitReading("/api/v1/submit/reading", {
        examId,
        answer
      });
      router.push(`/test`);
      notificationApi.success({ message: "Submit exam successfully!" });
    } catch (error) {
      const displayableError = DisplayableError.from(error);
      notificationApi.error({
        message: displayableError.title,
        description: displayableError.description
      });
    }
  };

  return (
    <div className={cx(styles.container, className)} style={style}>
      {notificationContextHolder}
      <Flex.Row
        padding="4px 20px"
        justifyContent="space-between"
        gap="12px"
        alignItems="center"
      >
        <div>{loginStatus?.loggedIn ? loginStatus.displayName : EM_DASH}</div>
        <div className={styles.countdownTimer}>
          <CountdownTimer
            className={styles.countdownTimer}
            duration={duration}
            unstyled
            as="span"
          />
        </div>
        <Flex.Row gap="4px">
          {/* {loginStatus?.loggedIn && loginStatus.isAgent ? ( */}
          <Button ref={buttonSubmitRef} onClick={handleSubmit}>
            Submit
          </Button>
          {/* ) : undefined} */}
          <Button
            onClick={() => {
              setShowModalSetting(true);
            }}
          >
            Settings
          </Button>
          <Button onClick={() => onChangeHideScreen(true)}>Hide</Button>
        </Flex.Row>
      </Flex.Row>
      <ModalSetting
        open={showModalSetting}
        onCancel={() => setShowModalSetting(false)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        color={color}
        onChangeColor={setColor}
      />
    </div>
  );
}
