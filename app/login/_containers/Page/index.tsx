"use client";
import { Button } from "antd";
import { Metadata } from "next";
import { FcGoogle } from "react-icons/fc";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import { useApiAuthentication } from "@/modules/authentication";

export const metadata: Metadata = {
  title: "Login"
};

export default function Page() {
  const { triggerGoogleAuthentication } = useApiAuthentication();
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.section}>
          <Button
            size="large"
            icon={<FcGoogle size="20px" />}
            className={styles.button}
            onClick={() => triggerGoogleAuthentication?.()}
          >
            Login with Google
          </Button>
        </section>
      </main>
    </div>
  );
}
