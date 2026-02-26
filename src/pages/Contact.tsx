import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Have questions about our platform or soil kits? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Contact Info</h2>
              {[
                { icon: MapPin, label: "Location", value: "Málaga, Andalucía, Spain" },
                { icon: Mail, label: "Email", value: "hello@highhangingfruit.com" },
                { icon: Phone, label: "Phone", value: "+34 600 000 000" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <p className="text-sm font-medium text-foreground mb-2">Follow Us</p>
                <div className="flex gap-3">
                  {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full text-xs bg-muted text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <CheckCircle size={64} className="text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="p-8">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What's this about?" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell us more..." rows={5} required />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
