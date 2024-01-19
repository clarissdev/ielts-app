import cx from "clsx";
import Link from "next/link";

import styles from "./index.module.scss";

import Flex from "@/modules/app-ui/components/Flex";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Navbar({ className, style }: Props) {
  return (
    <div style={style} className={cx(styles.container, className)}>
      <Flex.Row justifyContent="space-between" style={{ width: "100%" }}>
        <Flex.Row gap="20px" alignItems="center">
          <Link href="/" className={styles.logo}>
            <span className={styles.colorBlack}>{"The English "}</span>
            <span className={styles.colorPrimary}>{"Coach"}</span>
          </Link>
          <div className={styles.speaking}>SPEAKING</div>
        </Flex.Row>
      </Flex.Row>
    </div>
  );
}
