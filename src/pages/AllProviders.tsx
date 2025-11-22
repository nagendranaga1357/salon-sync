import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, ShieldCheck, UserCheck, Star, Phone, MapPin, Search, SlidersHorizontal } from "lucide-react";
import providerProfile from "@/assets/provider-profile.jpg";
import { toast } from "sonner";

const AllProviders = () => {
  const navigate = useNavigate();

  // Extended list of all providers
  const allProviders = [
    {
      id: 1,
      name: "Meera Kumar",
      image: providerProfile,
      rating: 4.9,
      reviews: 156,
      distance: "2.3 km",
      location: "Indiranagar",
      services: ["Haircut", "Waxing", "Threading", "Facial", "Massage"],
      experience: "8 years",
      phone: "+91 98765 43210",
      verified: true,
    },
    {
      id: 2,
      name: "Kavita Singh",
      image: providerProfile,
      rating: 4.8,
      reviews: 142,
      distance: "3.1 km",
      location: "Koramangala",
      services: ["Bridal Makeup", "Haircut", "Facial", "Manicure", "Pedicure"],
      experience: "10 years",
      phone: "+91 98765 43211",
      verified: true,
    },
    {
      id: 3,
      name: "Deepa Reddy",
      image: providerProfile,
      rating: 4.7,
      reviews: 128,
      distance: "1.8 km",
      location: "HSR Layout",
      services: ["Haircut", "Hair Coloring", "Waxing", "Threading"],
      experience: "6 years",
      phone: "+91 98765 43212",
      verified: true,
    },
    {
      id: 4,
      name: "Shalini Menon",
      image: providerProfile,
      rating: 4.9,
      reviews: 189,
      distance: "2.7 km",
      location: "Whitefield",
      services: ["Grooming Combo", "Massage", "Facial", "Hair Spa"],
      experience: "12 years",
      phone: "+91 98765 43213",
      verified: true,
    },
    {
      id: 5,
      name: "Anita Desai",
      image: providerProfile,
      rating: 4.8,
      reviews: 203,
      distance: "4.2 km",
      location: "Jayanagar",
      services: ["Haircut", "Waxing", "Threading", "Facial", "Manicure", "Pedicure"],
      experience: "9 years",
      phone: "+91 98765 43214",
      verified: true,
    },
    {
      id: 6,
      name: "Rekha Nair",
      image: providerProfile,
      rating: 4.6,
      reviews: 167,
      distance: "3.5 km",
      location: "BTM Layout",
      services: ["Haircut", "Hair Coloring", "Facial", "Massage"],
      experience: "7 years",
      phone: "+91 98765 43215",
      verified: true,
    },
    {
      id: 7,
      name: "Sunita Rao",
      image: providerProfile,
      rating: 4.9,
      reviews: 234,
      distance: "5.1 km",
      location: "Marathahalli",
      services: ["Bridal Makeup", "Haircut", "Facial", "Hair Spa", "Massage"],
      experience: "11 years",
      phone: "+91 98765 43216",
      verified: true,
    },
    {
      id: 8,
      name: "Lakshmi Iyer",
      image: providerProfile,
      rating: 4.7,
      reviews: 145,
      distance: "2.9 km",
      location: "Basavanagudi",
      services: ["Haircut", "Waxing", "Threading", "Facial"],
      experience: "8 years",
      phone: "+91 98765 43217",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home-services")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <h1 className="text-xl font-bold">All Providers</h1>
          
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search providers by name, location, or service..."
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="h-11">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{allProviders.length}</span> providers
          </p>
          <Badge variant="secondary">Home Service</Badge>
        </div>

        {/* All Providers List */}
        <div className="space-y-4">
          {allProviders.map((provider, index) => (
            <Card
              key={provider.id}
              className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
              onClick={() => navigate("/home-provider-details", { state: { provider } })}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Left: Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                    {provider.verified && (
                      <div className="absolute -top-1 -right-1 bg-secondary rounded-full p-1">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Right: Provider Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{provider.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{provider.location}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {provider.distance}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserCheck className="w-4 h-4" />
                      <span>{provider.experience} experience</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {provider.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {provider.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.services.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${provider.phone}`;
                        }}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProviders;


