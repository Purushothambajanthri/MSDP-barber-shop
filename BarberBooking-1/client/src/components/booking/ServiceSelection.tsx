import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import type { BookingData } from "@/pages/booking";
import type { Service } from "@shared/schema";

interface ServiceSelectionProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export default function ServiceSelection({
  bookingData,
  updateBookingData,
}: ServiceSelectionProps) {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<number>>(
    new Set(bookingData.selectedServices.map(s => s.id))
  );

  useEffect(() => {
    if (services) {
      const selectedServices = services
        .filter(service => selectedServiceIds.has(service.id))
        .map(service => ({
          id: service.id,
          name: service.name,
          price: parseFloat(service.price),
          quantity: 1,
        }));

      const totalAmount = selectedServices.reduce(
        (sum, service) => sum + service.price * service.quantity,
        0
      );

      updateBookingData({ selectedServices, totalAmount });
    }
  }, [selectedServiceIds, services, updateBookingData]);

  const handleServiceToggle = (serviceId: number, checked: boolean) => {
    const newSelected = new Set(selectedServiceIds);
    if (checked) {
      newSelected.add(serviceId);
    } else {
      newSelected.delete(serviceId);
    }
    setSelectedServiceIds(newSelected);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading services...</span>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = selectedServiceIds.has(service.id);
            const isCombo = service.name.toLowerCase().includes('combo') || 
                           service.name.toLowerCase().includes('package') ||
                           service.name.toLowerCase().includes('beard + hair cut + color');
            
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-primary bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => handleServiceToggle(service.id, !isSelected)}
              >
                <CardContent className="p-4 relative">
                  {isCombo && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs">
                      COMBO
                    </Badge>
                  )}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleServiceToggle(service.id, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {service.name}
                          </h4>
                          {service.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {service.description}
                            </p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-accent ml-2">
                          ₹{parseFloat(service.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {bookingData.selectedServices.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Selected Services:</span>
            <span className="text-2xl font-bold text-accent">
              ₹{bookingData.totalAmount}
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {bookingData.selectedServices.map((service) => (
              <div
                key={service.id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>{service.name}</span>
                <span>₹{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
