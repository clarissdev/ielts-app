import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import styles from "./index.module.scss";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { httpPost$Logout } from "@/modules/commands/Logout/fetcher";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";
import cx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Navbar({ className, style }: Props) {
  const loginStatus = useLoginStatus();
  const pathname = usePathname();
  const logout = async () => {
    await httpPost$Logout("/api/v1/auth/logout");
    await shamelesslyRevalidateEverything();
  };
  const items: MenuProps["items"] = [
    {
      key: "group",
      type: "group",
      children: [
        {
          key: "home",
          label: <Link href="/">Home</Link>,
          icon: <FaHome />,
        },
        {
          key: "library",
          label: "Test library",
          children: [
            {
              key: "listening",
              label: "IELTS Listening Test",
            },
            {
              key: "reading",
              label: "IELTS Reading Test",
            },
            {
              key: "writing",
              label: "IELTS Writing Test",
            },
            {
              key: "speaking",
              label: "IELTS Speaking Test",
            },
          ],
        },
        ...(loginStatus?.loggedIn && loginStatus.isAgent
          ? [{ key: "admin", label: <Link href="/admin">Admin</Link> }]
          : []),
      ],
    },
    !loginStatus?.loggedIn
      ? {
          key: "right",
          label: (
            <Link
              style={{ float: "right" }}
              href={`/login?${new URLSearchParams({ redirectUrl: pathname })}`}
            >
              Login
            </Link>
          ),
        }
      : {
          key: "right",
          label: loginStatus.displayName,
          children: [{ key: "logout", label: "Logout" }],
          onClick: logout,
        },
  ];

  return (
    <Menu
      className={cx(styles.menu, className)}
      items={items}
      mode="horizontal"
    />
  );
}
