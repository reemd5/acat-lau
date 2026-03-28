import { useEffect, useState } from "react";
import AssessmentGrid from "./AssessmentGrid";
import { api } from "./api";

export default function AssessmentForm({ programId }) {
  const [form, setForm] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const formRes = await api.getLatestForm(programId);
      setForm(formRes);

      const rowsRes = await api.getFormRows(formRes.id);
      setRows(rowsRes);
    };

    load();
  }, [programId]);

  if (!form) return "Loading...";

  return (
    <AssessmentGrid
      form={form}
      rows={rows}
      setRows={setRows}
    />
  );
}
