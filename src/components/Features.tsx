import { Calendar, Zap, BarChart3, Brain, PiggyBank, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Automated Contributions",
    description: "Set it and forget it. Contributions happen automatically via M-Pesa on your schedule.",
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: Zap,
    title: "Instant Loans",
    description: "Get emergency funds in seconds. No paperwork, no waiting—just instant approval based on your history.",
    gradient: "from-secondary to-green-600",
  },
  {
    icon: BarChart3,
    title: "Transparent Accounting",
    description: "Every shilling tracked. Real-time reports show exactly where your money is and how it's growing.",
    gradient: "from-accent to-orange-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Smart predictions help your group make better financial decisions and maximize returns.",
    gradient: "from-purple-500 to-primary",
  },
  {
    icon: PiggyBank,
    title: "Profit Sharing Made Easy",
    description: "Automatically calculate and distribute dividends. Fair, transparent, and effortless.",
    gradient: "from-secondary to-teal-500",
  },
  {
    icon: Shield,
    title: "Secure M-Pesa Integration",
    description: "Bank-level security with M-Pesa. Your money is protected every step of the way.",
    gradient: "from-primary to-indigo-600",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything Your Chama Needs
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for Kenyan communities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-soft transition-smooth border-2 hover:border-primary/20 group"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-smooth`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
