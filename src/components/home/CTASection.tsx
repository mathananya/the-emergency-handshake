import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-primary -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Lead Emergency Care in Your Network
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join top hospital chains already optimizing capacity and capturing more critical cases with live readiness data.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-base font-semibold"
          >
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
