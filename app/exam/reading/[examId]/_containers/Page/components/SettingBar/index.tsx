import { Button } from "antd";
import cx from "clsx";
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

type Props = {
  className?: string;
  style?: React.CSSProperties;
  duration: number;
  onSubmit: () => Promise<void>;

  onChangeHideScreen: (value: boolean) => void;
};

export default function SettingBar({
  className,
  style,
  duration,
  onSubmit,

  onChangeHideScreen
}: Props) {
  const [showModalSetting, setShowModalSetting] = React.useState(false);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const [color, setColor] = useRecoilState(colorState);
  return (
    <div className={cx(styles.container, className)} style={style}>
      <Flex.Row
        padding="4px 20px"
        justifyContent="space-between"
        gap="12px"
        alignItems="center"
      >
        <div>{"XXXX - XXX - 123456"}</div>
        <div className={styles.countdownTimer}>
          <CountdownTimer
            className={styles.countdownTimer}
            duration={duration}
            unstyled
            as="span"
          />
          <span>{" minutes left."}</span>
        </div>
        <Flex.Row gap="4px">
          <Button onClick={onSubmit}>Submit</Button>
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
