import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("hhf_farm_session", JSON.stringify({
      farmName: "My Farm",
      region: "Vélez-Málaga",
      farmSize: "",
      plots: [],
      hasSoilKit: true,
    }));
    navigate("/platform");
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto flex items-center h-16 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2C7 4 4 9 4 14c0 3 1.5 5.5 4 7 1-2 2-5 2-8 0-2 .5-4 2-6 1.5 2 2 4 2 6 0 3 1 6 2 8 2.5-1.5 4-4 4-7 0-5-3-10-8-12z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">High Hanging Fruit</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <LogIn size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Login to MyPlatform</h1>
            <p className="text-sm text-muted-foreground mt-1">Access your farm insights and management tools</p>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email">Username / Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="maria@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={128}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/onboarding" className="text-primary font-medium hover:underline">
                    Request Your Free Soil Kit
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
