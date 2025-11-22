import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, User, Shield, ShieldCheck, UserCheck, Star, Phone, MapPin } from "lucide-react";
import homeServicesHero from "@/assets/home-services-hero.jpg";
import providerProfile from "@/assets/provider-profile.jpg";

const HomeServices = () => {
  const navigate = useNavigate();

  const trustFeatures = [
    { icon: ShieldCheck, title: "Verified Professionals", desc: "All providers are background-checked" },
    { icon: Shield, title: "Safe & Hygienic", desc: "Following highest safety standards" },
    { icon: UserCheck, title: "Female Specialists", desc: "Professional female grooming experts" },
  ];

  const testimonials = [
    { name: "Priya Sharma", rating: 5, text: "Excellent service at home! Very professional and hygienic." },
    { name: "Anjali Verma", rating: 5, text: "Felt safe and comfortable. Highly recommend!" },
    { name: "Neha Patel", rating: 5, text: "Convenient and trustworthy. Will book again." },
  ];

  const providers = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/main")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          
          <h1 className="text-xl font-bold">Home Services</h1>
          
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="animate-fade-in">
          <Card className="border-0 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-64">
                <img
                  src={homeServicesHero}
                  alt="Home Services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">Trusted Home Salon Services</h2>
                  <p className="text-lg opacity-90">Verified female grooming professionals at your doorstep</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Features */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trustFeatures.map((feature, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20">
                    <feature.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-md">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <Badge variant="secondary" className="text-xs">Verified Home Service Customer</Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Nearby Home Service Providers */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Nearby Providers</h2>
            <Badge variant="secondary">Home Service</Badge>
          </div>
          
          <div className="space-y-4">
            {providers.map((provider, index) => (
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
    </div>
  );
};

export default HomeServices;
