import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Community
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chama AI
              </h3>
              <span className="text-muted-foreground text-sm">
                © {currentYear} All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-primary-light transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-primary-light transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-primary-light transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-primary-light transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
