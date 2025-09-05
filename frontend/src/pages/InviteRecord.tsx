import Recorder from "../components/Recorder";
import { useParams } from "react-router-dom";
import {
  Stack,
  Typography,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

export default function InviteRecord() {
  const { id } = useParams<{ id: string }>();
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleStop(blob: Blob) {
    setUploading(true);
    setUploadError(null);

    try {
      const form = new FormData();
      form.append("file", blob, `${id}.webm`);

      const response = await fetch(`http://localhost:8000/upload/${id}`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      setUploadSuccess(true);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        Video Interview
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Invite ID: {id}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Record Your Video Response
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please record a short video (maximum 2 minutes) answering the
          interview question. Make sure you have good lighting and speak
          clearly.
        </Typography>

        {uploading && (
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Uploading your video...</Typography>
          </Stack>
        )}

        <Recorder onStop={handleStop} maxSeconds={120} />
      </Paper>

      <Snackbar
        open={uploadSuccess}
        autoHideDuration={6000}
        onClose={() => setUploadSuccess(false)}
      >
        <Alert onClose={() => setUploadSuccess(false)} severity="success">
          Video uploaded successfully! Thank you for your submission.
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!uploadError}
        autoHideDuration={6000}
        onClose={() => setUploadError(null)}
      >
        <Alert onClose={() => setUploadError(null)} severity="error">
          {uploadError}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
