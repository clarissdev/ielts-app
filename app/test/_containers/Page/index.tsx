"use client";

import { Button } from "antd";
import { FaHeadphones } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";

export default function Route() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Flex.Row padding="20px 56px" gap="12px" justifyContent="center">
          <Button
            type="primary"
            target="_blank"
            rel="noreferrer"
            size="large"
            href="/exam/listening/658f86ff578ef4f9988f2eef"
            icon={<FaHeadphones />}
          >
            Listening
          </Button>
          <Button
            type="primary"
            target="_blank"
            rel="noreferrer"
            size="large"
            href="/exam/reading/657bd98a5b375e28c31b3ba2"
            icon={<FaBookOpen />}
          >
            Reading
          </Button>
          <Button
            type="primary"
            target="_blank"
            rel="noreferrer"
            size="large"
            href="/exam/writing/658baf8b872548f88a2ca396"
            icon={<MdModeEdit />}
          >
            Writing
          </Button>
        </Flex.Row>
      </main>
    </div>
  );
}
