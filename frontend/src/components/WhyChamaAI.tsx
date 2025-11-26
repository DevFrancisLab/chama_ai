import { Check } from "lucide-react";

const benefits = [
  "Save 10+ hours every month on manual record-keeping",
  "Zero calculation errors—AI handles all the math",
  "Never miss a contribution with automatic reminders",
  "Build credit history for your members",
  "Access group performance analytics in real-time",
  "Reduce disputes with transparent, immutable records",
  "Scale from 5 to 500 members effortlessly",
  "Mobile-first design—works on any smartphone",
];

const WhyChamaAI = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-light via-secondary-light to-accent-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Chamas Trust Us
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              We understand the heart of table banking—community, trust, and shared growth. 
              That's why thousands of groups across Kenya choose Chama AI to manage their finances.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-foreground/90 font-medium group-hover:text-foreground transition-smooth">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card rounded-3xl shadow-2xl p-8 border-2 border-primary/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground font-medium">Success Rate</span>
                  <span className="text-2xl font-bold text-secondary">98.5%</span>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground font-medium">Avg. Loan Approval</span>
                  <span className="text-2xl font-bold text-primary">2 minutes</span>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground font-medium">Member Satisfaction</span>
                  <span className="text-2xl font-bold text-accent-foreground">4.9/5.0</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Money Saved/Year</span>
                  <span className="text-2xl font-bold text-secondary">KSh 50,000+</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-xl">
                <p className="text-sm text-center text-muted-foreground italic">
                  "Chama AI transformed how we operate. What used to take days now takes minutes."
                </p>
                <p className="text-sm text-center text-foreground font-semibold mt-2">
                  — Mary K., Nairobi Women's Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChamaAI;
