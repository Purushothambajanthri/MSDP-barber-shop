import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { BookingData } from "@/pages/booking";
import type { Chair } from "@shared/schema";

interface ChairSelectionProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const chairImages: Record<string, string> = {
  "Chair 1": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
  "Chair 2": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
};

export default function ChairSelection({
  bookingData,
  updateBookingData,
}: ChairSelectionProps) {
  const { data: chairs, isLoading } = useQuery<Chair[]>({
    queryKey: ['/api/chairs'],
  });

  const handleChairSelection = (chairId: string) => {
    updateBookingData({ selectedChair: parseInt(chairId) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading chairs...</span>
      </div>
    );
  }

  if (!chairs || chairs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No chairs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Chair</h3>
        <RadioGroup
          value={bookingData.selectedChair?.toString() || ""}
          onValueChange={handleChairSelection}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {chairs.map((chair) => (
            <div key={chair.id} className="relative">
              <RadioGroupItem
                value={chair.id.toString()}
                id={`chair-${chair.id}`}
                className="sr-only"
              />
              <Label
                htmlFor={`chair-${chair.id}`}
                className="cursor-pointer"
              >
                <Card
                  className={`transition-all duration-200 hover:shadow-lg ${
                    bookingData.selectedChair === chair.id
                      ? 'ring-2 ring-primary bg-blue-50'
                      : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <img
                        src={chairImages[chair.name] || "/placeholder-chair.jpg"}
                        alt={chair.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-semibold text-lg mb-2">
                        {chair.name}
                        {chair.name.includes("1") && " - Classic"}
                        {chair.name.includes("2") && " - Modern"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {chair.description || 
                         (chair.name.includes("1") 
                           ? "Traditional barber chair with vintage styling"
                           : "Contemporary chair with advanced comfort")}
                      </p>
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
