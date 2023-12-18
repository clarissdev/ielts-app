import { FontSize } from "@/modules/app-ui/components/Editor/utils";
import Flex from "@/modules/app-ui/components/Flex";
import { Modal, Radio } from "antd";

type Props = {
  open: boolean;
  onCancel?: () => void;
  fontSize: FontSize;
  onChangeFontSize: (value: FontSize) => void;
};

export default function ModalSetting({
  open,
  onCancel,
  fontSize,
  onChangeFontSize,
}: Props) {
  return (
    <Modal title="Settings" open={open} onCancel={onCancel} footer={[]}>
      <div>
        {
          "If you wish, you can change these settings to make the test easier to read"
        }
      </div>
      <Flex.Row>
        <Flex.Col>
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
      </Flex.Row>
    </Modal>
  );
}
