import { Building2, Truck, CheckCircle } from "lucide-react";

const hospitalBenefits = [
  "Maximize high-acuity admissions with predictive arrival data",
  "Eliminate ER bottlenecks through coordinated patient flow",
  "Prepare trauma teams before the ambulance arrives",
  "Optimize bed utilization across your entire network",
];

const fleetBenefits = [
  "Zero gate-side rejections—every dispatch is a guaranteed admission",
  "30% faster crew turnaround with confirmed handoffs",
  "Route by hospital capability, not just the nearest zip code",
  "Digital paper trail for every patient handover",
];

const BenefitsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Benefits for Everyone in the Chain
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you run a hospital network or an ambulance fleet, MedLink transforms your operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Hospital Benefits */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">For Hospitals</h3>
            </div>
            <ul className="space-y-4">
              {hospitalBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet Benefits */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Truck className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">For Ambulance Fleets</h3>
            </div>
            <ul className="space-y-4">
              {fleetBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
