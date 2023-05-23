
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import App from "../../../src/view/Detail/lightbox/View"
import theme from "../../../src/view/Detail/lightbox/styles/theme"

function View() {
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
}

export default View;