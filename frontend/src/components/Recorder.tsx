import { useEffect, useRef, useState } from "react";
import {
  Stack,
  Button,
  LinearProgress,
  Typography,
  Paper,
  Box,
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
      <Paper
        variant="outlined"
        sx={{ overflow: "hidden", position: "relative" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", display: "block" }}
        />
        {recorder?.state === "recording" && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "error.main",
              color: "white",
              px: 2,
              py: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "white",
                borderRadius: "50%",
                animation: "pulse 1s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              RECORDING
            </Typography>
          </Box>
        )}
      </Paper>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={() => recorder?.start()}
          disabled={!recorder || recorder.state === "recording"}
          size="large"
          sx={{ minWidth: 120 }}
        >
          {recorder?.state === "recording" ? "Recording..." : "Start Recording"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => recorder?.stop()}
          disabled={!recorder || recorder.state !== "recording"}
          size="large"
          sx={{ minWidth: 120 }}
        >
          Stop Recording
        </Button>
      </Stack>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          color={elapsedSeconds >= maxSeconds ? "error.main" : "text.primary"}
        >
          {elapsedSeconds}s / {maxSeconds}s
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, (elapsedSeconds / maxSeconds) * 100)}
          sx={{
            mt: 1,
            height: 8,
            borderRadius: 4,
            bgcolor: "grey.200",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              bgcolor:
                elapsedSeconds >= maxSeconds ? "error.main" : "primary.main",
            },
          }}
        />
        {elapsedSeconds >= maxSeconds && (
          <Typography
            variant="caption"
            color="error.main"
            sx={{ mt: 1, display: "block" }}
          >
            Maximum recording time reached
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
