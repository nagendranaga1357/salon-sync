import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, SlidersHorizontal, MapPin, Star } from "lucide-react";
import serviceCutting from "@/assets/service-cutting.jpg";

const ServiceListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceName = location.state?.service || "Services";

  const salons = [
    {
      id: 1,
      name: "Glamour Studio",
      location: "Indiranagar, Bangalore",
      distance: "2.3 km",
      rating: 4.8,
      reviews: 245,
      services: ["Cutting", "Styling", "Spa"],
      image: serviceCutting,
    },
    {
      id: 2,
      name: "Elite Salon & Spa",
      location: "Koramangala, Bangalore",
      distance: "3.1 km",
      rating: 4.6,
      reviews: 189,
      services: ["Premium Cut", "Color", "Treatment"],
      image: serviceCutting,
    },
    {
      id: 3,
      name: "Royal Hair Studio",
      location: "MG Road, Bangalore",
      distance: "4.5 km",
      rating: 4.9,
      reviews: 312,
      services: ["Luxury Styling", "Spa", "Bridal"],
      image: serviceCutting,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">{serviceName}</h1>
            <p className="text-sm text-muted-foreground">Find the best salons near you</p>
          </div>
          
          <Button variant="ghost" size="icon">
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted whitespace-nowrap">
            Sort
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted whitespace-nowrap">
            Nearby
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-muted whitespace-nowrap">
            Top Rated
          </Badge>
        </div>

        {/* Salon Cards */}
        <div className="space-y-4">
          {salons.map((salon, index) => (
            <Card
              key={salon.id}
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all animate-fade-in border-0 shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate("/salon-details", { state: { salon } })}
            >
              <CardContent className="p-0">
                <div className="flex gap-4">
                  <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 py-4 pr-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-lg">{salon.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {salon.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-semibold">{salon.rating}</span>
                        <span className="text-muted-foreground">({salon.reviews})</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {salon.distance}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {salon.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
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

export default ServiceListing;
