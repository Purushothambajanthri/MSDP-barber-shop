import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Medal } from "lucide-react";
import sreeramuluImage from "@assets/IMG-20231219-WA0006_1753179660622.jpg";
import purushothamImage from "@assets/IMG_20220112_203001_1753179646371.jpg";

const barbers = [
  {
    id: 1,
    name: "Bajanthri Sreeramulu",
    age: 51,
    experience: "45+ years",
    phone: "9573761730",
    image: sreeramuluImage,
    description: "Known for mastery in all traditional and modern hair styles. Friendly, humble, and highly respected in the community.",
    specialties: ["Traditional Cuts", "Modern Styles", "Expert"],
    badge: "Master Barber",
    badgeColor: "bg-accent text-gray-900",
  },
  {
    id: 2,
    name: "Bajanthri Purushotham",
    age: 22,
    experience: "12+ years",
    phone: "9381625471",
    image: purushothamImage,
    description: "Skilled in trending youth styles, fades, beard shaping, and kids cuts. Energetic, updated with modern techniques, and customer-friendly.",
    specialties: ["Youth Styles", "Fades", "Kids Cuts"],
    badge: "Skilled Barber",
    badgeColor: "bg-secondary text-white",
  },
];

export default function BarbersSection() {
  return (
    <section id="barbers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Barbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skilled professionals with decades of combined experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {barbers.map((barber) => (
            <div key={barber.id} className="barber-card">
              <img
                src={barber.image}
                alt={`${barber.name} - ${barber.badge}`}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {barber.name}
                  </h3>
                  <Badge className={barber.badgeColor}>
                    {barber.badge}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>Age {barber.age}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Medal className="mr-2 h-4 w-4 text-primary" />
                    <span>{barber.experience} Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-2 h-4 w-4 text-primary" />
                    <a
                      href={`tel:+91${barber.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {barber.phone}
                    </a>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{barber.description}</p>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary text-white"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
