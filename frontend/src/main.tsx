import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import App from "./App.tsx";
import { client } from "./apollo";
import { router } from "./routes";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4f46e5" },
    secondary: { main: "#14b8a6" },
    background: { default: "#f7f7fb", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { size: "medium" },
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiPaper: {
      defaultProps: { elevation: 1 },
      styleOverrides: { root: { borderRadius: 14 } },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App>
          <RouterProvider router={router} />
        </App>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
