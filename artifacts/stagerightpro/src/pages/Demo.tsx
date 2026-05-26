import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Loader2, Download, RefreshCw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Step = "upload" | "processing" | "result";

export default function Demo() {
  const [step, setStep] = useState<Step>("upload");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleUpload = () => {
    setStep("processing");
  };

  const resetDemo = () => {
    setStep("upload");
    setProgress(0);
  };

  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("result"), 500);
            return 100;
          }
          // Slow down towards the end for suspense
          const increment = prev > 80 ? 2 : prev > 50 ? 5 : 10;
          return prev + increment;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your high-resolution staged image is downloading.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-xl font-bold tracking-tight">
            StageRight<span className="text-accent">Pro</span> <span className="text-muted-foreground font-normal text-sm ml-2">Interactive Demo</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 bg-muted/20">
        <Card className="w-full max-w-4xl bg-card shadow-2xl border-border/60 overflow-hidden rounded-2xl relative">
          <AnimatePresence mode="wait">
            
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-12 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Upload className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Upload an empty room</h2>
                <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                  Drag and drop a photo of a vacant room, or click to browse. We'll automatically stage it in our signature Warm Contemporary style.
                </p>
                
                <div 
                  className="w-full max-w-2xl border-2 border-dashed border-border rounded-xl p-16 flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={handleUpload}
                >
                  <Wand2 className="h-12 w-12 text-muted-foreground group-hover:text-accent transition-colors mb-4" />
                  <p className="font-medium text-foreground mb-1">Click here to start the demo</p>
                  <p className="text-sm text-muted-foreground">Uses a sample empty living room image</p>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-16 flex flex-col items-center justify-center min-h-[500px]"
              >
                <Loader2 className="h-16 w-16 text-accent animate-spin mb-8" />
                <h2 className="text-2xl font-bold mb-2">AI is staging your room...</h2>
                <p className="text-muted-foreground mb-8 h-6">
                  {progress < 30 && "Analyzing room dimensions and perspective..."}
                  {progress >= 30 && progress < 60 && "Mapping natural lighting sources..."}
                  {progress >= 60 && progress < 90 && "Selecting contemporary furnishings..."}
                  {progress >= 90 && "Rendering photorealistic shadows..."}
                </p>
                
                <div className="w-full max-w-md bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-accent"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "tween", ease: "linear" }}
                  />
                </div>
                <div className="mt-2 text-sm font-mono text-muted-foreground">{progress}%</div>
              </motion.div>
            )}

            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-full"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
                  <div>
                    <h2 className="text-xl font-bold">Transformation Complete</h2>
                    <p className="text-sm text-muted-foreground">Style: Warm Contemporary • Confidence: 98.1%</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={resetDemo} className="rounded-full">
                      <RefreshCw className="mr-2 h-4 w-4" /> Try Another
                    </Button>
                    <Button onClick={handleDownload} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                      <Download className="mr-2 h-4 w-4" /> Download 4K
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-muted/30">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border shadow-lg">
                    {/* Simulated Staged Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center">
                       <div className="w-[80%] h-[80%] relative border border-border/20 rounded-xl overflow-hidden shadow-inner bg-background/20 backdrop-blur-sm">
                          <div className="absolute bottom-0 w-full h-[30%] bg-foreground/10 backdrop-blur-md"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-serif italic text-foreground/50">Staged Result</div>
                          <div className="absolute bottom-10 left-[20%] w-[30%] h-[25%] bg-primary/80 rounded-2xl shadow-xl"></div>
                          <div className="absolute bottom-[20%] right-[15%] w-[15%] h-[30%] bg-accent/60 rounded-full blur-md"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </Card>
      </main>
    </div>
  );
}
