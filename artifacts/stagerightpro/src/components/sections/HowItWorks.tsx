import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      num: "01",
      title: "Upload Your Photo",
      desc: "Drag & drop any photo of an empty room. Our system automatically enhances the base image and identifies floor plans.",
      visual: (
        <div className="w-full h-full relative bg-card border border-border rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-8">
          <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-xl flex flex-col items-center justify-center bg-background/50">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="text-sm font-medium text-muted-foreground">Drag & drop image here</div>
          </div>
        </div>
      )
    },
    {
      num: "02",
      title: "Choose Your Style",
      desc: "Select from curated furniture collections that match the property's target demographic and architectural style.",
      visual: (
        <div className="w-full h-full relative bg-card border border-border rounded-2xl overflow-hidden shadow-inner p-6 flex flex-col gap-4">
          <div className="h-1/2 w-full rounded-xl bg-gradient-to-br from-primary/10 to-primary/30 border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 h-1/3">
            <div className="rounded-lg bg-background border border-border"></div>
            <div className="rounded-lg bg-accent/20 border-2 border-accent"></div>
            <div className="rounded-lg bg-background border border-border"></div>
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Download & Deliver",
      desc: "Get photorealistic results instantly. Download high-resolution files ready for MLS and your marketing materials.",
      visual: (
        <div className="w-full h-full relative bg-card border border-border rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-6">
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900 border border-border shadow-lg flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/40 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/40 rounded-full blur-2xl"></div>
            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-xl border border-border/50">
              <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-5xl text-foreground mb-6 tracking-tight" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
            Staged in three steps.
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-24 last:mb-0">
              {/* Connecting line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[39px] md:left-[50%] top-24 bottom-[-6rem] w-px bg-border -z-10 hidden md:block">
                  <motion.div 
                    className="w-full bg-accent"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: "100%" } : { height: 0 }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.5) }}
                  />
                </div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Text Content */}
                <div className="flex-1 w-full relative">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-full bg-background border border-border items-center justify-center text-2xl font-serif font-bold text-accent shadow-sm z-10">
                      {step.num}
                    </div>
                    <div>
                      <div className="md:hidden text-accent font-serif font-bold text-xl mb-2">{step.num}</div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full h-[300px] lg:h-[400px]">
                  {step.visual}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { background-position: -200% 0; }
        }
      `}} />
    </section>
  );
}
