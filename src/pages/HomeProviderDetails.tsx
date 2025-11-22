import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Phone, ShieldCheck, UserCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import homeServiceWork from "@/assets/home-service-work.jpg";
import providerProfile from "@/assets/provider-profile.jpg";

const HomeProviderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Provider not found</h2>
          <Button onClick={() => navigate("/home-services")}>Back to Providers</Button>
        </div>
      </div>
    );
  }

  const servicesWithPricing = [
    { name: "Hair Cutting", price: "₹499", duration: "45 min" },
    { name: "Waxing (Full Body)", price: "₹899", duration: "60 min" },
    { name: "Threading", price: "₹199", duration: "20 min" },
    { name: "Facial", price: "₹999", duration: "60 min" },
    { name: "Massage", price: "₹1,499", duration: "90 min" },
    { name: "Manicure", price: "₹599", duration: "45 min" },
    { name: "Pedicure", price: "₹699", duration: "45 min" },
    { name: "Grooming Combo", price: "₹2,499", duration: "120 min" },
  ];

  const galleryImages = [homeServiceWork, homeServiceWork, homeServiceWork, homeServiceWork];

  const customerTestimonials = [
    { name: "Priya Sharma", rating: 5, text: "Excellent service! Very professional and made me feel comfortable at home.", date: "2 days ago" },
    { name: "Anjali Verma", rating: 5, text: "Best home service experience. Highly recommended!", date: "1 week ago" },
    { name: "Neha Patel", rating: 5, text: "Amazing work! Will definitely book again.", date: "2 weeks ago" },
  ];

  const handleBooking = () => {
    toast.success("Booking request sent! Provider will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home-services")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Provider Details</h1>
          <div className="w-10" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Image */}
        <div className="animate-fade-in">
          <Card className="border-0 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-80">
                <img
                  src={providerProfile}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {provider.verified && (
                  <div className="absolute top-4 right-4 bg-secondary rounded-full p-3 shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provider Info */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{provider.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                    <span>•</span>
                    <span>{provider.distance} away</span>
                  </div>
                </div>
                {provider.verified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="text-xl font-bold">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-5 h-5" />
                  <span className="font-semibold">{provider.experience} experience</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-muted-foreground">
                  Professional home beauty service provider with {provider.experience} of experience. 
                  Specialized in providing safe, hygienic, and high-quality beauty services at your doorstep. 
                  Background-verified and trained in latest beauty techniques.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Offered */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-4">Services & Pricing</h2>
          <div className="grid gap-3">
            {servicesWithPricing.map((service, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{service.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-bold mb-4">Previous Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-0">
                  <img
                    src={image}
                    alt={`Work ${index + 1}`}
                    className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {customerTestimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{testimonial.text}"</p>
                  <Badge variant="secondary" className="mt-3 text-xs">Verified Home Service Customer</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => window.location.href = `tel:${provider.phone}`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Provider
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleBooking}
            >
              Book Home Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProviderDetails;
