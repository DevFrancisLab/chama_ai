import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            <div className="md:hidden mr-2">
              <SidebarTrigger />
            </div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/chama_ai_logo.png"
                alt="Chama AI logo"
                title="Chama AI"
                className="h-10 w-10 object-contain rounded-md"
              />
              <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chama AI
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-smooth">
              How It Works
            </a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-smooth">
              Testimonials
            </a>
            <Link to="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary-dark">
                Get Started Free
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <a
              href="#features"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary-dark">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
