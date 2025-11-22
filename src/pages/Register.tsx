import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Scissors } from "lucide-react";
import { toast } from "sonner";
import OTPVerification from "@/components/OTPVerification";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.gender || !formData.location || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const hasNumber = /\d/.test(formData.password);
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    if (!hasNumber || !hasLetter) {
      toast.error("Password must contain at least one letter and one number");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - In production, this would send OTP to email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production: await sendOTP(formData.email, "registration");
      toast.success("OTP sent to your email successfully!");
      setStep("otp");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    // Simulate API call - In production, this would verify OTP
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In production: await verifyOTP(formData.email, otp);
      
      // For demo, accept any 6-digit OTP
      if (otp.length !== 6) {
        throw new Error("Invalid OTP");
      }
      // Don't create account yet, wait for verified screen continue
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAfterVerification = async () => {
    // Create account after OTP verification
    setIsLoading(true);
    
    try {
      // Simulate API call - In production, this would create account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In production: await createAccount(formData);
      toast.success("Account created successfully!");
      navigate("/main");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // Simulate API call - In production, this would resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In production: await sendOTP(formData.email, "registration");
      toast.success("OTP resent successfully!");
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      throw error;
    }
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <OTPVerification
          email={formData.email}
          onVerify={handleOTPVerify}
          onResend={handleResendOTP}
          onBack={() => setStep("form")}
          onContinue={handleContinueAfterVerification}
          isLoading={isLoading}
          title="Verify Your Email"
          description="Enter the OTP sent to your email to complete registration"
          showVerifiedScreen={true}
          verifiedMessage="Your email has been verified successfully! Your account will be created now."
          continueButtonText="Continue"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md p-8 space-y-6 animate-scale-in shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
            <Scissors className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">Create Account</h1>
          <p className="text-muted-foreground">Join us and book your perfect salon experience</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="h-12"
            />
          </div>



          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter your city"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-12"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Send OTP & Continue"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
