import { Button } from "antd";
import useNotification from "antd/es/notification/useNotification";
import React from "react";

import { DisplayableError } from "@/modules/error";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  onStop?: (blob: Blob) => Promise<void>;
};

export default function AudioRecorder({ className, style, onStop }: Props) {
  const [permission, setPermission] = React.useState(false);

  const mediaRecorder = React.useRef<MediaRecorder | null>(null);

  const [recordingStatus, setRecordingStatus] = React.useState("inactive");

  const [stream, setStream] = React.useState<MediaStream | null>(null);

  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);

  const [notificationApi, notificationContextHolder] = useNotification();

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (error) {
        const displayableError = DisplayableError.from(error);
        notificationApi.error({
          message: displayableError.title,
          description: displayableError.description
        });
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (!stream) return;
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream);

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    setRecordingStatus("inactive");
    mediaRecorder.current?.stop();

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      await onStop?.(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className={className} style={style}>
      {notificationContextHolder}
      {!permission ? (
        <Button onClick={getMicrophonePermission}>Get Microphone</Button>
      ) : null}
      {permission && recordingStatus === "inactive" ? (
        <Button onClick={startRecording}>Start Recording</Button>
      ) : null}
      {recordingStatus === "recording" ? (
        <Button onClick={stopRecording}>Stop Recording</Button>
      ) : null}
    </div>
  );
}
