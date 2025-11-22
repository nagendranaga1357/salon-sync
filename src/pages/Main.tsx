import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots, type CarouselApi } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Search, User, Scissors, Sparkles, Baby, Home as HomeIcon, Building2, Calendar, Settings, LogOut, Heart, HelpCircle, Bell, X } from "lucide-react";
import salonHero from "@/assets/salon-hero.jpg";
import serviceCutting from "@/assets/service-cutting.jpg";
import serviceMassage from "@/assets/service-massage.jpg";
import { toast } from "sonner";

const Main = () => {
  const navigate = useNavigate();
  const [serviceMode, setServiceMode] = useState<"salon" | "home">("salon");
  const [selectedCategory, setSelectedCategory] = useState<"men" | "women" | "child">("men");
  const [menuOpen, setMenuOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const promoCards = [
    { title: "50% Off First Visit", subtitle: "New Customer Special", gradient: "from-primary to-primary/80" },
    { title: "Premium Package", subtitle: "Hair + Beard + Massage", gradient: "from-secondary to-secondary/80" },
    { title: "Weekend Special", subtitle: "Book Now & Save 30%", gradient: "from-accent to-accent/80" },
  ];

  // Auto-play functionality
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll every 4 seconds
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  const services = {
    men: [
      { name: "Hair Cutting", icon: Scissors, image: serviceCutting },
      { name: "Shaving", icon: Sparkles, image: serviceCutting },
      { name: "Beard Styling", icon: Scissors, image: serviceCutting },
      { name: "Hair Spa", icon: Sparkles, image: serviceMassage },
      { name: "Massage", icon: Sparkles, image: serviceMassage },
      { name: "Combo Package", icon: Sparkles, image: serviceCutting },
    ],
    women: [
      { name: "Hair Cutting", icon: Scissors, image: serviceCutting },
      { name: "Hair Coloring", icon: Sparkles, image: serviceCutting },
      { name: "Facial", icon: Sparkles, image: serviceMassage },
      { name: "Manicure", icon: Sparkles, image: serviceMassage },
      { name: "Pedicure", icon: Sparkles, image: serviceMassage },
      { name: "Bridal Package", icon: Sparkles, image: serviceCutting },
    ],
    child: [
      { name: "Kids Haircut", icon: Scissors, image: serviceCutting },
      { name: "Fun Styling", icon: Sparkles, image: serviceCutting },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Side Menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            

            {/* User Profile Section */}
            <div 
              className="p-6 border-b bg-gradient-to-br from-primary/5 to-primary/10 cursor-pointer hover:from-primary/10 hover:to-primary/15 transition-colors"
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg truncate">Welcome Back!</p>
                  <p className="text-sm text-muted-foreground truncate">user@example.com</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  navigate("/main");
                  setMenuOpen(false);
                }}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                Home
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  navigate("/home-services");
                  setMenuOpen(false);
                }}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                Home Services
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  navigate("/service-listing");
                  setMenuOpen(false);
                }}
              >
                <Scissors className="w-5 h-5 mr-3" />
                Service Listing
              </Button>

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.info("My Bookings coming soon!");
                  setMenuOpen(false);
                }}
              >
                <Calendar className="w-5 h-5 mr-3" />
                My Bookings
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.info("Favorites coming soon!");
                  setMenuOpen(false);
                }}
              >
                <Heart className="w-5 h-5 mr-3" />
                Favorites
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.info("Notifications coming soon!");
                  setMenuOpen(false);
                }}
              >
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </Button>

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                <User className="w-5 h-5 mr-3" />
                My Profile
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.info("Settings coming soon!");
                  setMenuOpen(false);
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.info("Help & Support coming soon!");
                  setMenuOpen(false);
                }}
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                Help & Support
              </Button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-base"
                onClick={() => {
                  toast.success("Logged out successfully!");
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Version 1.0.0
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search services, salons..."
                className="pl-10 h-11"
              />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Carousel */}
        <div className="animate-fade-in relative">
          <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {promoCards.map((promo, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 overflow-hidden shadow-lg">
                    <CardContent className={`p-0 bg-gradient-to-br ${promo.gradient} h-48 flex flex-col items-center justify-center text-white relative`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative z-10 text-center space-y-2">
                        <h3 className="text-3xl font-bold">{promo.title}</h3>
                        <p className="text-lg opacity-90">{promo.subtitle}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <CarouselDots
              count={promoCards.length}
              selectedIndex={current}
              onDotClick={(index) => api?.scrollTo(index)}
            />
          </div>
        </div>

        {/* Service Mode Toggle */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="p-2 shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={serviceMode === "salon" ? "default" : "ghost"}
                className={`h-16 text-lg ${serviceMode === "salon" ? "" : "hover:bg-muted"}`}
                onClick={() => setServiceMode("salon")}
              >
                <Building2 className="w-5 h-5 mr-2" />
                To Salon
              </Button>
              <Button
                variant={serviceMode === "home" ? "default" : "ghost"}
                className={`h-16 text-lg ${serviceMode === "home" ? "" : "hover:bg-muted"}`}
                onClick={() => {
                  setServiceMode("home");
                  navigate("/home-services");
                }}
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                To Home
              </Button>
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "men", label: "Men", icon: User },
              { id: "women", label: "Women", icon: Sparkles },
              { id: "child", label: "Child", icon: Baby },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                className={`group relative overflow-hidden rounded-3xl p-6 transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg scale-105"
                    : "bg-card hover:bg-muted"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-full ${
                    selectedCategory === category.id ? "bg-white/20" : "bg-primary/10"
                  }`}>
                    <category.icon className={`w-8 h-8 ${
                      selectedCategory === category.id ? "text-white" : "text-primary"
                    }`} />
                  </div>
                  <span className="font-semibold">{category.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Services</h2>
            <Badge variant="secondary" className="text-sm">
              {serviceMode === "salon" ? "Salon Services" : "Home Services"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services[selectedCategory].map((service, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all hover:scale-105"
                onClick={() => navigate("/service-listing", { state: { service: service.name } })}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
