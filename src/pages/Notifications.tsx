import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  Info,
  AlertCircle,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your booking at Glamour Studio for Jan 20, 2024 at 10:00 AM has been confirmed.",
      icon: CheckCircle2,
      iconColor: "text-green-600",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      action: () => navigate("/my-bookings"),
    },
    {
      id: 2,
      type: "payment_success",
      title: "Payment Successful",
      message: "Your payment of ₹1,600 for booking at Glamour Studio has been processed successfully.",
      icon: CreditCard,
      iconColor: "text-blue-600",
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      action: () => navigate("/my-bookings"),
    },
    {
      id: 3,
      type: "reminder",
      title: "Booking Reminder",
      message: "You have an upcoming appointment at Elite Salon & Spa tomorrow at 2:00 PM.",
      icon: Calendar,
      iconColor: "text-orange-600",
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      action: () => navigate("/my-bookings"),
    },
    {
      id: 4,
      type: "info",
      title: "New Services Available",
      message: "Check out our new premium hair spa services at select salons near you.",
      icon: Info,
      iconColor: "text-purple-600",
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      action: () => navigate("/main"),
    },
    {
      id: 5,
      type: "booking_cancelled",
      title: "Booking Cancelled",
      message: "Your booking at Style Studio has been cancelled. Refund will be processed within 5-7 business days.",
      icon: XCircle,
      iconColor: "text-red-600",
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      action: () => navigate("/my-bookings"),
    },
    {
      id: 6,
      type: "promotion",
      title: "Special Offer",
      message: "Get 30% off on your next booking! Use code SAVE30 at checkout. Valid until Jan 31, 2024.",
      icon: AlertCircle,
      iconColor: "text-yellow-600",
      time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true,
      action: () => navigate("/main"),
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Mark all as read functionality
                  console.log("Mark all as read");
                }}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`border-0 shadow-md transition-all cursor-pointer hover:shadow-lg ${
                    !notification.read ? "bg-primary/5 border-l-4 border-l-primary" : ""
                  }`}
                  onClick={notification.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full bg-muted ${notification.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? "font-bold" : ""}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{formatDistanceToNow(notification.time, { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  {index < notifications.length - 1 && <Separator />}
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">You're all caught up! No new notifications.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;

