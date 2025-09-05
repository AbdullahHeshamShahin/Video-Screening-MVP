import { useEffect, useRef, useState } from "react";
import {
  Stack,
  Button,
  LinearProgress,
  Typography,
  Paper,
} from "@mui/material";

export default function Recorder({
  onStop,
  maxSeconds = 120,
}: {
  onStop: (b: Blob) => void;
  maxSeconds?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let timer: number;
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current)
        videoRef.current.srcObject = stream as unknown as MediaStream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () =>
        onStop(new Blob(chunks, { type: "video/webm" }));
      setRecorder(mediaRecorder);
      timer = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    })();
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onStop]);

  useEffect(() => {
    if (elapsedSeconds >= maxSeconds && recorder?.state === "recording") {
      recorder.stop();
    }
  }, [elapsedSeconds, maxSeconds, recorder]);

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", display: "block" }}
        />
      </Paper>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          onClick={() => recorder?.start()}
          disabled={!recorder || recorder.state === "recording"}
        >
          Record
        </Button>
        <Button
          variant="outlined"
          onClick={() => recorder?.stop()}
          disabled={!recorder || recorder.state !== "recording"}
        >
          Stop
        </Button>
        <Typography variant="body2" color="text.secondary">
          {elapsedSeconds}s / {maxSeconds}s
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={Math.min(100, (elapsedSeconds / maxSeconds) * 100)}
      />
    </Stack>
  );
}
