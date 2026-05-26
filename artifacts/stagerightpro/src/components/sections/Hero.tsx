import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, CheckCircle2 } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [sliderPosition, setSliderPosition] = useState(52);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const roomsStaged = useCountUp(12847, 2500, true, isInView);

  const handleDrag = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent | React.MouseEvent).clientX;
    const pos = Math.min(Math.max(((x - rect.left) / rect.width) * 100, 2), 98);
    setSliderPosition(pos);
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    const move = (e: MouseEvent) => { if (isDragging) handleDrag(e); };
    const tEnd = () => setIsDragging(false);
    const tMove = (e: TouchEvent) => { if (isDragging) handleDrag(e); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tMove, { passive: false });
    window.addEventListener("touchend", tEnd);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tMove);
      window.removeEventListener("touchend", tEnd);
    };
  }, [isDragging]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-24"
    >
      {/* Warm radial glow — the only background decoration */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, hsl(38 55% 82% / 0.55) 0%, transparent 70%)",
        }}
      />

      {/* ─── Copy block ─── */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div {...fadeUp(0.05)} className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-muted-foreground mb-10 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            StageRightPro v2.0 is now live
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.18)}
            className="mb-7 leading-[1.05] tracking-[-0.02em]"
          >
            <span
              className="block text-[clamp(3rem,9vw,6.5rem)] text-foreground"
              style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}
            >
              Virtual Staging,
            </span>
            <span
              className="block text-[clamp(2.8rem,8.5vw,6rem)] italic text-foreground"
              style={{ fontFamily: "var(--app-font-serif)", fontWeight: 600 }}
            >
              Reimagined.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.3)} className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Transform empty rooms into fully-staged, photorealistic interiors in under 60 seconds. Trusted by 8,000+ real estate professionals worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              className="rounded-full px-8 h-13 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-[0_8px_40px_-8px_hsl(36_25%_9%/0.35)] w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5"
              data-testid="button-start-staging"
            >
              Start Staging Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-13 text-sm font-medium border-border/70 hover:bg-muted/60 hover:border-border w-full sm:w-auto group transition-all duration-300"
              data-testid="button-watch-demo"
            >
              <Play className="mr-2 h-3.5 w-3.5 group-hover:text-accent transition-colors fill-current" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeUp(0.46)} className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground/70 font-medium">
            {["No credit card required", "RESO certified", "SOC 2 compliant", "14-day free trial"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent/80 flex-shrink-0" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Before / After slider ─── */}
        <motion.div
          initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div
            ref={sliderRef}
            className="relative h-[360px] md:h-[540px] w-full rounded-3xl overflow-hidden border border-border/40 cursor-ew-resize select-none shadow-[0_32px_80px_-16px_hsl(36_25%_9%/0.18)]"
            onMouseDown={(e) => { setIsDragging(true); handleDrag(e); }}
            onTouchStart={(e) => { setIsDragging(true); handleDrag(e); }}
          >
            {/* AFTER — staged room */}
            <div className="absolute inset-0 overflow-hidden" style={{ background: "hsl(38 28% 84%)" }}>
              {/* Floor */}
              <div className="absolute bottom-0 left-0 right-0 h-[38%]" style={{ background: "linear-gradient(to top, hsl(32 25% 70%), hsl(35 22% 78%))" }} />
              {/* Back wall */}
              <div className="absolute top-0 left-0 right-0 h-[62%]" style={{ background: "linear-gradient(160deg, hsl(40 30% 90%) 0%, hsl(38 25% 84%) 100%)" }} />
              {/* Large window light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28%] h-[55%]" style={{ background: "linear-gradient(to bottom, hsl(45 50% 95%), hsl(40 30% 88%))", borderBottom: "none", boxShadow: "0 0 60px 20px hsl(45 60% 90% / 0.6)" }} />
              {/* Sofa */}
              <div className="absolute" style={{ bottom: "30%", left: "12%", width: "45%", height: "18%", background: "linear-gradient(135deg, hsl(25 30% 50%), hsl(20 25% 40%))", borderRadius: "12px 12px 4px 4px" }} />
              <div className="absolute" style={{ bottom: "44%", left: "12%", width: "45%", height: "6%", background: "hsl(22 28% 55%)", borderRadius: "8px" }} />
              {/* Sofa pillows */}
              <div className="absolute" style={{ bottom: "44%", left: "18%", width: "10%", height: "10%", background: "hsl(38 42% 72%)", borderRadius: "8px" }} />
              <div className="absolute" style={{ bottom: "44%", left: "31%", width: "9%", height: "9%", background: "hsl(35 30% 65%)", borderRadius: "8px" }} />
              {/* Coffee table */}
              <div className="absolute" style={{ bottom: "27%", left: "28%", width: "22%", height: "5%", background: "hsl(28 35% 38%)", borderRadius: "4px" }} />
              <div className="absolute" style={{ bottom: "22%", left: "31%", width: "2px", height: "6%", background: "hsl(28 35% 30%)" }} />
              <div className="absolute" style={{ bottom: "22%", left: "47%", width: "2px", height: "6%", background: "hsl(28 35% 30%)" }} />
              {/* Floor lamp */}
              <div className="absolute" style={{ bottom: "30%", right: "20%", width: "1.5%", height: "32%", background: "hsl(35 20% 55%)", borderRadius: "2px" }} />
              <div className="absolute" style={{ bottom: "60%", right: "18.5%", width: "5%", height: "3%", background: "hsl(45 50% 85%)", borderRadius: "50%", boxShadow: "0 0 20px 8px hsl(45 60% 90% / 0.5)" }} />
              {/* Art frame */}
              <div className="absolute" style={{ top: "10%", left: "22%", width: "22%", height: "30%", background: "hsl(36 20% 94%)", border: "3px solid hsl(36 15% 75%)", borderRadius: "4px" }}>
                <div style={{ position: "absolute", inset: 8, background: "linear-gradient(135deg, hsl(32 30% 72%), hsl(28 25% 60%))", borderRadius: "2px" }} />
              </div>
              {/* Rug */}
              <div className="absolute" style={{ bottom: "28%", left: "20%", width: "38%", height: "4%", background: "hsl(38 35% 68%)", borderRadius: "50%", opacity: 0.5 }} />
              {/* Warm overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, hsl(32 25% 62% / 0.25) 100%)" }} />
            </div>

            {/* BEFORE — empty room, clips from left */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0" style={{ background: "hsl(220 8% 82%)", width: `${100 / (sliderPosition / 100)}%` }}>
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[38%]" style={{ background: "linear-gradient(to top, hsl(220 8% 72%), hsl(220 8% 78%))" }} />
                {/* Wall */}
                <div className="absolute top-0 left-0 right-0 h-[62%]" style={{ background: "linear-gradient(160deg, hsl(220 6% 88%) 0%, hsl(220 6% 82%) 100%)" }} />
                {/* Window */}
                <div className="absolute top-0" style={{ left: "50%", transform: "translateX(-50%)", width: "28%", height: "55%", background: "linear-gradient(to bottom, hsl(210 20% 92%), hsl(215 15% 85%))", boxShadow: "0 0 30px 10px hsl(210 20% 88% / 0.4)" }} />
                {/* Empty floor shadow */}
                <div className="absolute bottom-[37%] left-0 right-0 h-px" style={{ background: "hsl(220 10% 65%)" }} />
                {/* Baseboard line */}
                <div className="absolute bottom-[37.5%] left-0 right-0 h-[1.5%]" style={{ background: "hsl(220 8% 76%)" }} />
                {/* Wall socket */}
                <div className="absolute" style={{ bottom: "42%", left: "15%", width: "2%", height: "2.5%", background: "hsl(220 8% 74%)", borderRadius: "2px", border: "1px solid hsl(220 8% 65%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 70%, hsl(220 8% 82% / 0.8) 100%)" }} />
              </div>
            </div>

            {/* Divider line + handle */}
            <div className="absolute inset-y-0 z-20 flex items-center" style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}>
              <div className="w-[2px] h-full bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
              <div className="absolute w-11 h-11 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-center border border-white/80 transition-transform duration-150 hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/50">
                  <path d="M5 3L1 8l4 5M11 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
              Empty
            </div>
            <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
              Staged with AI
            </div>
          </div>

          {/* Floating card — AI confidence */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
            style={{ animation: "heroFloat 7s ease-in-out infinite", animationDelay: "1.2s" }}
            className="absolute -left-4 md:-left-14 top-[22%] bg-background/95 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-[0_8px_32px_-8px_hsl(36_25%_9%/0.15)] z-30 hidden sm:block w-52"
          >
            <div className="text-[11px] text-muted-foreground font-medium mb-2 tracking-wide">AI Confidence</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold" style={{ fontFamily: "var(--app-font-display)" }}>97.4%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "97.4%" } : {}}
                transition={{ duration: 1.8, delay: 1.2, ease: EASE }}
                className="bg-accent h-full rounded-full"
              />
            </div>
          </motion.div>

          {/* Floating card — live counter */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
            style={{ animation: "heroFloat 9s ease-in-out infinite", animationDelay: "0.5s" }}
            className="absolute -right-4 md:-right-14 bottom-[22%] bg-background/95 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-[0_8px_32px_-8px_hsl(36_25%_9%/0.15)] z-30 hidden sm:block w-56"
          >
            <div className="text-[11px] text-muted-foreground font-medium mb-1 tracking-wide">Rooms staged today</div>
            <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--app-font-display)" }}>
              {roomsStaged.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-accent font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Live processing
            </div>
          </motion.div>

          {/* Style swatch card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
            style={{ animation: "heroFloat 8s ease-in-out infinite", animationDelay: "2s" }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-5 bg-background/95 backdrop-blur-md p-3 rounded-2xl border border-border/60 shadow-[0_8px_32px_-8px_hsl(36_25%_9%/0.15)] z-30 hidden md:flex items-center gap-3"
          >
            <span className="text-[11px] font-medium text-muted-foreground pr-3 border-r border-border">Styles</span>
            <div className="flex gap-2">
              {[
                "linear-gradient(135deg,hsl(38,22%,80%),hsl(35,18%,68%))",
                "linear-gradient(135deg,hsl(220,15%,25%),hsl(220,15%,15%))",
                "linear-gradient(135deg,hsl(22,40%,70%),hsl(25,35%,55%))",
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-lg border border-border/40 ${i === 1 ? "ring-2 ring-accent ring-offset-1 ring-offset-background" : ""}`}
                  style={{ background: bg }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent animate-bounce" />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}} />
    </section>
  );
}
