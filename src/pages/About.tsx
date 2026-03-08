import { motion } from "framer-motion";
import { Leaf, Sun, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const team = [
  { name: "Hernán Espinosa", role: "Founder & CEO" },
  { name: "Ngoc Nguyen", role: "Head of Sales & Marketing" },
  { name: "María Peguero", role: "Head of External Relations" },
  { name: "Yan Chen", role: "Head of Engineering" },
  { name: "Mauricio Acuña", role: "Head of Finance" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.h1 custom={0} variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              About High Hanging Fruit
            </motion.h1>
            <motion.p custom={1} variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We're building the future of small-scale precision agriculture — starting with Málaga's mango farmers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Precision agriculture has long been the domain of large agribusiness — expensive sensors, complex software, and proprietary data. Small and medium farmers, the backbone of Mediterranean agriculture, have been left behind.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                High Hanging Fruit changes that. We combine affordable soil testing, climate science, and intuitive digital tools to give every farmer access to the insights they need to thrive.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We start in Málaga's Axarquía region — one of the few places in Europe where tropical fruit thrives — because the need is urgent and the opportunity is extraordinary.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, label: "Soil-First Approach", desc: "Every recommendation starts with your soil." },
                { icon: Sun, label: "Climate-Aware", desc: "Tailored to Mediterranean microclimates." },
                { icon: Users, label: "Farmer-Centric", desc: "Built by agronomists, for farmers." },
                { icon: Globe, label: "Locally Focused", desc: "Deep knowledge of Málaga & Axarquía." },
              ].map((item, i) => (
                <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Card className="h-full border-none shadow-sm">
                    <CardContent className="p-5">
                      <item.icon size={28} className="text-primary mb-3" />
                      <h3 className="font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Málaga */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">Why Málaga Mangos?</h2>
          <p className="text-primary-foreground/80 leading-relaxed mb-4">
            The Axarquía coast of Málaga is Europe's leading mango-growing region. Subtropical microclimates, unique soil composition, and a rich agricultural heritage make it ideal — but increasingly fragile.
          </p>
          <p className="text-primary-foreground/80 leading-relaxed">
            Climate change is shifting growing windows, rainfall is declining, and farmers need tools that work for their scale. We're here to help them adapt and thrive.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.role} className="border-none shadow-sm w-full sm:w-[calc(33.333%-1rem)]">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-2xl">
                    {member.avatar}
                  </div>
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <Globe size={14} />
            Versión en español — próximamente
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
