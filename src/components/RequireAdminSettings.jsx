import { Navigate, useLocation } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

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

const RequireAdminSettings = ({ children }) => {
  const location = useLocation();
  const { settings, settingsLoaded } = useSettings();

  if (!settingsLoaded) {
    return <p>Loading...</p>;
  }

  const onSettingsPage = location.pathname === "/admin/settings";
  const complete = isSettingsComplete(settings);
  const ended = isSemesterEnded(settings);

  if ((!complete || ended) && !onSettingsPage) {
    return <Navigate to="/admin/settings" replace />;
  }

  return children;
};

export default RequireAdminSettings;
