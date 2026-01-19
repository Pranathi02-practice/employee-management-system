import React from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";

function ColumnFilterPopup({
  options = [],
  selectedValues = [],
  onToggleValue,
  onClear,
}) {
  return (
    <Box sx={{ p: 1.5, width: 200 }}>
      <Box sx={{ maxHeight: 180, overflowY: "auto" }}>
        {options.map((opt) => (
          <Box key={opt} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              size="small"
              checked={selectedValues.includes(opt)}
              onChange={() => onToggleValue(opt)}
            />
            <Typography variant="body2">{opt}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
        <Button size="small" onClick={onClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}

export default ColumnFilterPopup;
