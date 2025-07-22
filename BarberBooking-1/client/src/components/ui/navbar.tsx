import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scissors, Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Scissors className="text-primary text-2xl mr-2" />
            <span className="text-xl font-bold text-gray-900">
              Sreeramulu Classic Cuts
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <Link href="/services">
                <button className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                  Services
                </button>
              </Link>
              <Link href="/barbers">
                <button className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                  Our Barbers
                </button>
              </Link>
              <button
                onClick={() => scrollToSection('location')}
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/booking">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-gray-900"
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mobile-menu-enter">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-900 hover:text-primary"
            >
              Home
            </button>
            <Link href="/services">
              <button className="block w-full text-left px-3 py-2 text-gray-900 hover:text-primary">
                Services
              </button>
            </Link>
            <Link href="/barbers">
              <button className="block w-full text-left px-3 py-2 text-gray-900 hover:text-primary">
                Our Barbers
              </button>
            </Link>
            <button
              onClick={() => scrollToSection('location')}
              className="block w-full text-left px-3 py-2 text-gray-900 hover:text-primary"
            >
              Location
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-900 hover:text-primary"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
