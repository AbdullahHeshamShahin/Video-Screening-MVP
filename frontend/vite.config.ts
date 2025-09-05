import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true,
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@apollo/client",
      "graphql",
      "rxjs",
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
  server: {
    fs: { strict: false },
  },
});
