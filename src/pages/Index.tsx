import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, CloudSun, FlaskConical, AlertTriangle, Clock, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-mango-grove.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const problemCards = [
  {
    icon: Droplets,
    stat: "40%",
    label: "of Málaga mango farms face water stress",
  },
  {
    icon: Clock,
    stat: "2–3 weeks",
    label: "per decade — climate windows for planting are shifting",
  },
  {
    icon: Mountain,
    stat: "5 km",
    label: "Soil composition varies dramatically within just 5 km",
  },
];

const pillars = [
  {
    id: "soil",
    icon: FlaskConical,
    title: "Soil & Water Intelligence",
    summary: "Lab-tested insights from your own soil and water samples.",
    details:
      "We collect a handful of soil and water samples from your farm. Lab analysis returns actionable insights: nutrient profiles, pH, mineral content, and water quality. You get personalized recommendations on crop variety selection, optimal planting timing, and soil amendments.",
  },
  {
    id: "climate",
    icon: CloudSun,
    title: "Climate-Resilient Planning",
    summary: "Connect your soil data to hyperlocal climate predictions.",
    details:
      "See how shifting temperatures, rainfall patterns, and frost risk windows affect your specific farm. Get recommendations on which mango varieties and planting schedules are most resilient for the next 1, 3, and 5 years.",
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Management & Advisory",
    summary: "Optimize irrigation for quality, not just quantity.",
    details:
      "Best practices for irrigation scheduling, deficit irrigation for mango quality, and avoiding overwatering. Advisory on rainwater collection, storage systems, and services available in the Málaga region. Ensure mangos develop optimal sugar content and texture.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        <div className="relative container mx-auto px-4 lg:px-8 py-24">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-primary-foreground mb-6"
            >
              Smarter Soil.{" "}
              <span className="text-secondary">Resilient Crops.</span>{" "}
              Every Drop Counts.
            </motion.h1>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed"
            >
              We help Málaga's mango farmers make data-driven decisions through
              soil analysis, climate forecasting, and water management.
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/request-kit">Request Your Free Soil Kit</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                onClick={() => document.getElementById('solution-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Solution
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
              <AlertTriangle size={16} />
              The Challenge
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Small farmers deserve precision agriculture
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.stat}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full text-center border-none shadow-lg bg-card">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                      <card.icon className="text-secondary" size={28} />
                    </div>
                    <p className="text-4xl font-extrabold text-foreground mb-2">{card.stat}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="solution-section" className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Solution
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground max-w-4xl mx-auto">
              Our solution to achieve thriving farms
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full border-none shadow-lg bg-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                      {i + 1}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <pillar.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-3">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to know your soil?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Request your soil kit today and get personalized insights within two weeks.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base px-10">
            <Link to="/request-kit">Request Your Soil Kit</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
