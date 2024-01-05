import { Metadata } from "next";
import Image from "next/image";

import figure1 from "./assets/1. TITLE.png";
import figure2 from "./assets/2. Hệ thống khóa học.png";
import figure11 from "./assets/3. Master Trainers.png";
import figure12 from "./assets/4. Giảng viên.png";
import figure13 from "./assets/4a Giảng viên_.png";
import figure14 from "./assets/5. Trợ giảng.png";
import figure15 from "./assets/5a Trợ giảng.png";
import figure16 from "./assets/6. Quyền lợi học viên.png";
import figure17 from "./assets/7. Bộ trợ cùng trợ giảng.png";
import figure18 from "./assets/8. Contact.png";
import figure9 from "./assets/Advanced Speaking.png";
import figure10 from "./assets/Advanced Writing.png";
import figure3 from "./assets/Foundation 1.png";
import figure4 from "./assets/Foundation 2.png";
import figure5 from "./assets/Level A.png";
import figure6 from "./assets/Level B.png";
import figure7 from "./assets/Level C.png";
import figure8 from "./assets/Level D.png";
import styles from "./page.module.scss";

import Navbar from "@/modules/app-components/Navbar";

export const metadata: Metadata = {
  title: "TEC - Courses"
};

export default function Page() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Image src={figure1} alt="" priority className={styles.figure} />
        <Image src={figure2} alt="" priority className={styles.figure} />
        <Image src={figure3} alt="" priority className={styles.figure} />
        <Image src={figure4} alt="" priority className={styles.figure} />
        <Image src={figure5} alt="" priority className={styles.figure} />
        <Image src={figure6} alt="" priority className={styles.figure} />
        <Image src={figure7} alt="" priority className={styles.figure} />
        <Image src={figure8} alt="" priority className={styles.figure} />
        <Image src={figure9} alt="" priority className={styles.figure} />
        <Image src={figure10} alt="" priority className={styles.figure} />
        <Image src={figure11} alt="" priority className={styles.figure} />
        <Image src={figure12} alt="" priority className={styles.figure} />
        <Image src={figure13} alt="" priority className={styles.figure} />
        <Image src={figure14} alt="" priority className={styles.figure} />
        <Image src={figure15} alt="" priority className={styles.figure} />
        <Image src={figure16} alt="" priority className={styles.figure} />
        <Image src={figure17} alt="" priority className={styles.figure} />
        <Image src={figure18} alt="" priority className={styles.figure} />
      </main>
    </div>
  );
}
