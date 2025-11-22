import { useNavigate, useLocation } from "react-router-dom";
import { Home, Settings, Bell, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/main",
      matchPaths: ["/main", "/service-listing", "/salon-details", "/home-services", "/all-providers", "/home-provider-details"],
    },
    {
      label: "My Bookings",
      icon: Calendar,
      path: "/my-bookings",
      matchPaths: ["/my-bookings"],
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
      matchPaths: ["/notifications"],
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
      matchPaths: ["/settings", "/profile"],
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    return item.matchPaths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-3 px-4 min-w-[70px] transition-colors relative",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", active && "scale-110")} />
                <span className={cn("text-xs font-medium", active && "font-semibold")}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

