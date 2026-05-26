import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden bg-primary text-primary-foreground" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Your next listing <br/><span className="font-serif italic text-accent font-normal">deserves better.</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 font-light leading-relaxed">
            Join 8,000+ real estate professionals who've transformed their listings, decreased time-on-market, and elevated their brand with StageRightPro.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="rounded-full px-8 h-14 text-base bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl shadow-accent/20 w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full sm:w-auto">
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
