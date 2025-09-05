import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Chip,
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { ADD_TAG, CREATE_INVITE, GET_VIDEO } from "../api/graphql";
import VideoPlayer from "../components/VideoPlayer";
import Tagger from "../components/Tagger";

type Video = { inviteId: string; url: string; tags: string[] };
type GetVideoResult = { video?: Video };

export default function Dashboard() {
  const [inviteId, setInviteId] = useState("demo-123");
  const { data, refetch } = useQuery<GetVideoResult>(GET_VIDEO, {
    variables: { id: inviteId },
  });
  const [createInvite] = useMutation(CREATE_INVITE);
  const [addTag] = useMutation(ADD_TAG);
  const [tag, setTag] = useState("");

  async function onCreate() {
    await createInvite({ variables: { id: inviteId } });
    await refetch();
  }

  async function onTag() {
    if (!tag) {
      return;
    }
    await addTag({ variables: { id: inviteId, tag } });
    setTag("");
    await refetch();
  }
  async function onQuickTag(tg: string) {
    await addTag({ variables: { id: inviteId, tag: tg } });
    await refetch();
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const form = new FormData();
    form.append("file", file);
    await fetch(`http://localhost:8000/upload/${inviteId}`, {
      method: "POST",
      body: form,
    });
    await refetch();
  }

  const v = data?.video;
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Dashboard</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            label="Invite ID"
            value={inviteId}
            onChange={(e) => setInviteId(e.target.value)}
            sx={{ minWidth: { sm: 240 } }}
          />
          <Button variant="contained" onClick={onCreate}>
            Create Invite
          </Button>
          <Button
            href={`/invite/${inviteId}`}
            target="_blank"
            variant="outlined"
          >
            Open Invite Link
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="secondary" component="label">
            Upload Video
            <input hidden type="file" accept="video/*" onChange={onUpload} />
          </Button>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Box>
          <Paper sx={{ p: 2, minHeight: 200, display: "grid" }}>
            {v?.url ? (
              <VideoPlayer src={v.url} />
            ) : (
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  height: 240,
                  color: "text.secondary",
                }}
              >
                <Typography variant="body1">
                  Upload a video to preview it here
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Tags
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <TextField
                fullWidth
                size="small"
                label="Add tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <Button onClick={onTag} variant="contained">
                Add
              </Button>
            </Stack>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {(v?.tags ?? []).map((t: string) => (
                <Chip key={t} label={t} />
              ))}
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Quick tags
            </Typography>
            <Tagger onSelect={onQuickTag} />
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
}
