import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Star, Clock, Phone, Share2 } from "lucide-react";
import salonHero from "@/assets/salon-hero.jpg";
import serviceCutting from "@/assets/service-cutting.jpg";
import serviceMassage from "@/assets/service-massage.jpg";
import { toast } from "sonner";

const SalonDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const salon = location.state?.salon || {
    name: "Glamour Studio",
    location: "Indiranagar, Bangalore",
    rating: 4.8,
    reviews: 245,
  };

  const services = [
    { name: "Classic Haircut", price: "₹300", duration: "30 min" },
    { name: "Premium Styling", price: "₹500", duration: "45 min" },
    { name: "Hair Spa", price: "₹800", duration: "60 min" },
    { name: "Beard Grooming", price: "₹200", duration: "20 min" },
    { name: "Full Package", price: "₹1200", duration: "90 min" },
  ];

  const gallery = [salonHero, serviceCutting, serviceMassage, serviceCutting];

  const testimonials = [
    { name: "Rahul Sharma", rating: 5, text: "Excellent service! Very professional staff." },
    { name: "Priya Patel", rating: 5, text: "Best salon in the area. Highly recommended!" },
    { name: "Amit Kumar", rating: 4, text: "Good experience overall. Will visit again." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={salonHero}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Action Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={() => toast.success("Share functionality coming soon!")}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-white" />
              <span className="font-semibold">{salon.rating}</span>
              <span className="opacity-90">({salon.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold text-sm truncate">{salon.location}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-full bg-secondary/50">
                <Clock className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="font-semibold text-sm">9 AM - 9 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Services Offered</h2>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <span className="font-bold text-primary">{service.price}</span>
                  </div>
                  {index < services.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <div className="space-y-4">
              {testimonials.map((review, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                  {index < testimonials.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Book Now Button */}
        <div className="sticky bottom-4 z-10">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-4">
              <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={() => toast.success("Booking functionality coming soon!")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;
