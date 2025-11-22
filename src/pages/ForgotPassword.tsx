import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import OTPVerification from "@/components/OTPVerification";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - In production, this would call your backend to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production: await sendOTP(email, "password_reset");
      toast.success("OTP sent to your email successfully!");
      setStep("otp");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    // Simulate API call - In production, this would verify OTP with your backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In production: await verifyOTP(email, otp);
    // For demo, accept any 6-digit OTP
    if (otp.length === 6) {
      setOtpVerified(true);
      // Don't navigate yet, wait for verified screen continue
    } else {
      throw new Error("Invalid OTP");
    }
  };

  const handleContinueAfterVerification = () => {
    setStep("reset");
  };

  const handleResendOTP = async () => {
    // Simulate API call - In production, this would resend OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In production: await sendOTP(email, "password_reset");
    toast.success("OTP resent successfully!");
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <OTPVerification
          email={email}
          onVerify={handleOTPVerify}
          onResend={handleResendOTP}
          onBack={() => setStep("email")}
          onContinue={handleContinueAfterVerification}
          title="Verify OTP for Password Reset"
          description="Enter the OTP sent to your email to reset your password"
          showVerifiedScreen={true}
          verifiedMessage="Your email has been verified successfully! You can now reset your password."
          continueButtonText="Reset Password"
        />
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <ResetPassword email={email} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md p-8 space-y-6 animate-scale-in shadow-lg">
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">Forgot Password?</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you an OTP to reset your password
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground">Remember your password? </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;

