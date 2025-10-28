import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EcoReport</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </a>
            <a 
              href="#report" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Report Dumping
            </a>
            <a 
              href="#ideas" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Recycling Ideas
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
