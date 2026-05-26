import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scan, Armchair, Zap, ShieldCheck, Users, DownloadCloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: "AI Room Analysis",
      description: "Proprietary vision models intelligently analyze room dimensions, existing lighting, and architectural details to ensure perfect perspective."
    },
    {
      icon: <Armchair className="w-6 h-6" />,
      title: "50+ Furniture Styles",
      description: "Curated collections ranging from Scandinavian minimalist to luxury classic, designed by professional interior decorators."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "60-Second Turnaround",
      description: "Instant results using dedicated enterprise GPU clusters. No more waiting days for manual renders or dealing with queues."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Commercial Licensing",
      description: "All staged images are fully cleared for MLS, print marketing, and digital advertising without copyright concerns."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Workspaces",
      description: "Collaborate seamlessly. Share workspaces with agents, clients, and marketing teams with granular role permissions."
    },
    {
      icon: <DownloadCloud className="w-6 h-6" />,
      title: "Export & Delivery",
      description: "High-resolution 4K downloads, instant shareable presentation links, and direct synchronization with your CRM."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="features" className="py-24 bg-background relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-3">Platform Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Everything you need to stage at scale.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              We built StageRightPro to handle the volume and quality demands of top-tier real estate teams. No compromises, just results.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
