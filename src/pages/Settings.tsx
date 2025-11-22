import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Globe, 
  Moon, 
  Sun,
  Shield,
  Lock,
  User,
  CreditCard,
  MapPin,
  HelpCircle,
  LogOut,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    promotions: true,
  });
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Account Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Change password coming soon!")}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Separator />
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => toast.info("Delete account coming soon!")}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive booking reminders via SMS</p>
                </div>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="promotion-notifications">Promotional Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
                </div>
              </div>
              <Switch
                id="promotion-notifications"
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={(checked) => {
                  setDarkMode(checked);
                  toast.info("Theme change coming soon!");
                }}
              />
            </div>
            <Separator />
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Language settings coming soon!")}
            >
              <Globe className="w-4 h-4 mr-2" />
              Language & Region
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Privacy policy coming soon!")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Terms of service coming soon!")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Terms of Service
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Data management coming soon!")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Data Management
            </Button>
          </CardContent>
        </Card>

        {/* Payment & Billing */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment & Billing
            </CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/profile")}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Methods
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Billing history coming soon!")}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing History
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Support
            </CardTitle>
            <CardDescription>Get help and support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Help center coming soon!")}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Contact support coming soon!")}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Feedback coming soon!")}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                toast.success("Logged out successfully!");
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

