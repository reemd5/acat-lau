import api from "./axios";

export const getNotificationsBySemester = (semester) =>
  api.get("/notifications", {
    params: { semester },
  });

export const deleteNotification = (id) => {
    return api.delete(`/notifications/${id}`);
}
