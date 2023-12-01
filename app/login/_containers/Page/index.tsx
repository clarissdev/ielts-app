"use client";
import styles from "./index.module.scss";
import Navbar from "@/modules/app-components/Navbar";
import { useApiAuthentication } from "@/modules/authentication";
import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";

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
