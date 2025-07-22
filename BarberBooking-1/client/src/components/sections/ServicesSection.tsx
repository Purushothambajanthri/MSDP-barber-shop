import { Badge } from "@/components/ui/badge";
import { 
  Scissors, 
  Palette, 
  Star, 
  Baby, 
  Droplets, 
  Hand,
  Smile,
  Sparkles
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Beard Cut/Trim",
    price: 40,
    description: "Professional beard shaping and trimming",
    icon: Scissors,
  },
  {
    id: 2,
    name: "Hair Cut (with trimmer)",
    price: 60,
    description: "Modern haircut with electric trimmer finish",
    icon: Scissors,
  },
  {
    id: 3,
    name: "Hair Cut (without trimmer)",
    price: 70,
    description: "Traditional scissor-only haircut",
    icon: Scissors,
  },
  {
    id: 4,
    name: "Hair Coloring",
    price: 50,
    description: "Professional hair coloring service",
    icon: Palette,
  },
  {
    id: 5,
    name: "Beard + Hair Cut + Color",
    price: 120,
    description: "Complete package deal",
    icon: Star,
    isCombo: true,
  },
  {
    id: 6,
    name: "Kids Hair Cut",
    price: 50,
    description: "Gentle haircuts for children",
    icon: Baby,
  },
  {
    id: 7,
    name: "Baby Hair Cut",
    price: 60,
    description: "Special care for baby's first haircut",
    icon: Baby,
  },
  {
    id: 8,
    name: "Head Wash",
    price: 40,
    description: "Refreshing hair wash and conditioning",
    icon: Droplets,
  },
  {
    id: 9,
    name: "Head & Body Massage",
    price: 100,
    description: "Relaxing full massage therapy",
    icon: Sparkles,
  },
  {
    id: 10,
    name: "Head Massage Only",
    price: 40,
    description: "Relaxing head massage service",
    icon: Hand,
  },
  {
    id: 11,
    name: "Face Wash",
    price: 50,
    description: "Deep cleansing facial treatment",
    icon: Smile,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services & Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional grooming services with transparent pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="service-card relative"
              >
                {service.isCombo && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white">
                    COMBO
                  </Badge>
                )}
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="text-primary text-2xl" />
                  <span className="text-2xl font-bold text-accent">
                    ₹{service.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
