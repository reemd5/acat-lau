import React, { useEffect, useState } from "react";
import { getReminders, getPendingForms, getAutoReminders, getCustomReminder, saveAutoReminders, saveCustomReminder, sendQuickReminder, } from "../../api/reminders";
import { useSettings } from "../../context/SettingsContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { showSnackbar } from "../../utils/snackbar";
import { formatDate } from "../../utils/dateUtils";
import { format } from "date-fns";


function ReminderRow({ item }) {
  return (
    <div className="flex justify-between border border-gray-300 rounded-lg p-2 mb-2 soft-hover">
      <div>
        <p>{item.text}</p>
        <p className="text-sm text-gray-500">
          {item.recipients ?? "N/A"} recipients
        </p>
      </div>
      <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
    </div>
  );
}

const ReminderHistory = ({ data }) => {
  if (!data.length) {
    return <p className="text-sm text-gray-500 mt-3">No reminders sent yet.</p>;
  }
  return data.map((item) => <ReminderRow key={item.id} item={item} />);
};

const SendReminderCard = ({ pending, onSend, disabled }) => (
  <div className="bg-white p-4 rounded-lg h-full flex flex-col justify-between">
    <div>
      <p className="text-lg font-semibold text-(--primary-color)">Quick Action</p>
      <p className="text-sm text-gray-600 mt-2">
        {pending} forms pending!
        <br />
        Send a reminder to instructors.
      </p>
    </div>
    <div className="flex justify-end mt-2">
      <button
        onClick={onSend}
        disabled={disabled}
        className={`bg-(--primary-color) text-white py-2 px-4 rounded-lg hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Send Now
      </button>
    </div>
  </div>
);

const SelectSemesterDatesCard = ({
  semesterStart,
  semesterEnd,
}) => (
  <div className="bg-white p-4 rounded-lg h-full flex flex-col justify-between">
    <div>
      <p className="text-lg font-semibold text-(--primary-color)">
        Semester Dates
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <div className="border border-gray-300 rounded-lg p-3">
          <p className="text-sm text-gray-500">Semester Start</p>
          <p className="text-base">
            {semesterStart ? format(semesterStart, "MMM dd, yyyy") : "Not set"}
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg p-3">
          <p className="text-sm text-gray-500">Semester End</p>
          <p className="text-base">
            {semesterEnd ? format(semesterEnd, "MMM dd, yyyy") : "Not set"}
          </p>
        </div>
      </div>
    </div>

  </div>
);

const Toggle = ({ enabled, onToggle, disabled }) => (
  <div
    onClick={!disabled ? onToggle : undefined}
    className={`w-11 h-5 flex items-center rounded-full cursor-pointer transition ${enabled ? "bg-(--primary-color)" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div
      className={`w-3 h-3 bg-white rounded-full transition-transform ml-1 ${enabled ? "translate-x-6" : ""
        }`}
    />
  </div>
);


const AutoReminders = ({
  semesterSet,
  semesterStart,
  semesterEnd,
  onShowSnackbar
}) => {
  const [autoData, setAutoData] = useState({
    first: false,
    first_date: "",
    middle: false,
    middle_date: "",
    end: false,
    end_date: ""
  });

  useEffect(() => {
    if (!semesterSet) {
      setAutoData({
        first: false,
        first_date: "",
        middle: false,
        middle_date: "",
        end: false,
        end_date: ""
      });
      return;
    }

    const loadAuto = async () => {
      try {
        const res = await getAutoReminders();
        if (res && res.data) {
          setAutoData({
            first: res.data.first || false,
            first_date: res.data.first_date || "",
            middle: res.data.middle || false,
            middle_date: res.data.middle_date || "",
            end: res.data.end || false,
            end_date: res.data.end_date || ""
          });
        } else {
          setAutoData({
            first: false,
            first_date: "",
            middle: false,
            middle_date: "",
            end: false,
            end_date: ""
          });
        }
      } catch (error) {
        console.error("Error loading auto reminders:", error);
        setAutoData({
          first: false,
          first_date: "",
          middle: false,
          middle_date: "",
          end: false,
          end_date: ""
        });
      }
    };

    loadAuto();
  }, [semesterSet]);

  const toggleRule = (key) => {
    if (!semesterSet || !semesterStart || !semesterEnd) return;

    const newValue = !autoData[key];
    let newDate = "";

    if (newValue) {
      const start = new Date(semesterStart);
      const end = new Date(semesterEnd);

      switch (key) {
        case 'first':
          newDate = start.toISOString().split('T')[0];
          break;
        case 'middle':
          const middleTime = (start.getTime() + end.getTime()) / 2;
          newDate = new Date(middleTime).toISOString().split('T')[0];
          break;
        case 'end':
          newDate = end.toISOString().split('T')[0];
          break;
        default:
          newDate = "";
      }
    }

    setAutoData(prev => ({
      ...prev,
      [key]: newValue,
      [`${key}_date`]: newDate
    }));
  };

  const handleSave = async () => {
    if (!semesterSet) {
      onShowSnackbar("Please set semester dates first", "error");
      return;
    }

    try {
      const payload = {
        first: autoData.first,
        middle: autoData.middle,
        end: autoData.end
      };

      if (autoData.first) payload.first_date = autoData.first_date;
      if (autoData.middle) payload.middle_date = autoData.middle_date;
      if (autoData.end) payload.end_date = autoData.end_date;

      await saveAutoReminders(payload);
      onShowSnackbar("Automatic reminders saved successfully", "success");
    } catch (error) {
      onShowSnackbar("Error saving automatic reminders", "error");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold text-(--primary-color)">
          Automatic Reminders
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {semesterSet ? "Select when to send automatic reminders:" : "Please set semester dates first"}
        </p>

        {[
          { key: 'first', label: 'First Day of Semester' },
          { key: 'middle', label: 'Middle of Semester' },
          { key: 'end', label: 'End of Semester' }
        ].map(({ key, label }) => (
          <div
            key={key}
            className="flex justify-between items-center border border-gray-300 rounded-lg p-2 mt-2"
          >
            <div>
              <p className="text-sm">{label}</p>
              {autoData[key] && autoData[`${key}_date`] && (
                <p className="text-xs text-gray-500">
                  Date: {format(new Date(autoData[`${key}_date`]), 'MMM dd, yyyy')}
                </p>
              )}
            </div>
            <Toggle
              enabled={autoData[key]}
              onToggle={() => toggleRule(key)}
              disabled={!semesterSet}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={!semesterSet}
          className={`bg-(--primary-color) text-white py-2 px-4 rounded-lg hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 ${!semesterSet ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};


const CustomReminder = ({
  semesterSet,
  onShowSnackbar,
  semesterStart,
  semesterEnd
}) => {
  const [customData, setCustomData] = useState({
    first_date: "",
    end_date: "",
    emails_per_day: 1
  });

  useEffect(() => {
    if (!semesterSet) {
      setCustomData({
        first_date: "",
        end_date: "",
        emails_per_day: 1
      });
      return;
    }

    const loadCustom = async () => {
      try {
        const res = await getCustomReminder();
        if (res && res.data) {
          setCustomData({
            first_date: res.data.first_date || "",
            end_date: res.data.end_date || "",
            emails_per_day: res.data.emails_per_day || 1
          });
        } else {
          setCustomData({
            first_date: "",
            end_date: "",
            emails_per_day: 1
          });
        }
      } catch (error) {
        console.error("Error loading custom reminder:", error);
        setCustomData({
          first_date: "",
          end_date: "",
          emails_per_day: 1
        });
      }
    };

    loadCustom();
  }, [semesterSet]);

  const handleInputChange = (field, value) => {
    setCustomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSend = async () => {
    if (!semesterSet) {
      onShowSnackbar("Please set semester dates first", "error");
      return;
    }

    if (!customData.first_date || !customData.end_date) {
      onShowSnackbar("Please select both start and end dates", "error");
      return;
    }

    if (new Date(customData.first_date) > new Date(customData.end_date)) {
      onShowSnackbar("Start date must be before end date", "error");
      return;
    }

    if (semesterStart && semesterEnd) {
      const semesterStartDate = new Date(semesterStart);
      const semesterEndDate = new Date(semesterEnd);
      const customStartDate = new Date(customData.first_date);
      const customEndDate = new Date(customData.end_date);

      if (customStartDate < semesterStartDate || customEndDate > semesterEndDate) {
        onShowSnackbar("Custom dates must be within the semester dates", "error");
        return;
      }
    }

    if (customData.emails_per_day < 1 || customData.emails_per_day > 10) {
      onShowSnackbar("Emails per day must be between 1 and 10", "error");
      return;
    }

    try {
      await saveCustomReminder(customData);
      onShowSnackbar("Custom reminder scheduled successfully", "success");
    } catch (error) {
      onShowSnackbar("Error scheduling custom reminder", "error");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full col-span-3 flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold text-(--primary-color)">
          Custom Reminder
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {semesterSet ? "Schedule custom reminders between dates:" : "Please set semester dates first"}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Custom Start Date:</label>
            <input
              type="date"
              value={customData.first_date}
              onChange={(e) => handleInputChange('first_date', e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              disabled={!semesterSet}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Custom End Date:</label>
            <input
              type="date"
              value={customData.end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              disabled={!semesterSet}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Emails Per Day:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={customData.emails_per_day}
              onChange={(e) => handleInputChange('emails_per_day', Number(e.target.value))}
              className="border border-gray-300 rounded p-2 w-full"
              disabled={!semesterSet}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSend}
          disabled={!semesterSet}
          className={`bg-(--primary-color) text-white py-2 px-4 rounded-lg hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 ${!semesterSet ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Schedule Custom Reminder
        </button>
      </div>
    </div>
  );
};

export default function Reminders() {
  const { settings } = useSettings();
  const semester = settings?.current_semester;
  const [semesterStart, setSemesterStart] = useState(null);
  const [semesterEnd, setSemesterEnd] = useState(null);
  const [allReminders, setAllReminders] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [pendingForms, setPendingForms] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const semesterSet = Boolean(
    semesterStart &&
    semesterEnd
  );

  useEffect(() => {
    if (settings?.semester_start_date && settings?.semester_end_date) {
      const startDate = new Date(settings.semester_start_date);
      const endDate = new Date(settings.semester_end_date);

      if (!isNaN(startDate)) setSemesterStart(startDate);
      if (!isNaN(endDate)) setSemesterEnd(endDate);
    }
  }, [settings]);

  useEffect(() => {
    const load = async () => {
      try {
        // Load all reminders
        const remindersRes = await getReminders(semester);
        if (remindersRes && remindersRes.data) {
          setAllReminders(remindersRes.data || []);
        } else {
          setAllReminders([]);
        }

        // Load all pending forms
        const pendingRes = await getPendingForms();
        setPendingForms(pendingRes.data.count);

      } catch (error) {
        console.error("Error loading data:", error);
        setPendingForms(0);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (semester) {
      const filtered = allReminders.filter(item => item.semester === semester);
      setFilteredHistory(filtered.reverse());
    } else {
      setFilteredHistory([]);
    }
  }, [allReminders, semester]);

  const handleShowSnackbar = (message, severity = "success") => {
    showSnackbar(setSnackbar, message, severity);
  };

  const handleSendQuickReminder = async () => {
    if (!semesterSet) {
      handleShowSnackbar("Please set semester dates first", "error");
      return;
    }

    try {
      await sendQuickReminder(semester, pendingForms);

      // Refresh all reminders
      const remindersRes = await getReminders();
      if (remindersRes && remindersRes.data) {
        setAllReminders(remindersRes.data || []);
      }

      handleShowSnackbar("Quick reminder sent successfully", "success");
    } catch (error) {
      console.error("Error sending quick reminder:", error);
      handleShowSnackbar("Error sending quick reminder", "error");
    }
  };

  return (
    <div>
      <div className="pb-4 flex flex-col gap-2">
        <p className="text-(--primary-color) text-3xl font-bold">Reminders</p>
        <p className="text-md">Send and view reminders.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SelectSemesterDatesCard
          semesterStart={semesterStart}
          semesterEnd={semesterEnd}
        />

        <div className="col-span-2">
          <AutoReminders
            semesterSet={semesterSet}
            semester={semester}
            semesterStart={semesterStart}
            semesterEnd={semesterEnd}
            onShowSnackbar={handleShowSnackbar}
          />
        </div>

        <SendReminderCard
          pending={pendingForms}
          disabled={!semesterSet}
          onSend={handleSendQuickReminder}
        />

        <div className="col-span-2">
          <CustomReminder
            semesterSet={semesterSet}
            onShowSnackbar={handleShowSnackbar}
            semesterStart={semesterStart}
            semesterEnd={semesterEnd}
          />
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-lg p-5 max-h-72 overflow-y-auto w-full mt-4">
        <p className="text-lg font-semibold text-(--primary-color)">
          Reminder History
        </p>
        <ReminderHistory data={filteredHistory} />
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
