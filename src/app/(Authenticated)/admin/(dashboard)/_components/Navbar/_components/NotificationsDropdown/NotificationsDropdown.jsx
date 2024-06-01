import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";

const priorityColors = {
    Minimal: "bg-blue-500",
    Low: "bg-green-500",
    Moderate: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-500",
};

export default function NotificationsDropdown({ notifications, getNotifications, hideButton, markNotificationRead }) {
  const [expandedNotification, setExpandedNotification] = useState(null);

  const handleExpandToggle = async (notificationId, read) => {
    setExpandedNotification(notificationId === expandedNotification ? null : notificationId);

    if(read == false) {
      await markNotificationRead(notificationId);
    }
  };

  return (
    <div className="z-50 absolute top-8 right-0 mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
      <ul className="divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const isEdited = notification.createdAt !== notification.updatedAt;
            const formattedTime = formatDistanceToNow(parseISO(notification.updatedAt), { addSuffix: true });

            const truncatedDescription = notification.description.split(" ").slice(0, 15).join(" ");
            const isDescriptionExpanded = notification._id === expandedNotification;

            const notificationRead = notification.read ? "" : "bg-blue-200";

            return (
              <li key={notification._id} className={`p-4 flex items-start space-x-4 cursor-pointer ${notificationRead}`} onClick={() => handleExpandToggle(notification._id, notification.read)}>
                <div className={`h-3 w-3 rounded-full mt-1 ${priorityColors[notification.priority]}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{notification.headline}</p>
                  <p 
                    className="mt-1 text-sm text-gray-600 cursor-pointer"
                  >
                    {isDescriptionExpanded ? notification.description : `${truncatedDescription}...`}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {formattedTime} {isEdited && "(Edited)"}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <li className="p-4 text-gray-500">No new notifications</li>
        )}
      </ul>
      {!hideButton && (
        <div className="border-t border-gray-200 p-4">
          <button
            className="w-full text-center text-blue-500 hover:text-blue-700 font-semibold"
            onClick={() => getNotifications()}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
