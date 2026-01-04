import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ambulance } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--hero-gradient)" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Ambulance className="w-4 h-4" />
            <span>Real-time Emergency Coordination</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up">
            Every Second Counts.{" "}
            <span className="text-primary">Every Bed Matters.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in-delay-1">
            We bridge the critical gap between moving ambulances and hospital ERs, 
            ensuring every patient arrives at a bed that's ready for them.
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-delay-2">
            Trusted by leading hospital networks and ambulance fleets across the country.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
            <Button asChild size="lg" className="text-base">
              <Link to="/contact">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/contact">
                Request Integration to Your Fleet
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
