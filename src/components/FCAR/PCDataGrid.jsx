import { DataGrid } from "@mui/x-data-grid";
import { saveValue } from "../../api/submissions";
import { Box, Typography } from "@mui/material";

export default function PCDataGrid({ pcs, sloId, submissionId }) {
  const rows = pcs.map((pc, index) => ({
    id: index,
    pc,
  }));

  const columns = [
    {
      field: "pc",
      headerName: "Performance Criteria",
      width: 320,
      editable: false,
    },
    {
      field: "method",
      headerName: "Assessment Method",
      width: 200,
      editable: true,
    },
    {
      field: "avg",
      headerName: "Average Score",
      width: 140,
      type: "number",
      editable: true,
    },
    {
      field: "percent",
      headerName: "% Meeting Standard",
      width: 180,
      type: "number",
      editable: true,
    },
    {
      field: "standard",
      headerName: "Performance Standard Used",
      width: 220,
      editable: false,
      valueGetter: () => "≥ 70%",
    },
  ];

  const handleEdit = (params) => {
    saveValue(submissionId, {
      slo_id: sloId,
      field_key: `${params.field}_pc_${params.id}`,
      value_numeric: params.value,
    });
  };

  return (
    <Box>
      {/* Fake Rowspan Header */}
      <Box
        sx={{
          border: "2px solid black",
          borderBottom: "none",
          p: 1,
        }}
      >
        <Typography fontWeight="bold">
          Outcome Assessed: {`SLO ${sloId}`}
        </Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        onCellEditStop={handleEdit}
        sx={{
          border: "2px solid black",
          borderTop: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderBottom: "2px solid black",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
    </Box>
  );
}
