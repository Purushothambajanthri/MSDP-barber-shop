import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BarbersSection from "@/components/sections/BarbersSection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BarbersSection />
      <LocationSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold">Sreeramulu Classic Cuts</span>
              </div>
              <p className="text-gray-400">
                Professional barbering services with 45+ years of experience in Kristipadu Village.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('barbers')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    Our Barbers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    Location
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <p className="text-gray-400">Kristipadu Village</p>
                <p className="text-gray-400">Anantapur District, AP 515455</p>
                <p className="text-gray-400">Phone: 9573761730 / 9381625471</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Sreeramulu Classic Cuts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
