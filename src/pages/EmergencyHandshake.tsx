import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Truck,
  Building2,
  Activity,
  MapPin,
  Stethoscope,
  RefreshCw,
  FileCheck,
  Fuel,
} from "lucide-react";

const EmergencyHandshake = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up">
                Stop Flying Blind.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-delay-1">
                We bridge the data gap between moving ambulances and stationary ERs, 
                ensuring every patient lands in a bed that is ready for them.
              </p>
              <p className="text-2xl font-semibold text-primary animate-fade-in-delay-2">
                "Predictable Arrival. Absolute Readiness."
              </p>
            </div>
          </div>
        </section>

        {/* Outcome Cards */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              The Outcome
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 shadow-card border border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Fleets</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  Zero gate-side rejections and <span className="font-semibold text-foreground">30% faster</span> crew turnaround.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-card border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Hospitals</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  Maximize high-acuity admissions and <span className="font-semibold text-foreground">eliminate ER bottlenecks</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Patient & Provider Portal */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Patient & Provider Portal
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Check live facility status, ICU bed availability, and specialist on-call rosters across the network.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">
                  View Live Readiness Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Fleet Owners Switch */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
                Why Fleet Owners Switch
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Live Capability Routing
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Stop routing by distance; start routing by availability. Match patients to hospitals that can actually help them.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Digital Triage
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Send patient vitals to the trauma team before you even put the siren on. ERs prepare while you're en route.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Fuel className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Eliminate Rerouting
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Every "Go" is a guaranteed bed. Save fuel, save time, save lives.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Connect Your Fleet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Get the Tech Specs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyHandshake;
