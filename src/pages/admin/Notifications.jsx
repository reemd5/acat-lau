import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { deleteNotification } from "../../api/notifications";
import { useNotifications } from "../../hooks/useNotifications";
import { formatDate } from "../../utils/dateUtils";

const Notifications = () => {
  const { settings } = useSettings();
  const currentSemester = settings?.current_semester;

  const { notifications, setNotifications } =
    useNotifications(currentSemester);

  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="pb-4 flex flex-col gap-3">
        <p className="text-(--primary-color) text-3xl font-bold">
          Notifications
        </p>
        <p className="text-md">
          View notifications for the current semester.
        </p>
      </div>

      <div className="bg-white p-4 rounded">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <TextField
            label="Search notifications"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ my: 2 }}
          />
        </div>

        <div className="bg-white rounded-xl divide-y divide-gray-300">
          {filteredNotifications.length === 0 && (
            <p className="p-4 text-sm text-gray-500">
              No notifications found.
            </p>
          )}

          {[...filteredNotifications].reverse().map((n) => (
            <div key={n.id} className="p-4 soft-hover">
              <div className="flex justify-between items-start">
                <div>
                  <p>{n.text}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(n.date)}
                  </p>
                </div>

                <button onClick={() => handleDelete(n.id)} className="cursor-pointer">
                  <i className="fa-solid fa-trash text-red-500"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;