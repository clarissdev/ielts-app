import { Button } from "antd";
import useNotification from "antd/es/notification/useNotification";
import React from "react";

import { DisplayableError } from "@/modules/error";
import Flex from "@/modules/app-ui/components/Flex";

type Props = {
  className?: string;
  style?: React.CSSProperties;

  onStop?: (blob: Blob) => Promise<void>;

  mediaRecorder: React.MutableRefObject<MediaRecorder | null>;
};

export default function AudioRecorder({
  className,
  style,
  onStop,
  mediaRecorder
}: Props) {
  const [permission, setPermission] = React.useState(false);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [notificationApi, notificationContextHolder] = useNotification();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasCtx = canvasRef.current?.getContext("2d");

  const visualize = (stream: MediaStream) => {
    const audioCtx = new AudioContext();

    const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvasCtx) return;

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

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
    const media = new MediaRecorder(stream);
    visualize(stream);

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
      ) : (
        <Flex.Row gap="8px" justifyContent="center">
          <Button
            type="primary"
            onClick={startRecording}
            disabled={mediaRecorder.current?.state === "recording"}
          >
            Start Recording
          </Button>
          <Button
            onClick={stopRecording}
            disabled={
              mediaRecorder.current?.state === "inactive" ||
              mediaRecorder.current == null
            }
          >
            Stop Recording
          </Button>
        </Flex.Row>
      )}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ height: "60px", width: "300px" }}
        ></canvas>
      </div>
    </div>
  );
}
