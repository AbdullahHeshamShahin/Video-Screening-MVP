import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="logo"
            sx={{ mr: 1 }}
          >
            <VideocamRoundedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Video Screening MVP
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
}
