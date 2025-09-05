import Recorder from "../components/Recorder";
import { useParams } from "react-router-dom";
import { Stack, Typography, Paper } from "@mui/material";

export default function InviteRecord() {
  const { id } = useParams<{ id: string }>();

  async function handleStop(blob: Blob) {
    const form = new FormData();
    form.append("file", blob, `${id}.webm`);
    await fetch(`http://localhost:8000/upload/${id}`, {
      method: "POST",
      body: form,
    });
    alert("Uploaded!");
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Invite: {id}</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Record your answer (max 2 min)
        </Typography>
        <Recorder onStop={handleStop} maxSeconds={120} />
      </Paper>
    </Stack>
  );
}
