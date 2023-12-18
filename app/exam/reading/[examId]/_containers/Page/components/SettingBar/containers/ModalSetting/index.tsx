import { Color, FontSize } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { Modal, Radio } from "antd";

type Props = {
  open: boolean;
  onCancel?: () => void;
  fontSize: FontSize;
  onChangeFontSize: (value: FontSize) => void;
  color: Color;
  onChangeColor: (value: Color) => void;
};

export default function ModalSetting({
  open,
  onCancel,
  fontSize,
  onChangeFontSize,
  color,
  onChangeColor,
}: Props) {
  return (
    <Modal title="Settings" open={open} onCancel={onCancel} footer={[]}>
      <div>
        {
          "If you wish, you can change these settings to make the test easier to read"
        }
      </div>
      <Flex.Row justifyContent="space-around">
        <Flex.Col>
          <b>Font size</b>
          <Radio.Group
            onChange={(e) => onChangeFontSize(e.target.value)}
            value={fontSize}
          >
            <Flex.Col>
              <Radio value="standard">Standard</Radio>
              <Radio value="large">Large</Radio>
              <Radio value="extra-large">Extra Large</Radio>
            </Flex.Col>
          </Radio.Group>
        </Flex.Col>
        <Flex.Col>
          <b>Color</b>
          <Radio.Group
            value={color}
            onChange={(e) => onChangeColor(e.target.value)}
          >
            <Flex.Col>
              <Radio value="standard">Standard</Radio>
              <Radio value="blue">Blue</Radio>
            </Flex.Col>
          </Radio.Group>
        </Flex.Col>
      </Flex.Row>
    </Modal>
  );
}
