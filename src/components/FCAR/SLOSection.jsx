import { Typography, Box, Paper } from "@mui/material";
import PCDataGrid from "./PCDataGrid";

export default function SLOSection({ slo, pcs, submissionId }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        border: "2px solid black",
        p: 2,
        mb: 4,
      }}
    >
      <Typography
        align="center"
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        Student Learning Outcome ({slo.SLO_Code})
      </Typography>

      <Typography
        align="center"
        variant="body2"
        sx={{ mb: 2 }}
      >
        {slo.Description}
      </Typography>

      <PCDataGrid
        pcs={pcs}
        sloId={slo.SLO_ID}
        submissionId={submissionId}
      />
    </Paper>
  );
}
