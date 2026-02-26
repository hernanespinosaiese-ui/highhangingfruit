import { useState } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, FlaskConical, Truck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";

const steps = [
  { icon: Package, title: "We send your kit", desc: "Receive a soil sampling kit with clear instructions." },
  { icon: FlaskConical, title: "Collect & return", desc: "Take samples from a few spots on your farm and send them back." },
  { icon: Truck, title: "Lab analysis", desc: "Our lab processes your samples within 7–10 days." },
  { icon: BarChart3, title: "Get your insights", desc: "Receive a full report with tailored recommendations on the platform." },
];

const RequestKit = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Request Your Soil Kit
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Start your journey to smarter farming. We'll send everything you need to get your soil analysed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Card key={step.title} className="text-center border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold text-secondary uppercase">Step {i + 1}</span>
                  <h3 className="font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle size={64} className="text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Request Received!</h2>
              <p className="text-muted-foreground">
                We'll be in touch within 2 business days to arrange your soil kit delivery.
              </p>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Your Details</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="María García" required />
                    </div>
                    <div>
                      <Label htmlFor="farm">Farm Name</Label>
                      <Input id="farm" placeholder="Finca Los Mangos" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location / Municipality</Label>
                      <Input id="location" placeholder="Vélez-Málaga" required />
                    </div>
                    <div>
                      <Label htmlFor="size">Farm Size (hectares)</Label>
                      <Input id="size" type="number" placeholder="2.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="maria@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Notes</Label>
                    <Textarea id="message" placeholder="Tell us about your farm or any specific concerns..." rows={4} />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RequestKit;
