import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="space-y-6">
            <Link href="/">
              <div
                className="text-xl tracking-tight cursor-pointer"
                style={{ fontFamily: "var(--app-font-display)", fontWeight: 700 }}
              >
                StageRight<span className="text-accent">Pro</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Transform empty rooms into magazine-worthy, photorealistic staged spaces using AI. Trusted by top real estate professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Features</a></li>
              <li><a href="#showcase" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Style Gallery</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">API & Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Stay ahead in PropTech</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Join our newsletter for the latest in AI staging and real estate tech.
            </p>
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border-border focus-visible:ring-accent"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StageRightPro. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
