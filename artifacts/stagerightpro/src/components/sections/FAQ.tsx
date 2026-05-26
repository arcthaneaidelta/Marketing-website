import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Are the staged images high enough quality for print marketing?",
      answer: "Yes. Our Professional and Enterprise tiers deliver Ultra 4K resolution (3840x2160) images that are perfectly suited for high-end print brochures, magazines, and large-format displays without any pixelation."
    },
    {
      question: "How long does the staging process actually take?",
      answer: "Processing time is typically under 60 seconds per image, regardless of the room complexity. Our enterprise GPU infrastructure ensures you aren't waiting in queues, even during peak hours."
    },
    {
      question: "Do I own the rights to the staged images?",
      answer: "Absolutely. All images generated on paid plans come with full commercial licensing. You own the derivative works and can use them across MLS, social media, and print without attribution or royalty concerns."
    },
    {
      question: "What types of source images work best?",
      answer: "For optimal results, use well-lit, high-resolution photos taken from a natural viewing angle (chest height) capturing 2-3 walls. We support standard formats including JPG, PNG, and HEIC up to 25MB."
    },
    {
      question: "Can I use StageRightPro for exterior staging or landscaping?",
      answer: "Currently, our models are highly specialized and trained exclusively for interior spaces. Exterior staging and virtual landscaping are on our roadmap for Q4."
    },
    {
      question: "How does the team workspace function work?",
      answer: "The Professional plan includes 3 seats. You can invite agents or marketing staff to a shared workspace where all original and staged assets are pooled. You can also create shareable links for clients to view portfolios."
    },
    {
      question: "Is there an API available for my brokerage's custom software?",
      answer: "Yes, our Enterprise tier includes full REST API access, webhooks, and comprehensive documentation to integrate our staging engine directly into your proprietary CRM or listing management software."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 14-day free trial so you can evaluate the quality before committing. If you choose to subscribe and are unhappy for any reason, we offer a prorated refund within the first 30 days of your subscription."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-muted/20" ref={ref}>
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-3">Common Questions</p>
          <h2 className="text-3xl md:text-5xl text-foreground mb-6 tracking-tight" style={{ fontFamily: "var(--app-font-display)", fontWeight: 800 }}>
            Everything you need to know.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 data-[state=open]:border-accent/50 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
