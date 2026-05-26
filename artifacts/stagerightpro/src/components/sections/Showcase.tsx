import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Loader2, Check, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

type StyleType = "Modern Minimal" | "Warm Contemporary" | "Luxury Classic" | "Scandinavian" | "Industrial";

const styleData: Record<StyleType, { 
  confidence: number, 
  valueAdd: string, 
  items: string[],
  colors: string
}> = {
  "Modern Minimal": {
    confidence: 96.2,
    valueAdd: "+$45,000",
    items: ["Low-profile sofa", "Geometric coffee table", "Abstract canvas art", "Monochrome rug"],
    colors: "from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-900 border-stone-200 dark:border-stone-700"
  },
  "Warm Contemporary": {
    confidence: 98.1,
    valueAdd: "+$52,000",
    items: ["Bouclé sectional", "Walnut credenza", "Brass floor lamp", "Textured neutral rug"],
    colors: "from-orange-50 to-amber-100 dark:from-amber-900/40 dark:to-orange-900/40 border-amber-200 dark:border-amber-800"
  },
  "Luxury Classic": {
    confidence: 94.5,
    valueAdd: "+$85,000",
    items: ["Tufted velvet sofa", "Marble accent tables", "Crystal chandelier", "Persian rug"],
    colors: "from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-900 border-slate-300 dark:border-slate-700"
  },
  "Scandinavian": {
    confidence: 97.8,
    valueAdd: "+$38,000",
    items: ["Light oak dining set", "Linen armchair", "Minimalist pendant", "Jute rug"],
    colors: "from-neutral-50 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700"
  },
  "Industrial": {
    confidence: 92.4,
    valueAdd: "+$42,000",
    items: ["Leather chesterfield", "Reclaimed wood table", "Exposed bulb fixture", "Vintage cowhide"],
    colors: "from-zinc-300 to-zinc-500 dark:from-zinc-800 dark:to-zinc-950 border-zinc-400 dark:border-zinc-700"
  }
};

export function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [activeStyle, setActiveStyle] = useState<StyleType>("Warm Contemporary");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const styles: StyleType[] = [
    "Modern Minimal", 
    "Warm Contemporary", 
    "Luxury Classic", 
    "Scandinavian", 
    "Industrial"
  ];

  const handleStyleChange = (style: StyleType) => {
    if (style === activeStyle || isProcessing) return;
    
    setIsProcessing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setActiveStyle(style);
      setIsProcessing(false);
    }, 1200);
  };

  const data = styleData[activeStyle];

  return (
    <section id="showcase" className="py-24 bg-card border-y border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-3">See the Transformation</p>
          <h2 className="text-3xl md:text-5xl text-foreground mb-6 tracking-tight" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
            From vacant to vibrant.
          </h2>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Visual Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Image Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-20"
                  >
                    <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                    <div className="text-lg font-medium text-foreground">Analyzing room architecture...</div>
                    <div className="text-sm text-muted-foreground mt-2">Applying {activeStyle} furnishings</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeStyle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${data.colors} flex items-center justify-center p-8`}
                  >
                    {/* Abstract representation of the styled room based on the selected style */}
                    <div className="w-full h-full relative border border-border/20 rounded-xl overflow-hidden shadow-inner bg-background/10 backdrop-blur-sm">
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-foreground/5 rounded-lg border border-foreground/10 shadow-xl flex items-center justify-center">
                        <div className="text-foreground/30 font-serif italic text-2xl">{activeStyle}</div>
                      </div>
                      <div className="absolute bottom-0 w-full h-[20%] bg-foreground/10 backdrop-blur-md"></div>
                      <div className="absolute top-10 right-10 w-20 h-32 bg-accent/20 rounded-full blur-xl"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border">
                {activeStyle} View
              </div>
            </div>

            {/* Style Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeStyle === style 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-background border border-border text-foreground hover:border-primary/50"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sidebar Info Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full xl:w-80 flex flex-col gap-6"
          >
            <div className="bg-background rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 pb-4 border-b border-border">Analysis Report</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Style Match Confidence</span>
                    <span className="font-bold text-primary">{data.confidence}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${data.confidence}%` }}
                      key={`confidence-${activeStyle}`}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Est. Value Added</div>
                  <div className="text-2xl font-bold text-foreground">{data.valueAdd}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-3">Detected Additions</div>
                  <ul className="space-y-2">
                    {data.items.map((item, i) => (
                      <li key={i} className="flex items-center text-sm font-medium">
                        <Check className="w-4 h-4 mr-2 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="font-semibold text-lg mb-2 relative z-10">Want to try it yourself?</h3>
              <p className="text-primary-foreground/80 text-sm mb-6 relative z-10">Upload your own photo and see the magic in real-time.</p>
              <Link href="/demo">
                <Button variant="secondary" className="w-full relative z-10 bg-background text-foreground hover:bg-background/90">
                  Launch Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
