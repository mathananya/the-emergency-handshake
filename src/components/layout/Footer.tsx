import { Link } from "react-router-dom";
import medimatchLogo from "@/assets/medimatch-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={medimatchLogo} 
                alt="MediMatch Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-lg font-bold text-foreground">MediMatch</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Predictable Arrival. Absolute Readiness.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/emergency-handshake"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              The Emergency Handshake
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MediMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
