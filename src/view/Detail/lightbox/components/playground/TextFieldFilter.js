import TextField from "@mui/material/TextField";

import Filter from "./Filter";

export default function TextFieldFilter({
  label,
  helperText,
  error,
  value,
  onChange
}) {
  return (
    <Filter>
      <TextField
        fullWidth
        size="small"
        variant="standard"
        label={label}
        helperText={helperText}
        error={error}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Filter>
  );
}
