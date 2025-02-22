"use client";

import { Dropdown } from "antd";
import cx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

import Flex from "@/modules/app-ui/components/Flex";
import { httpPost$Logout } from "@/modules/commands/Logout/fetcher";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Navbar({ className, style }: Props) {
  const loginStatus = useLoginStatus();
  const router = useRouter();
  const logout = async () => {
    await httpPost$Logout("/api/v1/auth/logout");
    await shamelesslyRevalidateEverything();
    router.refresh();
  };

  return (
    <div style={style} className={cx(styles.container, className)}>
      <Flex.Row justifyContent="space-between" style={{ width: "100%" }}>
        <Flex.Cell>
          <Link href="/" className={styles.logo}>
            <span className={styles.colorBlack}>{"The English "}</span>
            <span className={styles.colorPrimary}>{"Coach"}</span>
          </Link>
        </Flex.Cell>
        <Flex.Row gap="12px" alignItems="center">
          <Link href="/test" className={styles.link}>
            Test Ngay
          </Link>
          {loginStatus?.loggedIn ? (
            <Dropdown
              menu={{
                items: [{ key: "1", label: "Logout", onClick: logout }]
              }}
            >
              <Link
                className={styles.link}
                href=""
                onClick={(e) => e.preventDefault()}
              >
                {loginStatus.displayName}
              </Link>
            </Dropdown>
          ) : (
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          )}
        </Flex.Row>
      </Flex.Row>
    </div>
  );
}
