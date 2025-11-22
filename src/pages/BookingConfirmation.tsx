import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {
    salon: { name: "Glamour Studio", location: "Indiranagar, Bangalore" },
    selectedService: { name: "Full Package", price: "₹1200", duration: "90 min" },
    selectedServices: [{ name: "Full Package", price: "₹1200", duration: "90 min" }],
    selectedDate: new Date(),
    selectedSlot: "10:00",
    paymentDetails: {
      type: "advance",
      amount: 120,
      totalAmount: 1200,
      paymentId: "pay_test123",
      orderId: "order_test123",
    },
  };

  // Format time slot to display format
  const formatTimeSlot = (time24: string): string => {
    const hour = parseInt(time24.split(":")[0]);
    if (hour === 0) return "12:00 AM";
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return "12:00 PM";
    return `${hour - 12}:00 PM`;
  };
  
  const selectedTimeSlot = formatTimeSlot(bookingData.selectedSlot || "10:00");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Your booking has been successfully confirmed. We're excited to serve you!
              </p>
            </div>

            {/* Booking Details */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Salon</p>
                  <p className="font-semibold">{bookingData.salon.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.salon.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Service{bookingData.selectedServices?.length > 1 ? "s" : ""}
                  </p>
                  {bookingData.selectedServices && bookingData.selectedServices.length > 1 ? (
                    <div className="space-y-2 mt-1">
                      {bookingData.selectedServices.map((service: any, index: number) => (
                        <div key={index} className="border-b pb-2 last:border-0">
                          <p className="font-semibold">{service.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">{service.duration}</p>
                            <p className="text-xs font-semibold">{service.price}</p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Total Duration: {bookingData.selectedService.duration}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold">{bookingData.selectedService.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Duration: {bookingData.selectedService.duration}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">
                    {format(new Date(bookingData.selectedDate), "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">at {selectedTimeSlot}</p>
                </div>
              </div>

              {bookingData.paymentDetails && (
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 rounded-full bg-primary/10">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="font-semibold capitalize">
                      {bookingData.paymentDetails.type} Payment
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Paid: ₹{bookingData.paymentDetails.amount.toLocaleString()}
                      {bookingData.paymentDetails.type === "advance" && (
                        <span>
                          {" "}
                          of ₹{bookingData.paymentDetails.totalAmount.toLocaleString()}
                        </span>
                      )}
                    </p>
                    {bookingData.paymentDetails.paymentId && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Payment ID: {bookingData.paymentDetails.paymentId}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Important Note */}
            {bookingData.paymentDetails?.type === "advance" && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                  Important Note
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  You've paid the advance amount. Please pay the remaining ₹
                  {(bookingData.paymentDetails.totalAmount - bookingData.paymentDetails.amount).toLocaleString()}{" "}
                  at the salon when you arrive for your service.
                </p>
              </div>
            )}

            {/* Back to Home Button */}
            <div className="pt-6">
              <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={() => navigate("/main")}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              A confirmation message has been sent to your email. Please arrive 10 minutes before
              your scheduled time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;

