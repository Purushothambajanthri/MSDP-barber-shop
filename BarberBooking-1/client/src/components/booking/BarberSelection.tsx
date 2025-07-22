import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Phone, Calendar, Medal } from "lucide-react";
import type { BookingData } from "@/pages/booking";
import type { Barber } from "@shared/schema";
import sreeramuluImage from "@assets/IMG-20231219-WA0006_1753179660622.jpg";
import purushothamImage from "@assets/IMG_20220112_203001_1753179646371.jpg";

interface BarberSelectionProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

// Map barber names to images
const barberImages: Record<string, string> = {
  "Bajanthri Sreeramulu": sreeramuluImage,
  "Bajanthri Purushotham": purushothamImage,
};

export default function BarberSelection({
  bookingData,
  updateBookingData,
}: BarberSelectionProps) {
  const { data: barbers, isLoading } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  const handleBarberSelection = (barberId: string) => {
    updateBookingData({ selectedBarber: parseInt(barberId) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading barbers...</span>
      </div>
    );
  }

  if (!barbers || barbers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No barbers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Barber</h3>
        <RadioGroup
          value={bookingData.selectedBarber?.toString() || ""}
          onValueChange={handleBarberSelection}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {barbers.map((barber) => (
            <div key={barber.id} className="relative">
              <RadioGroupItem
                value={barber.id.toString()}
                id={`barber-${barber.id}`}
                className="sr-only"
              />
              <Label
                htmlFor={`barber-${barber.id}`}
                className="cursor-pointer"
              >
                <Card
                  className={`transition-all duration-200 hover:shadow-lg ${
                    bookingData.selectedBarber === barber.id
                      ? 'ring-2 ring-primary bg-blue-50'
                      : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <img
                        src={barberImages[barber.name] || "/placeholder-barber.jpg"}
                        alt={barber.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{barber.name}</h4>
                        <Badge 
                          className={
                            barber.experience >= 40 
                              ? "bg-accent text-gray-900"
                              : "bg-secondary text-white"
                          }
                        >
                          {barber.experience >= 40 ? "Master Barber" : "Skilled Barber"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center justify-center text-gray-600">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          <span>Age {barber.age}</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-600">
                          <Medal className="mr-2 h-4 w-4 text-primary" />
                          <span>{barber.experience}+ Years Experience</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-primary" />
                          <span>{barber.phone}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {barber.description}
                      </p>

                      <div className="flex flex-wrap gap-1 justify-center">
                        {barber.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-primary text-white"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
