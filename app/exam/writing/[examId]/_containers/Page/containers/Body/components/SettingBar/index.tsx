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
import { httpPost$SubmitWriting } from "@/modules/commands/SubmitWriting/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { EM_DASH } from "@/modules/common-utils/unicode";

const NUM_MILLISECONDS_PER_HOURS = 3600000;

type Props = {
  className?: string;
  style?: React.CSSProperties;
  answer: string[];
  examId: string;

  onChangeHideScreen: (value: boolean) => void;
};

export default function SettingBar({
  className,
  style,
  answer,
  examId,

  onChangeHideScreen
}: Props) {
  const router = useRouter();
  const [showModalSetting, setShowModalSetting] = React.useState(false);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [color, setColor] = useRecoilState(colorState);
  const loginStatus = useLoginStatus();
  const [notificationApi, notificationContextHolder] = useNotification();
  const buttonRef = React.useRef<HTMLButtonElement>();

  const handleSubmit = async () => {
    try {
      const { submissionId } = await httpPost$SubmitWriting(
        "/api/v1/submit/writing",
        {
          examId,
          answer
        }
      );
      notificationApi.success({ message: "Exam submitted successfully!" });
      router.push(`/submission/writing/${submissionId}`);
    } catch (error) {
      notificationApi.error({
        message: "Error",
        description: "An error has occured, please try again!"
      });
      router.push("/library");
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(
      () => buttonRef.current?.click(),
      NUM_MILLISECONDS_PER_HOURS
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NUM_MILLISECONDS_PER_HOURS]);

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
            duration={NUM_MILLISECONDS_PER_HOURS}
            unstyled
            as="span"
          />
        </div>
        <Flex.Row gap="4px">
          {/* {loginStatus?.loggedIn && loginStatus.isAgent ? ( */}
          <Button onClick={handleSubmit}>Submit</Button>
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
