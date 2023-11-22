import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Navbar() {
  const items: MenuProps["items"] = [
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
          label: "Writing Listening Test",
        },
      ],
    },
  ];

  return <Menu items={items} mode="horizontal" />;
}
