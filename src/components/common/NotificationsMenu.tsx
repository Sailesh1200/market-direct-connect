
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataStore, Notification } from "@/services/DataSyncService";
import { Badge } from "@/components/ui/badge";

const NotificationsMenu = () => {
  const { notifications, clearNotifications } = useDataStore();
  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Get notification style based on type
  const getNotificationStyle = (type: Notification['type']) => {
    switch (type) {
      case 'product_added':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'error':
        return 'bg-red-50 border-l-4 border-red-500';
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 min-w-[1.25rem] h-5 bg-farm-green-600"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={clearNotifications}
            >
              Clear All
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.slice().reverse().map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={`p-0 focus:bg-transparent`}
              >
                <div className={`w-full p-3 cursor-default ${getNotificationStyle(notification.type)}`}>
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800">
                      {notification.message}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatTimestamp(new Date(notification.created_at))}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
