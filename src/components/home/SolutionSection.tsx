import { Radio, Database, Handshake } from "lucide-react";

const solutions = [
  {
    icon: Radio,
    title: "Live Capacity Broadcasting",
    description: "Hospitals broadcast real-time bed availability, ICU status, and specialist rosters to all connected ambulances.",
  },
  {
    icon: Database,
    title: "Smart Dispatch Matching",
    description: "Our platform matches patient needs with hospital capabilities—routing by readiness, not just proximity.",
  },
  {
    icon: Handshake,
    title: "The Confirmed Handshake",
    description: "Every dispatch gets a guaranteed bed confirmation before the ambulance even leaves. No surprises, no rejections.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The MedLink Solution
          </h2>
          <p className="text-lg text-muted-foreground">
            We replace guesswork with certainty—connecting every ambulance to every available bed in real-time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="relative bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 border border-primary/10"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <solution.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {solution.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {solution.description}
              </p>
              
              {/* Step number */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
