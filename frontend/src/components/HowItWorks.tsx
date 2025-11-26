import { Users, Smartphone, TrendingUp, Coins } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create Your Chama",
    description: "Set up your group in minutes. Invite members via phone number and define your contribution schedule.",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "Automate Contributions",
    description: "Members contribute via M-Pesa automatically. No manual tracking, no missed payments.",
    color: "secondary",
  },
  {
    icon: Coins,
    title: "Access Instant Loans",
    description: "Need quick cash? Get approved loans based on your contribution history—instantly.",
    color: "accent",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Track profits, share dividends, and watch your community wealth grow with AI insights.",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How Chama AI Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to transform your table banking group
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-soft transition-smooth h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${step.color}-light`}>
                      <Icon className={`h-6 w-6 text-${step.color}`} />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
