import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      priceMonthly: 29,
      priceAnnual: 23,
      desc: "Perfect for independent agents starting to use AI staging.",
      features: [
        "50 rooms per month",
        "3 core architectural styles",
        "Standard HD resolution",
        "Basic email support",
        "48-hour retainment"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      priceMonthly: 89,
      priceAnnual: 71,
      desc: "For growing teams that need premium quality and volume.",
      features: [
        "250 rooms per month",
        "All 50+ curated styles",
        "Ultra 4K print-ready resolution",
        "Priority 24/7 support",
        "Team workspace (up to 3 users)",
        "Commercial licensing",
        "Remove watermarks"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      desc: "For brokerages requiring API access and white-labeling.",
      features: [
        "Unlimited rooms",
        "Custom style training",
        "API & webhook access",
        "Dedicated account manager",
        "Unlimited team members",
        "White-label delivery",
        "SSO & SAML integration"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-3">Simple Pricing</p>
          <h2 className="text-3xl md:text-5xl text-foreground mb-6 tracking-tight" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
            Scale your business, not your costs.
          </h2>
          
          <div className="flex items-center justify-center mt-10 space-x-4">
            <Label htmlFor="billing-toggle" className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-accent"
            />
            <Label htmlFor="billing-toggle" className={`text-sm font-medium flex items-center ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annually <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400">Save 20%</span>
            </Label>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative ${plan.popular ? 'z-10' : 'z-0'}`}
            >
              <Card className={`relative h-full flex flex-col bg-card/50 backdrop-blur-sm transition-all duration-300 ${
                plan.popular 
                  ? 'border-accent shadow-2xl md:-translate-y-4 md:scale-105 bg-card' 
                  : 'border-border/60 hover:border-border'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pt-8 text-center pb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex justify-center items-baseline mb-2">
                    {typeof plan.priceMonthly === 'number' ? (
                      <>
                        <span className="text-4xl font-extrabold tracking-tight text-foreground">
                          ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                        </span>
                        <span className="text-muted-foreground ml-1 font-medium">/mo</span>
                      </>
                    ) : (
                      <span className="text-4xl font-extrabold tracking-tight text-foreground">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-accent mr-3 shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button 
                    className={`w-full h-12 text-base font-medium rounded-xl ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
