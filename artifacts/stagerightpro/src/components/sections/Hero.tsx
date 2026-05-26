import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, CheckCircle2, ChevronRight, MousePointer2 } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const roomsStaged = useCountUp(12847, 2500, true, isInView);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX : (e as MouseEvent | React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDrag(e);
    };

    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleDrag(e);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
            StageRightPro v2.0 is now live
          </div>
          
          <h1
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}
          >
            Virtual Staging,<br />
            <span
              className="italic font-normal text-foreground/90"
              style={{ fontFamily: "var(--app-font-serif)", fontWeight: 400, fontSize: "0.95em" }}
            >Reimagined.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Transform empty rooms into fully-staged, photorealistic interiors in under 60 seconds. Trusted by 8,000+ real estate professionals worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button size="lg" className="rounded-full px-8 h-14 text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 w-full sm:w-auto">
              Start Staging Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-border hover:bg-muted/50 w-full sm:w-auto group">
              <Play className="mr-2 h-4 w-4 group-hover:text-accent transition-colors" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground/80 font-medium">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-accent" /> No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-accent" /> RESO certified
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-accent" /> SOC 2 compliant
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-accent" /> 14-day free trial
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          {/* Before/After Slider */}
          <div 
            ref={sliderRef}
            className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 cursor-ew-resize select-none bg-muted"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleDrag(e);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleDrag(e);
            }}
          >
            {/* After (Staged) - Base layer */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center overflow-hidden">
              {/* Abstract Representation of a staged room */}
              <div className="absolute bottom-0 w-[80%] h-[40%] bg-secondary rounded-t-[40px] transform -translate-x-10 shadow-lg"></div>
              <div className="absolute bottom-[5%] left-[20%] w-[30%] h-[25%] bg-primary/80 rounded-2xl shadow-xl"></div>
              <div className="absolute bottom-[20%] right-[15%] w-[15%] h-[30%] bg-accent/60 rounded-full blur-md"></div>
              <div className="absolute top-[20%] left-[30%] w-[40%] h-[30%] bg-muted border-4 border-border rounded-lg shadow-inner"></div>
              <div className="absolute top-0 right-[20%] w-[2px] h-[30%] bg-foreground/20"></div>
              <div className="absolute top-[30%] right-[15%] w-[10%] h-[5%] bg-accent rounded-full shadow-[0_0_15px_rgba(200,150,50,0.5)]"></div>
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            </div>

            {/* Before (Empty) - Top layer clipped */}
            <div 
              className="absolute inset-0 h-full bg-muted border-r-2 border-white/50 flex items-center justify-center overflow-hidden z-10"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Abstract Representation of an empty room */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                <div className="absolute bottom-0 w-full h-[30%] bg-foreground/5 transform -skew-y-2"></div>
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[30%] bg-foreground/5 border border-foreground/10 rounded-lg"></div>
                <div className="absolute top-0 right-[30%] w-[2px] h-[100%] bg-foreground/5"></div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center -ml-[2px]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-[4px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
              <div className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-border transition-transform hover:scale-110">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-muted-foreground/30 rounded-full"></div>
                  <div className="w-1 h-3 bg-muted-foreground/30 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6 z-20 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border/50">
              Empty Room
            </div>
            <div className="absolute top-6 right-6 z-10 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border/50">
              Staged with AI
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -left-4 md:-left-12 top-1/4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl z-30 hidden sm:block w-48"
          >
            <div className="text-xs text-muted-foreground font-medium mb-2">AI Confidence</div>
            <div className="flex justify-between items-end mb-1">
              <span className="text-xl font-bold">97.4%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "97.4%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="bg-accent h-full rounded-full"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -right-4 md:-right-12 bottom-1/4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl z-30 hidden sm:block w-52"
          >
            <div className="text-xs text-muted-foreground font-medium mb-1">Rooms staged today</div>
            <div className="text-2xl font-bold font-mono text-primary flex items-center">
              {roomsStaged.toLocaleString()}
            </div>
            <div className="text-[10px] text-accent mt-1 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1 animate-pulse" /> Live processing
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-background/95 backdrop-blur-md p-3 rounded-2xl border border-border shadow-xl z-30 hidden md:flex items-center space-x-3"
          >
            <div className="text-xs font-medium px-2 border-r border-border">Styles</div>
            <div className="flex space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-200 to-stone-400 border border-border/50"></div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 border border-border/50 ring-2 ring-accent ring-offset-2 ring-offset-background"></div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-300 border border-border/50"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-muted-foreground/50 animate-bounce"
      >
        <span className="text-xs mb-2">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
