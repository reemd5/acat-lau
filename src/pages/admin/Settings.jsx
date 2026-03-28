import React, { useMemo, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { saveCurrentSettings } from "../../api/settings";
import { useSettings } from "../../context/SettingsContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { showSnackbar } from "../../utils/snackbar";
import { useNavigate } from "react-router-dom";

const isSettingsComplete = (settings) => {
  if (!settings) return false;

  return Boolean(
    settings.current_semester &&
    settings.academic_year &&
    [1, 2, 3].includes(Number(settings.year_number)) &&
    settings.semester_start_date &&
    settings.semester_end_date
  );
};

const isSemesterEnded = (settings) => {
  if (!settings?.semester_end_date) return false;

  const semesterEnd = new Date(`${settings.semester_end_date}T23:59:59`);
  return !Number.isNaN(semesterEnd.getTime()) && new Date() > semesterEnd;
};

export default function Settings() {
  const navigate = useNavigate();
  const { settings, setSettings } = useSettings();
  const [formData, setFormData] = useState(() => ({
    id: settings?.id ?? 1,
    current_semester: settings?.current_semester ?? "",
    academic_year: settings?.academic_year ?? "",
    year_number: settings?.year_number ? String(settings.year_number) : "",
    semester_start_date: settings?.semester_start_date ?? "",
    semester_end_date: settings?.semester_end_date ?? "",
  }));
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const configured = useMemo(() => isSettingsComplete(settings), [settings]);
  const semesterEnded = useMemo(() => isSemesterEnded(settings), [settings]);
  const readOnly = configured;

  const handleChange = (field, value) => {
    if (readOnly) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (
      !formData.current_semester ||
      !formData.academic_year ||
      !formData.year_number ||
      !formData.semester_start_date ||
      !formData.semester_end_date
    ) {
      showSnackbar(setSnackbar, "Please fill in all settings fields.", "error");
      return;
    }

    if (!["1", "2", "3"].includes(formData.year_number)) {
      showSnackbar(setSnackbar, "Year number must be 1, 2, or 3.", "error");
      return;
    }

    if (new Date(formData.semester_start_date) > new Date(formData.semester_end_date)) {
      showSnackbar(setSnackbar, "Semester start date must be before semester end date.", "error");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...settings,
        ...formData,
        id: settings?.id ?? formData.id ?? 1,
        year_number: Number(formData.year_number),
      };

      const res = await saveCurrentSettings(payload);

      if (res.status !== 200 && res.status !== 201) {
        let errorMsg = "Failed to save settings.";
        if (res.data?.message) {
          errorMsg = ` ${res.data.message}`;
        }
        throw new Error(errorMsg);
      }
      
      setSettings(res.data);
      setFormData({
        id: res.data.id ?? 1,
        current_semester: res.data.current_semester ?? "",
        academic_year: res.data.academic_year ?? "",
        year_number: res.data.year_number ? String(res.data.year_number) : "",
        semester_start_date: res.data.semester_start_date ?? "",
        semester_end_date: res.data.semester_end_date ?? "",
      });
      showSnackbar(setSnackbar, "Settings saved successfully.", "success");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      showSnackbar(setSnackbar, "Unable to save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="pb-4 flex flex-col gap-3">
        <p className="text-(--primary-color) text-3xl font-bold">Settings</p>
        <p className="text-md">
          {configured
            ? "View the configured semester settings."
            : "Complete these settings before accessing the admin portal."}
        </p>
      </div>

      {semesterEnded && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          Admin portal access is blocked until the settings are filled by you.
        </div>
      )}

      <div className="bg-white rounded-lg p-5 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Current Semester"
            value={readOnly ? settings?.current_semester ?? "" : formData.current_semester}
            onChange={(e) => handleChange("current_semester", e.target.value)}
            fullWidth
            placeholder="Fall/Spring 20XX"
            disabled={readOnly}
          />

          <TextField
            label="Academic Year"
            value={readOnly ? settings?.academic_year ?? "" : formData.academic_year}
            onChange={(e) => handleChange("academic_year", e.target.value)}
            placeholder="2025-2026"
            fullWidth
            disabled={readOnly}
          />

          <TextField
            label="Year Number"
            select
            value={readOnly ? String(settings?.year_number ?? "") : formData.year_number}
            onChange={(e) => handleChange("year_number", e.target.value)}
            fullWidth
            disabled={readOnly}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </TextField>

          <TextField
            label="Semester Start Date"
            type="date"
            value={readOnly ? settings?.semester_start_date ?? "" : formData.semester_start_date}
            onChange={(e) => handleChange("semester_start_date", e.target.value)}
            fullWidth
            disabled={readOnly}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Semester End Date"
            type="date"
            value={readOnly ? settings?.semester_end_date ?? "" : formData.semester_end_date}
            onChange={(e) => handleChange("semester_end_date", e.target.value)}
            fullWidth
            disabled={readOnly}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        {!readOnly && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-(--primary-color) text-white py-2 px-4 rounded-lg hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        )}
      </div>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </div>
  );
}
