import { Leaf, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">EcoReport</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Working together to keep our communities clean and environmentally safe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#report" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Report Dumping
                </a>
              </li>
              <li>
                <a href="#ideas" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Recycling Ideas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Video Tutorials</li>
              <li className="text-muted-foreground text-sm">Flowcharts</li>
              <li className="text-muted-foreground text-sm">Home Remedies</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                NA
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                NA
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Punjab</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} EcoReport. All rights reserved. Together for a cleaner planet.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
