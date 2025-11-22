import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Mail, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack?: () => void;
  onContinue?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  showVerifiedScreen?: boolean;
  verifiedMessage?: string;
  continueButtonText?: string;
}

const OTPVerification = ({
  email,
  onVerify,
  onResend,
  onBack,
  onContinue,
  isLoading = false,
  title = "Verify OTP",
  description = "Enter the OTP sent to your email",
  showVerifiedScreen = true,
  verifiedMessage = "Your email has been verified successfully!",
  continueButtonText = "Continue",
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      await onVerify(otp);
      if (showVerifiedScreen) {
        setIsVerified(true);
        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setIsResending(true);
    try {
      await onResend();
      setCooldown(60); // 60 second cooldown
      setOtp("");
    } catch (error) {
      // Error already handled in onResend
    } finally {
      setIsResending(false);
    }
  };

  // Show verified screen
  if (isVerified && showVerifiedScreen) {
    return (
      <Card className="w-full max-w-md p-8 space-y-6 animate-scale-in shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold">OTP Verified!</h1>
          <p className="text-muted-foreground">
            {verifiedMessage}
          </p>
          <div className="pt-2">
            <p className="text-sm font-semibold text-primary">{email}</p>
          </div>
        </div>

        {onContinue && (
          <Button
            className="w-full h-12 text-lg"
            onClick={handleContinue}
          >
            {continueButtonText}
          </Button>
        )}

        {onBack && !onContinue && (
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={onBack}
          >
            Back
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-8 space-y-6 animate-scale-in shadow-lg">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading || isVerifying}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}

      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
          <Mail className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm font-semibold text-primary mt-2">{email}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-center block">Enter 6-digit OTP</Label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isLoading || isVerifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <Button
          className="w-full h-12 text-lg"
          onClick={handleVerify}
          disabled={isLoading || isVerifying || otp.length !== 6}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the OTP?
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={isResending || cooldown > 0 || isLoading}
          >
            {cooldown > 0 ? (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Resend in {cooldown}s
              </span>
            ) : isResending ? (
              "Resending..."
            ) : (
              "Resend OTP"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OTPVerification;

