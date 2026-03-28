import { useEffect, useState } from "react";
import { getNotificationsBySemester } from "../api/notifications";

export function useNotifications(semester) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!semester) return;

    const fetchNotifications = async () => {
      try {
        const res = await getNotificationsBySemester(semester);
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [semester]);

  return { notifications, setNotifications, loading };
}