"use client";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";

import AudioRecorder from "./containers/AudioRecorder";
import styles from "./index.module.scss";

export default function Page() {
  const [audio, setAudio] = React.useState("");
  const searchParams = useSearchParams();
  const mediaRecorder = React.useRef<MediaRecorder | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>IELTS Speaking Test</h1>
      <h2>Microphone check</h2>
      <div>
        Make sure your microphone work well before taking the test. Please click
        on the button to record yourself and listen again.
      </div>
      <AudioRecorder
        style={{ marginTop: "20px" }}
        onStop={async (blob) => {
          const url = URL.createObjectURL(blob);
          setAudio(url);
        }}
        mediaRecorder={mediaRecorder}
      />
      <div style={{ marginTop: "20px" }}>
        {audio ? <audio src={audio} controls></audio> : undefined}
      </div>
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        href={searchParams.get("redirectUrl") || "/"}
      >
        Start the Test
      </Button>
    </div>
  );
}
