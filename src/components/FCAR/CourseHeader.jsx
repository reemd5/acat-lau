import { Grid, Paper, TextField, Typography } from "@mui/material";

export default function CourseHeader({ courseInfo }) {
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
        sx={{ mb: 2 }}
      >
        Faculty Course Assessment Report (FCAR)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Course Code & Title"
            value={`${courseInfo.courseCode} – ${courseInfo.courseTitle}`}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Semester"
            value={courseInfo.semester}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Academic Year"
            value={courseInfo.academicYear}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
