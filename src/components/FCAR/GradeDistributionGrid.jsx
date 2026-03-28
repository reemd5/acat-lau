import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import { saveValue } from "../../api/submissions";

const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", "W", "I", "Total"];

const columns = grades.map(g => ({
  field: g,
  headerName: g,
  width: 80,
  editable: true,
}));

export default function GradeDistributionGrid({ submissionId }) {
  const handleEdit = (params) => {
    saveValue(submissionId, {
      field_key: `grade_${params.field}`,
      value_numeric: params.value,
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ border: "2px solid black", p: 2, mb: 4 }}
    >
      <Typography align="center" fontWeight="bold" mb={2}>
        Final Course Grade Distribution
      </Typography>

      <DataGrid
        rows={[{ id: 1 }]}
        columns={columns}
        hideFooter
        disableColumnMenu
        autoHeight
        onCellEditStop={handleEdit}
        sx={{
          border: "2px solid black",
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid black",
            fontWeight: "bold",
          },
        }}
      />
    </Paper>
  );
}
