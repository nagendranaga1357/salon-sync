import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Bell, 
  Shield, 
  Edit, 
  Save,
  X,
  Star,
  Clock,
  Building2,
  Home as HomeIcon,
  Camera
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    gender: "male",
    location: "Bangalore, Karnataka",
    dateOfBirth: "1990-01-15",
    address: "123 Main Street, Indiranagar",
    city: "Bangalore",
    pincode: "560038",
  });

  const upcomingBookings = [
    {
      id: 1,
      salon: "Glamour Studio",
      service: "Hair Cutting + Styling",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "salon",
    },
    {
      id: 2,
      salon: "Elite Salon & Spa",
      service: "Hair Spa",
      date: "2024-01-25",
      time: "2:00 PM",
      status: "confirmed",
      type: "salon",
    },
  ];

  const pastBookings = [
    {
      id: 3,
      salon: "Royal Hair Studio",
      service: "Beard Styling",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      type: "salon",
      rating: 5,
    },
    {
      id: 4,
      salon: "Meera Kumar",
      service: "Haircut + Facial",
      date: "2024-01-05",
      time: "3:00 PM",
      status: "completed",
      type: "home",
      rating: 4,
    },
  ];

  const savedAddresses = [
    {
      id: 1,
      type: "home",
      address: "123 Main Street, Indiranagar",
      city: "Bangalore",
      pincode: "560038",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      address: "456 Tech Park, Koramangala",
      city: "Bangalore",
      pincode: "560095",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "card",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "upi",
      upiId: "john@paytm",
      isDefault: false,
    },
  ];

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/main")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">My Profile</h1>
          <div className="w-10" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary">
                  <AvatarImage src="" alt={profileData.fullName} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-secondary text-white">
                    {profileData.fullName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full"
                    onClick={() => toast.info("Photo upload coming soon!")}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-3xl font-bold">{profileData.fullName}</h2>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">@{profileData.username}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                    <span>(12 reviews)</span>
                  </div>
                </div>
                {!isEditing && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>@{profileData.username}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    {isEditing ? (
                      <Input
                        id="gender"
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="capitalize">{profileData.gender}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Feature coming soon!")}>
                    Manage
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive booking reminders via SMS</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Feature coming soon!")}>
                    Manage
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Preferred Service Type</p>
                    <p className="text-sm text-muted-foreground">Default service preference</p>
                  </div>
                  <Badge variant="secondary">Salon Services</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <h3 className="text-xl font-bold mb-4">Upcoming Bookings</h3>
              <div className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              {booking.type === "salon" ? (
                                <Building2 className="w-5 h-5 text-primary" />
                              ) : (
                                <HomeIcon className="w-5 h-5 text-primary" />
                              )}
                              <h4 className="font-bold text-lg">{booking.salon}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {booking.type === "salon" ? "Salon" : "Home"}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{booking.service}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge 
                              variant={booking.status === "confirmed" ? "default" : "secondary"}
                              className="w-fit"
                            >
                              {booking.status}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => toast.info("View details coming soon!")}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No upcoming bookings
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <Separator />

            {/* Past Bookings */}
            <div>
              <h3 className="text-xl font-bold mb-4">Past Bookings</h3>
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            {booking.type === "salon" ? (
                              <Building2 className="w-5 h-5 text-primary" />
                            ) : (
                              <HomeIcon className="w-5 h-5 text-primary" />
                            )}
                            <h4 className="font-bold text-lg">{booking.salon}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {booking.type === "salon" ? "Salon" : "Home"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{booking.service}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span>{booking.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit">
                            {booking.status}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => toast.info("Re-book coming soon!")}>
                            Re-book
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Saved Addresses</h3>
              <Button onClick={() => toast.info("Add address coming soon!")}>
                Add Address
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map((address) => (
                <Card key={address.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {address.type === "home" ? (
                          <HomeIcon className="w-5 h-5 text-primary" />
                        ) : (
                          <Building2 className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-semibold capitalize">{address.type}</span>
                        {address.isDefault && (
                          <Badge variant="default" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Edit coming soon!")}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Delete coming soon!")}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{address.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city} - {address.pincode}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Payment Methods</h3>
              <Button onClick={() => toast.info("Add payment method coming soon!")}>
                Add Payment Method
              </Button>
            </div>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          {method.type === "card" ? (
                            <>
                              <p className="font-semibold">Card ending in {method.last4}</p>
                              <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold">UPI</p>
                              <p className="text-sm text-muted-foreground">{method.upiId}</p>
                            </>
                          )}
                        </div>
                        {method.isDefault && (
                          <Badge variant="default" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => toast.info("Edit coming soon!")}>
                          Edit
                        </Button>
                        {!method.isDefault && (
                          <Button variant="ghost" size="sm" onClick={() => toast.info("Delete coming soon!")}>
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;


