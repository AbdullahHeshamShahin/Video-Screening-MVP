import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Chip,
  Box,
  Typography,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { ADD_TAG, CREATE_INVITE, GET_VIDEO, REMOVE_TAG } from "../api/graphql";
import VideoPlayer from "../components/VideoPlayer";
import Tagger from "../components/Tagger";

type Video = { inviteId: string; url: string; tags: string[] };
type GetVideoResult = { video?: Video };

export default function Dashboard() {
  const [inviteId, setInviteId] = useState("demo-123");
  const { data, refetch, loading } = useQuery<GetVideoResult>(GET_VIDEO, {
    variables: { id: inviteId },
  });
  const [createInvite] = useMutation(CREATE_INVITE);
  const [addTag] = useMutation(ADD_TAG);
  const [removeTag] = useMutation(REMOVE_TAG);
  const [tag, setTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onCreate() {
    try {
      await createInvite({ variables: { id: inviteId } });
      setSuccessMessage("Invite created successfully!");
      await refetch();
    } catch {
      setErrorMessage("Failed to create invite. Please try again.");
    }
  }

  async function onTag() {
    if (!tag.trim()) {
      return;
    }
    try {
      await addTag({ variables: { id: inviteId, tag: tag.trim() } });
      setTag("");
      setSuccessMessage("Tag added successfully!");
      await refetch();
    } catch {
      setErrorMessage("Failed to add tag. Please try again.");
    }
  }

  async function onQuickTag(tg: string) {
    try {
      await addTag({ variables: { id: inviteId, tag: tg } });
      setSuccessMessage("Tag added successfully!");
      await refetch();
    } catch {
      setErrorMessage("Failed to add tag. Please try again.");
    }
  }

  async function onRemoveTag(tagToRemove: string) {
    try {
      await removeTag({ variables: { id: inviteId, tag: tagToRemove } });
      setSuccessMessage("Tag removed successfully!");
      await refetch();
    } catch {
      setErrorMessage("Failed to remove tag. Please try again.");
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setErrorMessage(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const response = await fetch(`http://localhost:8000/upload/${inviteId}`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      setSuccessMessage("Video uploaded successfully!");
      await refetch();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const v = data?.video;

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        Video Screening Dashboard
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Manage Invites
          </Typography>
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
              placeholder="Enter invite ID"
            />
            <Button
              variant="contained"
              onClick={onCreate}
              disabled={!inviteId.trim()}
            >
              Create Invite
            </Button>
            <Button
              href={`/invite/${inviteId}`}
              target="_blank"
              variant="outlined"
              disabled={!inviteId.trim()}
            >
              Open Invite Link
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              disabled={uploading}
            >
              {uploading ? <CircularProgress size={20} /> : "Upload Video"}
              <input hidden type="file" accept="video/*" onChange={onUpload} />
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Video Preview
              </Typography>
              {v?.url ? (
                <VideoPlayer src={v.url} />
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    height: 240,
                    color: "text.secondary",
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body1">No video uploaded yet</Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Candidate Classification
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <TextField
                  fullWidth
                  size="small"
                  label="Add custom tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && onTag()}
                />
                <Button
                  onClick={onTag}
                  variant="contained"
                  disabled={!tag.trim()}
                >
                  Add
                </Button>
              </Stack>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Current Tags:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {(v?.tags ?? []).length > 0 ? (
                    (v?.tags ?? []).map((t: string) => (
                      <Chip
                        key={t}
                        label={t}
                        color="primary"
                        onDelete={() => onRemoveTag(t)}
                        deleteIcon={<span style={{ fontSize: "16px" }}>×</span>}
                        sx={{
                          "& .MuiChip-deleteIcon": {
                            fontSize: "18px",
                            "&:hover": {
                              color: "error.main",
                            },
                          },
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No tags added yet
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Quick Tags:
              </Typography>
              <Tagger onSelect={onQuickTag} />
            </CardContent>
          </Card>
        </Box>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
