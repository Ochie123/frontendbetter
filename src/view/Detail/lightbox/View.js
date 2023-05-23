import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import theme from "./styles/theme";

function View() {
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
}

export default View;