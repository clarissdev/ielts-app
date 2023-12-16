import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import styles from "./index.module.scss";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";
import { httpPost$Logout } from "@/modules/commands/Logout/fetcher";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";
import cx from "clsx";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Navbar({ className, style }: Props) {
  const loginStatus = useLoginStatus();
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    await httpPost$Logout("/api/v1/auth/logout");
    await shamelesslyRevalidateEverything();
    router.refresh();
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
          label: <Link href="/library">Library</Link>,
        },
        ...(loginStatus?.loggedIn && loginStatus.isAgent
          ? [{ key: "admin", label: <Link href="/add-exam">Add Exam</Link> }]
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
