import MuiLink from "@mui/material/Link";

export default function Link({ children, ...props }) {
  return <MuiLink {...props}>{children}</MuiLink>;
}
