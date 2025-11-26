import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Grace Wanjiku",
    role: "Chairlady, Pamoja Women's Chama",
    location: "Nairobi",
    content: "Before Chama AI, we spent hours every meeting just reconciling contributions. Now it's automatic and transparent. Our members trust the system completely.",
    rating: 5,
    initials: "GW",
  },
  {
    name: "John Kamau",
    role: "Treasurer, Umoja Youth Group",
    location: "Kisumu",
    content: "The instant loan feature saved me during an emergency. I got approved in 2 minutes based on my contribution history. Incredible!",
    rating: 5,
    initials: "JK",
  },
  {
    name: "Faith Njeri",
    role: "Secretary, Tumaini Savings Circle",
    location: "Eldoret",
    content: "The AI insights helped us identify the best investment opportunities. We've grown our group savings by 40% in just six months.",
    rating: 5,
    initials: "FN",
  },
  {
    name: "Daniel Omondi",
    role: "Member, Harambee Traders Chama",
    location: "Mombasa",
    content: "As a busy trader, I love the M-Pesa automation. My contributions happen on time, every time, without me lifting a finger.",
    rating: 5,
    initials: "DO",
  },
  {
    name: "Alice Muthoni",
    role: "Chairperson, Maisha Bora Group",
    location: "Nakuru",
    content: "The transparent accounting ended all the disputes we used to have. Everyone can see where every shilling goes. Pure peace of mind.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Peter Mwangi",
    role: "Organizer, Vijana Pamoja",
    location: "Thika",
    content: "We started with 10 members. Now we're 50 strong, and Chama AI handles everything seamlessly. Couldn't have scaled without it.",
    rating: 5,
    initials: "PM",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Loved by Communities Across Kenya
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real chama members
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-soft transition-smooth"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
