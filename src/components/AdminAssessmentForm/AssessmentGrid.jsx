import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { columns } from "./columns";
import { api } from "./api";
import "./assessmentGrid.css";

export default function AssessmentGrid({ form, rows, setRows }) {
  const isEditable = form.status === "draft";

  const addRow = async () => {
    const newRow = await api.createFormRow(form.id);
    setRows((prev) => [...prev, newRow]);
  };

  return (
    <>
      {isEditable && (
        <Button variant="contained" onClick={addRow} sx={{ mb: 2 }}>
          ➕ Add Row
        </Button>
      )}

      <div style={{ minHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns(isEditable)}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          processRowUpdate={async (newRow, oldRow) => {
            if (!isEditable) return oldRow;

            setRows((prev) =>
              prev.map((r) => (r.id === newRow.id ? newRow : r))
            );

            await api.updateFormRow(form.id, newRow.id, {
              byblosSemester: newRow.byblosSemester,
              byblosInstructor: newRow.byblosInstructor,
              byblosReceived: newRow.byblosReceived,
              beirutSemester: newRow.beirutSemester,
              beirutInstructor: newRow.beirutInstructor,
              beirutReceived: newRow.beirutReceived,
            });

            return newRow;
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </>
  );
}
