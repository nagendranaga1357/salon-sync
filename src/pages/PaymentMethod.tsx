import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {
    salon: { name: "Glamour Studio" },
    selectedService: { name: "Full Package", price: "₹1200" },
    selectedDate: new Date(),
    selectedSlot: "10:00",
  };

  const [paymentType, setPaymentType] = useState<"full" | "advance">("advance");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get numeric price value
  const getPriceValue = (priceString: string): number => {
    const numericValue = priceString.replace(/[₹,]/g, "");
    return parseFloat(numericValue) || 0;
  };

  const totalAmount = getPriceValue(bookingData.selectedService.price);
  const advanceAmount = Math.round(totalAmount * 0.1); // 10% advance
  const payableAmount = paymentType === "full" ? totalAmount : advanceAmount;

  // Load Razorpay script
  useEffect(() => {
    // Check if script already exists
    if (window.Razorpay || document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.id = "razorpay-checkout-script";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("razorpay-checkout-script");
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (isProcessing) return;

    // For demo purposes, we'll use test keys
    // In production, these should come from your backend via API call
    // IMPORTANT: Replace this with your actual Razorpay Key ID from your backend
    const RAZORPAY_KEY_ID = process.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag";

    if (!window.Razorpay) {
      toast.error("Payment gateway is loading. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);

    try {
      // In production, create order on your backend and get order details
      // For now, using mock order details
      const orderOptions = {
        key: RAZORPAY_KEY_ID,
        amount: payableAmount * 100, // Amount in paise
        currency: "INR",
        name: "Salon Sync",
        description: `Booking for ${bookingData.selectedService.name}`,
        image: "/favicon.ico",
        order_id: `order_${Date.now()}`, // This should come from your backend
        handler: function (response: any) {
          setIsProcessing(false);
          // Payment success - navigate to confirmation
          navigate("/booking-confirmation", {
            state: {
              salon: bookingData.salon,
              selectedService: bookingData.selectedService,
              selectedServices: bookingData.selectedServices || [bookingData.selectedService],
              selectedDate: bookingData.selectedDate,
              selectedSlot: bookingData.selectedSlot,
              paymentDetails: {
                type: paymentType,
                amount: payableAmount,
                totalAmount: totalAmount,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              },
            },
          });
          toast.success("Payment successful!");
        },
        prefill: {
          name: "Customer Name", // Get from user profile
          email: "customer@example.com", // Get from user profile
          contact: "9999999999", // Get from user profile
        },
        notes: {
          booking_type: "salon_booking",
          service: bookingData.selectedService.name,
          salon: bookingData.salon.name,
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(orderOptions);
      razorpay.open();
    } catch (error) {
      setIsProcessing(false);
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
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
            <h1 className="text-xl font-bold">Payment Method</h1>
            <p className="text-sm text-muted-foreground">Choose your payment option</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Booking Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Salon</span>
              <span className="font-semibold">{bookingData.salon.name}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-muted-foreground">Service{bookingData.selectedServices?.length > 1 ? "s" : ""}</span>
              <div className="text-right">
                {bookingData.selectedServices && bookingData.selectedServices.length > 1 ? (
                  <div className="space-y-1">
                    {bookingData.selectedServices.map((service: any, index: number) => (
                      <div key={index} className="font-semibold text-sm">
                        {service.name} - {service.price}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="font-semibold">{bookingData.selectedService.name}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-semibold">
                {format(new Date(bookingData.selectedDate), "PPP")} at {selectedTimeSlot}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-muted-foreground">Service Charge</span>
              <span className="font-bold text-lg">₹{totalAmount.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Select Payment Method
            </CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentType} onValueChange={(value: "full" | "advance") => setPaymentType(value)}>
              <div className="space-y-4">
                {/* Full Payment Option */}
                <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="full" id="full" className="mt-1" />
                  <Label htmlFor="full" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Full Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Pay the complete service charge now
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        ₹{totalAmount.toLocaleString()}
                      </Badge>
                    </div>
                  </Label>
                </div>

                {/* Advance Payment Option */}
                <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors relative">
                  <RadioGroupItem value="advance" id="advance" className="mt-1" />
                  <Label htmlFor="advance" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">Advance Payment</p>
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          10% advance payment required to confirm booking
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Remaining ₹{(totalAmount - advanceAmount).toLocaleString()} to be paid at salon
                        </p>
                      </div>
                      <Badge variant="default" className="ml-2">
                        ₹{advanceAmount.toLocaleString()}
                      </Badge>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Amount Display */}
        <Card className="border-0 shadow-md bg-primary/5">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Type</span>
                <span className="font-semibold capitalize">{paymentType} Payment</span>
              </div>
              {paymentType === "advance" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Charge</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-lg font-semibold">Amount to Pay</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{payableAmount.toLocaleString()}
                </span>
              </div>
              {paymentType === "advance" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Minimum 10% advance is compulsory to confirm the service</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <div className="sticky bottom-4 z-10">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-4">
              <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ₹${payableAmount.toLocaleString()} via RazorPay`}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Secure payment powered by RazorPay
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

