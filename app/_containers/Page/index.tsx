"use client";

import { Button } from "antd";
import Image from "next/image";

import banner from "./assets/banner.png";
import bichPhuongFigure from "./assets/bich-phuong.png";
import chiThanhFigure from "./assets/chi-thanh.png";
import trungDucFigure from "./assets/trung-duc.png";
import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";
import { useLoginStatus } from "@/modules/common-hooks/useLoginStatus";

export default function Route() {
  const loginStatus = useLoginStatus();
  console.log(loginStatus);
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Image src={banner} alt="banner" className={styles.banner} />
        <Flex.Row
          justifyContent="space-between"
          flexWrap="wrap"
          paddingTop="32px"
          className={styles.belowBanner}
        >
          <Flex.Row padding="40px" gap="12px">
            <Button
              type="primary"
              size="large"
              className={styles.buttonTest}
              href="/test"
            >
              Test ngay
            </Button>
            {loginStatus?.loggedIn && loginStatus.isAgent ? (
              <Button
                type="primary"
                size="large"
                className={styles.buttonTest}
                href="/admin"
              >
                Admin
              </Button>
            ) : undefined}
          </Flex.Row>
          <Flex.Row flexWrap="wrap" className={styles.belowBanner}>
            <div className={styles.figureContainer}>
              <div className={styles.backdrop}></div>
              <Image
                className={styles.figure}
                src={bichPhuongFigure}
                alt="bich phuong"
              />
              <div>{"Ms. Bích Phương"}</div>
              <div>{"8.5 Writing"}</div>
            </div>
            <div className={styles.figureContainer}>
              <div className={styles.backdrop}></div>
              <Image
                className={styles.figure}
                src={chiThanhFigure}
                alt="chi thanh"
              />
              <div>{"Mr. Chí Thành"}</div>
              <div>{"8.5 Writing"}</div>
            </div>
            <div className={styles.figureContainer}>
              <div className={styles.backdrop}></div>
              <Image
                className={styles.figure}
                src={trungDucFigure}
                alt="trung duc"
              />
              <div>{"Mr. Trung Đức"}</div>
              <div>{"8.5 Writing"}</div>
            </div>
          </Flex.Row>
        </Flex.Row>
      </main>
    </div>
  );
}
