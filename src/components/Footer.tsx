import { Link } from "react-router-dom";
import { MapPin, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path d="M12 2C7 4 4 9 4 14c0 3 1.5 5.5 4 7 1-2 2-5 2-8 0-2 .5-4 2-6 1.5 2 2 4 2 6 0 3 1 6 2 8 2.5-1.5 4-4 4-7 0-5-3-10-8-12z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-bold">High Hanging Fruit</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed">
              Precision agriculture for Málaga's mango farmers. Smarter soil insights, climate-resilient planning, and water management — all in one platform.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <Globe size={12} />
              <span>Versión en español — próximamente</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Platform", to: "/platform" },
                { label: "Request Soil Kit", to: "/onboarding" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Málaga, Andalucía, Spain</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail size={16} className="shrink-0" />
                <span>hello@highhangingfruit.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} High Hanging Fruit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
