import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Scissors } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      toast.success("Login successful!");
      navigate("/main");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md p-8 space-y-6 animate-scale-in shadow-lg">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
            <Scissors className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">BeautyBook</h1>
          <p className="text-muted-foreground">Welcome back! Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>

          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => toast.info("Password reset functionality coming soon!")}
          >
            Forgot Password?
          </button>

          <Button type="submit" className="w-full h-12 text-lg">
            Login
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
            >
              Register
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
