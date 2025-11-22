import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, Sparkles, Calendar, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-6">
          <Scissors className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary">
            BeautyBook
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your Ultimate Salon Booking Experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-card shadow-md">
            <div className="p-4 rounded-full bg-primary/10">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">Easy Booking</h3>
            <p className="text-sm text-muted-foreground">Book your favorite salon in seconds</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-card shadow-md">
            <div className="p-4 rounded-full bg-secondary/50">
              <MapPin className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold">Find Nearby</h3>
            <p className="text-sm text-muted-foreground">Discover top salons near you</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-card shadow-md">
            <div className="p-4 rounded-full bg-accent/50">
              <Sparkles className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">Premium Services</h3>
            <p className="text-sm text-muted-foreground">Access exclusive treatments</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="h-14 text-lg px-8"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 text-lg px-8"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
