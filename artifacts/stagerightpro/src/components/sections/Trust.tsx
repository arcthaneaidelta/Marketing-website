import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const agents = useCountUp(8000, 2000, true, isInView);
  const rooms = useCountUp(2400000, 2500, true, isInView);
  const faster = useCountUp(94, 2000, true, isInView);

  const brands = [
    "Meridian Properties",
    "Luxe Living Group",
    "Apex Realty Co.",
    "Summit Estate Partners",
    "Coastal Luxury Homes",
    "Prestige Group",
    "Urban Edge Properties",
    "Highline Residences"
  ];

  const testimonials = [
    {
      quote: "StageRightPro cut our marketing turnaround time from weeks to hours. The photorealism is unmatched in the industry.",
      name: "Sarah Jenkins",
      title: "Marketing Director",
      company: "Meridian Properties"
    },
    {
      quote: "We've seen a 32% increase in showing requests since switching to AI staging. The return on investment is immediate.",
      name: "David Chen",
      title: "Principal Broker",
      company: "Luxe Living Group"
    },
    {
      quote: "The ability to show clients the same room in three different styles instantly has transformed how we sell empty luxury homes.",
      name: "Elena Rodriguez",
      title: "Senior Partner",
      company: "Highline Residences"
    }
  ];

  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-8">
            Trusted by leading real estate firms
          </p>
          
          {/* Logo Marquee */}
          <div className="relative flex overflow-x-hidden w-full max-w-5xl mx-auto mask-image-linear">
            <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
              {[...brands, ...brands].map((brand, i) => (
                <span key={i} className="mx-8 text-xl font-serif text-muted-foreground/60 italic">
                  {brand}
                </span>
              ))}
            </div>
            <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex items-center">
              {[...brands, ...brands].map((brand, i) => (
                <span key={i} className="mx-8 text-xl font-serif text-muted-foreground/60 italic">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-border/50 my-16 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl text-foreground mb-2 flex items-center justify-center" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
              {agents.toLocaleString()}+
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Agents Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl text-foreground mb-2 flex items-center justify-center" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
              {(rooms / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Rooms Staged</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl text-foreground mb-2 flex items-center justify-center" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
              {faster}%
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Faster Than Traditional</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
            >
              <Card className="h-full bg-background border-border/50 hover:border-accent/50 transition-colors duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-8 flex-grow leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.title}, {t.company}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-linear {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 35s linear infinite;
        }
      `}} />
    </section>
  );
}
