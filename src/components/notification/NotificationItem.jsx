import { formatDate } from "../../utils/dateUtils";

export default function NotificationItem({
  notification,
  variant = "compact",
  onDelete,
}) {
  if (variant === "compact") {
    return (
      <div className="flex justify-between border border-gray-400 rounded-lg p-2 my-2 soft-hover">
        <p>{notification.text}</p>
        <p className="text-gray-500 text-sm">
          {formatDate(notification.date)}
        </p>
      </div>
    );
  }

  // FULL VERSION
  return (
    <div className="p-4 flex justify-between items-start">
      <div>
        <p>{notification.text}</p>
        <p className="text-sm text-gray-500">
          {formatDate(notification.date)}
        </p>
      </div>

      {onDelete && (
        <button onClick={() => onDelete(notification.id)}>
          <i className="fa-solid fa-trash text-red-500"></i>
        </button>
      )}
    </div>
  );
}