import Recorder from "../components/Recorder";
import { useParams } from "react-router-dom";
import {
  Stack,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  Fade,
  Zoom,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";

type RecordingState =
  | "idle"
  | "recording"
  | "stopped"
  | "uploading"
  | "uploaded"
  | "error";

export default function InviteRecord() {
  const { id } = useParams<{ id: string }>();
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // Validate invite ID
  if (!id) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Invalid Invite
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="error">
              No invite ID provided. Please check your invite link.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    );
  }

  async function handleStop(blob: Blob) {
    setRecordedBlob(blob);
    setRecordingState("stopped");
  }

  async function handleUpload() {
    if (!recordedBlob) {
      setUploadError("No video recorded to upload");
      setRecordingState("error");
      return;
    }

    if (!id) {
      setUploadError("Invalid invite ID");
      setRecordingState("error");
      return;
    }

    setRecordingState("uploading");
    setUploadError(null);

    try {
      const form = new FormData();
      form.append("file", recordedBlob, `${id}.webm`);

      const response = await fetch(`http://localhost:8000/upload/${id}`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch(() => response.statusText);
        throw new Error(`Upload failed: ${errorText || response.statusText}`);
      }

      setRecordingState("uploaded");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(
        error instanceof Error
          ? error.message
          : "Upload failed. Please check your connection and try again."
      );
      setRecordingState("error");
    }
  }

  function handleRedo() {
    setRecordingState("idle");
    setRecordedBlob(null);
    setUploadError(null);
  }

  function handleStartRecording() {
    setRecordingState("recording");
    setUploadError(null);
    setRecordedBlob(null);
  }

  const getStatusMessage = () => {
    switch (recordingState) {
      case "idle":
        return "Click 'Start Recording' to begin your video response";
      case "recording":
        return "Recording in progress... Speak clearly and look at the camera";
      case "stopped":
        return "Recording completed! You can upload this video or record again";
      case "uploading":
        return "Uploading your video... Please wait";
      case "uploaded":
        return "Video uploaded successfully! You can record another video if needed";
      case "error":
        return "An error occurred. Please try recording again";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (recordingState) {
      case "idle":
        return "text.secondary";
      case "recording":
        return "error.main";
      case "stopped":
        return "success.main";
      case "uploading":
        return "info.main";
      case "uploaded":
        return "success.main";
      case "error":
        return "error.main";
      default:
        return "text.secondary";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
      <Stack spacing={4} sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
        {/* Header Section */}
        <Fade in timeout={600}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Video Interview
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Invite ID: {id}
            </Typography>
            <Chip
              label="Live Recording Session"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Fade>

        {/* Main Recording Card */}
        <Fade in timeout={800}>
          <Card
            elevation={8}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid rgba(25, 118, 210, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Record Your Video Response
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: "auto" }}
                >
                  Please record a short video (maximum 2 minutes) answering the
                  interview question. Make sure you have good lighting and speak
                  clearly.
                </Typography>
              </Box>

              {/* Status Message */}
              <Zoom in timeout={400}>
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    background:
                      recordingState === "recording"
                        ? "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)"
                        : recordingState === "uploaded"
                        ? "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)"
                        : recordingState === "error"
                        ? "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)"
                        : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    border: `2px solid ${
                      recordingState === "recording"
                        ? "#f44336"
                        : recordingState === "uploaded"
                        ? "#4caf50"
                        : recordingState === "error"
                        ? "#f44336"
                        : "#2196f3"
                    }`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {recordingState === "recording" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background:
                          "linear-gradient(90deg, #f44336, #ff9800, #f44336)",
                        backgroundSize: "200% 100%",
                        animation: "pulse 2s ease-in-out infinite",
                        "@keyframes pulse": {
                          "0%": { backgroundPosition: "200% 0" },
                          "100%": { backgroundPosition: "-200% 0" },
                        },
                      }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    color={getStatusColor()}
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {recordingState === "recording" && "🔴"}
                    {recordingState === "uploaded" && "✅"}
                    {recordingState === "error" && "❌"}
                    {recordingState === "uploading" && "⏳"}
                    {getStatusMessage()}
                  </Typography>
                </Box>
              </Zoom>

              {/* Recording Component */}
              {recordingState !== "uploaded" && (
                <Recorder
                  key={`recorder-${recordingState}-${
                    recordedBlob ? "has-blob" : "no-blob"
                  }`}
                  onStop={handleStop}
                  onStart={handleStartRecording}
                  maxSeconds={120}
                  disabled={recordingState === "uploading"}
                />
              )}

              {/* Action Buttons */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {recordingState === "stopped" && (
                  <>
                    <Zoom in timeout={600}>
                      <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={!recordedBlob}
                        size="large"
                        sx={{
                          minWidth: 160,
                          height: 56,
                          borderRadius: 3,
                          background:
                            "linear-gradient(45deg, #4caf50, #66bb6a)",
                          boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #388e3c, #4caf50)",
                            boxShadow: "0 6px 25px rgba(76, 175, 80, 0.4)",
                            transform: "translateY(-2px)",
                          },
                          "&:disabled": {
                            background: "grey.300",
                            boxShadow: "none",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        📤 Upload Video
                      </Button>
                    </Zoom>
                    <Zoom in timeout={800}>
                      <Button
                        variant="outlined"
                        onClick={handleRedo}
                        size="large"
                        sx={{
                          minWidth: 160,
                          height: 56,
                          borderRadius: 3,
                          borderColor: "primary.main",
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                            background: "primary.50",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        🔄 Record Again
                      </Button>
                    </Zoom>
                  </>
                )}

                {recordingState === "uploaded" && (
                  <>
                    <Zoom in timeout={600}>
                      <Button
                        variant="outlined"
                        onClick={handleRedo}
                        size="large"
                        sx={{
                          minWidth: 160,
                          height: 56,
                          borderRadius: 3,
                          borderColor: "primary.main",
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                            background: "primary.50",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        🎬 Record New Video
                      </Button>
                    </Zoom>
                    <Zoom in timeout={800}>
                      <Button
                        variant="contained"
                        disabled
                        size="large"
                        sx={{
                          minWidth: 160,
                          height: 56,
                          borderRadius: 3,
                          background:
                            "linear-gradient(45deg, #4caf50, #66bb6a)",
                          boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
                        }}
                      >
                        ✅ Video Submitted
                      </Button>
                    </Zoom>
                  </>
                )}

                {recordingState === "error" && (
                  <Zoom in timeout={600}>
                    <Button
                      variant="contained"
                      onClick={handleRedo}
                      size="large"
                      sx={{
                        minWidth: 160,
                        height: 56,
                        borderRadius: 3,
                        background: "linear-gradient(45deg, #f44336, #ef5350)",
                        boxShadow: "0 4px 20px rgba(244, 67, 54, 0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #d32f2f, #f44336)",
                          boxShadow: "0 6px 25px rgba(244, 67, 54, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      🔄 Try Again
                    </Button>
                  </Zoom>
                )}

                {recordingState === "idle" && (
                  <Fade in timeout={1000}>
                    <Box sx={{ textAlign: "center", py: 2 }}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Use the recording controls above to start your video
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Make sure your camera and microphone are working
                        properly
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </Box>

              {/* Upload Progress */}
              {recordingState === "uploading" && (
                <Zoom in timeout={400}>
                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        mb: 2,
                      }}
                    >
                      <CircularProgress
                        size={60}
                        thickness={4}
                        sx={{
                          color: "primary.main",
                          "& .MuiCircularProgress-circle": {
                            strokeLinecap: "round",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="primary.main"
                          sx={{ fontWeight: 600 }}
                        >
                          ⏳
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Uploading your video...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Please wait while we process your submission
                    </Typography>
                    <LinearProgress
                      sx={{
                        mt: 2,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          background:
                            "linear-gradient(45deg, #2196f3, #42a5f5)",
                        },
                      }}
                    />
                  </Box>
                </Zoom>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Success Message */}
        {recordingState === "uploaded" && (
          <Zoom in timeout={600}>
            <Card
              elevation={12}
              sx={{
                background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                border: "2px solid #4caf50",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(90deg, #4caf50, #66bb6a, #4caf50)",
                  backgroundSize: "200% 100%",
                  animation: "successPulse 2s ease-in-out infinite",
                  "@keyframes successPulse": {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                  },
                }}
              />
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 2, color: "#2e7d32" }}
                >
                  🎉 Video Submitted Successfully!
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, color: "#388e3c" }}>
                  Thank you for your video submission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#2e7d32", maxWidth: 500, mx: "auto" }}
                >
                  The recruiter will review your response shortly. You can
                  record additional videos if needed.
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        )}

        {/* Error Snackbar */}
        <Snackbar
          open={!!uploadError}
          autoHideDuration={6000}
          onClose={() => setUploadError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setUploadError(null)}
            severity="error"
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(244, 67, 54, 0.3)",
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {uploadError}
            </Typography>
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
