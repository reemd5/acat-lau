import api from "./axios";

export const getTotalRemindersSent = () => {
    return api.get("/total-reminders");
}

export const getRemindersOverview = (semester) => {
  return api.get("/reminder_overview", {
    params: { semester },
  });
};

export const getReminders = (current_semester) => {
    return api.get(`/reminders?semester=${current_semester}`);
}
export const getPendingForms = () => {
    return api.get("/pending-forms");
};

export const getSettings = () => {
    return api.get("/settings");
}

export const getAutoReminders = () => {
    return api.get("/auto-reminders");
}

export const getCustomReminder = () => {
    return api.get("/custom-reminders");
}

export const saveSemesterDates = (settings, start, end) => {
    return api.put("/settings", {
        ...settings,
        semester_start_date: start,
        semester_end_date: end
    });
}

export const resetAutoReminders = () => {
    return api.put("/auto-reminders", {
        id: 1,
        first: false,
        first_date: "",
        middle: false,
        middle_date: "",
        end: false,
        end_date: ""
    });
}

export const resetCustomReminders = () => {
    return api.put("/custom-reminders", {
        id: 1,
        first_date: "",
        end_date: "",
        emails_per_day: 1
    });
}

export const saveAutoReminders = (payload) => {
    return api.put("/auto-reminders", { id: 1, ...payload });
}

export const saveCustomReminder = (payload) => {
    return api.put("/custom-reminders", { id: 1, ...payload });
}

export const sendQuickReminder = (semester, recipients) => {
    return api.post("/reminders", {
        semester,
        text: "A quick reminder was sent to instructors with pending forms.",
        date: new Date(Date.now()).toISOString(),
        recipients
    });
}
