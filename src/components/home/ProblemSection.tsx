import { AlertTriangle, Clock, XCircle } from "lucide-react";

const problems = [
  {
    icon: XCircle,
    title: "Gate-Side Rejections",
    description: "Ambulances arrive at hospitals only to be turned away because beds are full—wasting critical time and risking patient outcomes.",
  },
  {
    icon: Clock,
    title: "Blind Routing Decisions",
    description: "Crews route by distance, not by actual ER capacity. The 'nearest' hospital isn't always the 'ready' hospital.",
  },
  {
    icon: AlertTriangle,
    title: "Communication Blackout",
    description: "No real-time data flows between ambulances and ERs. Hospitals react to sirens instead of preparing for arrivals.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Emergency Care Gap
          </h2>
          <p className="text-lg text-muted-foreground">
            In an era of instant everything, emergency care still relies on luck and guesswork.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
