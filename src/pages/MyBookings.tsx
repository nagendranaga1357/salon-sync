import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Building2, 
  Home as HomeIcon,
  Star,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

const MyBookings = () => {
  const navigate = useNavigate();

  const upcomingBookings = [
    {
      id: 1,
      salon: "Glamour Studio",
      service: "Hair Cutting + Styling + Hair Spa",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "salon",
      location: "Indiranagar, Bangalore",
      amount: "₹1,600",
      services: ["Hair Cutting", "Styling", "Hair Spa"],
    },
    {
      id: 2,
      salon: "Elite Salon & Spa",
      service: "Full Package",
      date: "2024-01-25",
      time: "2:00 PM",
      status: "confirmed",
      type: "salon",
      location: "Koramangala, Bangalore",
      amount: "₹1,200",
      services: ["Full Package"],
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
      location: "HSR Layout, Bangalore",
      amount: "₹500",
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
      location: "Home Service",
      amount: "₹1,200",
      rating: 4,
    },
  ];

  const cancelledBookings = [
    {
      id: 5,
      salon: "Style Studio",
      service: "Hair Color",
      date: "2024-01-15",
      time: "4:00 PM",
      status: "cancelled",
      type: "salon",
      location: "Whitefield, Bangalore",
      amount: "₹2,500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-muted-foreground">Manage your appointments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {booking.type === "salon" ? (
                              <Building2 className="w-5 h-5 text-primary" />
                            ) : (
                              <HomeIcon className="w-5 h-5 text-primary" />
                            )}
                            <h3 className="font-bold text-lg">{booking.salon}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {booking.type === "salon" ? "Salon" : "Home"}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold">{booking.service}</p>
                            {booking.services && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {booking.services.map((service, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant="default" className="ml-2">
                          {booking.status}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">{booking.amount}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toast.info("View details coming soon!")}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toast.info("Cancel booking coming soon!")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                  <p className="text-muted-foreground mb-4">You don't have any upcoming appointments</p>
                  <Button onClick={() => navigate("/main")}>
                    Browse Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Bookings */}
          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {booking.type === "salon" ? (
                              <Building2 className="w-5 h-5 text-primary" />
                            ) : (
                              <HomeIcon className="w-5 h-5 text-primary" />
                            )}
                            <h3 className="font-bold text-lg">{booking.salon}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {booking.type === "salon" ? "Salon" : "Home"}
                            </Badge>
                          </div>
                          <p className="font-semibold">{booking.service}</p>
                        </div>
                        <Badge variant="outline">{booking.status}</Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span>{booking.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">{booking.amount}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toast.info("View details coming soon!")}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toast.info("Re-book coming soon!")}
                        >
                          Re-book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Past Bookings</h3>
                  <p className="text-muted-foreground">You haven't completed any bookings yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Cancelled Bookings */}
          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-md opacity-75">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {booking.type === "salon" ? (
                              <Building2 className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <HomeIcon className="w-5 h-5 text-muted-foreground" />
                            )}
                            <h3 className="font-bold text-lg">{booking.salon}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {booking.type === "salon" ? "Salon" : "Home"}
                            </Badge>
                          </div>
                          <p className="font-semibold">{booking.service}</p>
                        </div>
                        <Badge variant="destructive">{booking.status}</Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Cancelled Bookings</h3>
                  <p className="text-muted-foreground">You haven't cancelled any bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookings;

