import { Button } from "antd";

import styles from "./index.module.scss";

import Navbar from "@/modules/app-components/Navbar";
import Flex from "@/modules/app-ui/components/Flex";

export default function Page() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Flex.Row gap="12px">
          <Button className={styles.grade} href="/admin/grade-writing">
            Grade Writing Exam
          </Button>
          {/* <Button className={styles.view} href="/admin/view-submission">
            View Sheet
          </Button> */}
        </Flex.Row>
      </main>
    </div>
  );
}
