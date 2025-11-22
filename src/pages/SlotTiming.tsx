import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Service {
  name: string;
  price: string;
  duration: string;
}

const SlotTiming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const salon = location.state?.salon || {
    name: "Glamour Studio",
    location: "Indiranagar, Bangalore",
  };
  const selectedService = location.state?.selectedService || {
    name: "Full Package",
    price: "₹1200",
    duration: "90 min",
  };
  const selectedServices = location.state?.selectedServices as Service[] | undefined;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate time slots from 9 AM to 9 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      const time12 = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
      const time24 = `${hour.toString().padStart(2, "0")}:00`;
      slots.push({ label: time12, value: time24, available: Math.random() > 0.3 });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    
    navigate("/payment-method", {
      state: {
        salon,
        selectedService,
        selectedServices: selectedServices || [selectedService],
        selectedDate,
        selectedSlot,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Select Time Slot</h1>
            <p className="text-sm text-muted-foreground">{salon.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Service Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedServices && selectedServices.length > 1 ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-semibold text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.duration}</p>
                      </div>
                      <span className="font-bold text-primary">{service.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-primary">{selectedService.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedService.duration}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{selectedService.name}</span>
                  <span className="font-bold text-primary">{selectedService.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedService.duration}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Available Time Slots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedSlot === slot.value ? "default" : "outline"}
                  disabled={!slot.available}
                  onClick={() => slot.available && setSelectedSlot(slot.value)}
                  className="h-12 relative"
                >
                  {slot.label}
                  {!slot.available && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 text-xs px-1"
                    >
                      Booked
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date & Time Display */}
        {selectedDate && selectedSlot && (
          <Card className="border-0 shadow-md bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Date & Time</p>
                  <p className="font-semibold">
                    {format(selectedDate, "PPP")} at{" "}
                    {timeSlots.find((s) => s.value === selectedSlot)?.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="sticky bottom-4 z-10">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-4">
              <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={handleContinue}
                disabled={!selectedDate || !selectedSlot}
              >
                Continue to Book
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SlotTiming;

