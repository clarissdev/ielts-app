import React from "react";
import cx from "clsx";
import styles from "./index.module.scss";
import CountdownTimer from "@/modules/app-components/CountdownTimer";
import { Button } from "antd";
import Flex from "@/modules/app-ui/components/Flex";
import ModalSetting from "./containers/ModalSetting";
import {
  FontSize,
  colorState,
  fontSizeState,
} from "@/modules/app-ui/components/Editor/utils";
import { useRecoilState } from "recoil";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  duration: number;
};

export default function SettingBar({ className, style, duration }: Props) {
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
            start={true}
          />
          <span>{" minutes left."}</span>
        </div>
        <Flex.Row gap="4px">
          <Button
            onClick={() => {
              setShowModalSetting(true);
            }}
          >
            Settings
          </Button>
          <Button onClick={() => alert("Coming soon!")}>Hide</Button>
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
