import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, MapPin, Star, Clock, Phone, Share2 } from "lucide-react";
import salonHero from "@/assets/salon-hero.jpg";
import serviceCutting from "@/assets/service-cutting.jpg";
import serviceMassage from "@/assets/service-massage.jpg";
import { toast } from "sonner";

interface Service {
  name: string;
  price: string;
  duration: string;
}

const SalonDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const salon = location.state?.salon || {
    name: "Glamour Studio",
    location: "Indiranagar, Bangalore",
    rating: 4.8,
    reviews: 245,
  };

  const services: Service[] = [
    { name: "Classic Haircut", price: "₹300", duration: "30 min" },
    { name: "Premium Styling", price: "₹500", duration: "45 min" },
    { name: "Hair Spa", price: "₹800", duration: "60 min" },
    { name: "Beard Grooming", price: "₹200", duration: "20 min" },
    { name: "Full Package", price: "₹1200", duration: "90 min" },
  ];

  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // Get numeric price value
  const getPriceValue = (priceString: string): number => {
    const numericValue = priceString.replace(/[₹,]/g, "");
    return parseFloat(numericValue) || 0;
  };

  // Calculate total price of selected services
  const getTotalPrice = (): number => {
    return selectedServices.reduce((total, index) => {
      return total + getPriceValue(services[index].price);
    }, 0);
  };

  // Toggle service selection
  const toggleService = (index: number) => {
    setSelectedServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Get combined duration (simplified - you might want to calculate based on service overlap)
  const getCombinedDuration = (): string => {
    if (selectedServices.length === 0) return "0 min";
    // For simplicity, sum up all durations. In real app, you might want to handle overlaps
    const totalMinutes = selectedServices.reduce((total, index) => {
      const duration = services[index].duration.replace(/\s*min\s*/i, "");
      return total + parseInt(duration) || 0;
    }, 0);
    return `${totalMinutes} min`;
  };

  const handleBookNow = () => {
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    const selectedServiceList = selectedServices.map((index) => services[index]);
    const totalPrice = getTotalPrice();
    const combinedDuration = getCombinedDuration();

    // Create a combined service object for the booking flow
    const combinedService: Service = {
      name: selectedServiceList.length === 1 
        ? selectedServiceList[0].name 
        : `${selectedServiceList.length} Services Selected`,
      price: `₹${totalPrice.toLocaleString()}`,
      duration: combinedDuration,
    };

    navigate("/slot-timing", {
      state: {
        salon,
        selectedService: combinedService,
        selectedServices: selectedServiceList, // Pass individual services for details
      },
    });
  };

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
            <p className="text-sm text-muted-foreground">Select one or more services to book</p>
            <div className="space-y-3">
              {services.map((service, index) => {
                const isSelected = selectedServices.includes(index);
                return (
                  <div key={index}>
                    <div className="flex items-center gap-3 py-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleService(index)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <span className="font-bold text-primary">{service.price}</span>
                      </div>
                    </div>
                    {index < services.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
            {selectedServices.length > 0 && (
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedServices.length} Service{selectedServices.length > 1 ? "s" : ""} Selected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Duration: {getCombinedDuration()}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            )}
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
            <CardContent className="p-4 space-y-2">
              {selectedServices.length > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-lg">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              )}
              <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={handleBookNow}
                disabled={selectedServices.length === 0}
              >
                {selectedServices.length === 0
                  ? "Select Services to Book"
                  : `Book Now (${selectedServices.length} Service${selectedServices.length > 1 ? "s" : ""})`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;
