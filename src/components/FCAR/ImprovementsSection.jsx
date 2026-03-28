import { Paper, Typography, TextField } from "@mui/material";
import { saveValue } from "../../api/submissions";

export default function ImprovementsSection({ submissionId }) {
  const handleBlur = (e) => {
    saveValue(submissionId, {
      field_key: "course_improvements",
      value_text: e.target.value,
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ border: "2px solid black", p: 2, mb: 4 }}
    >
      <Typography fontWeight="bold" mb={1}>
        Course Improvement Actions
      </Typography>

      <TextField
        multiline
        minRows={5}
        fullWidth
        onBlur={handleBlur}
      />
    </Paper>
  );
}
