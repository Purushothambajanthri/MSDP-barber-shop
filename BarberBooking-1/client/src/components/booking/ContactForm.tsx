import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { BookingData } from "@/pages/booking";

interface ContactFormProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export default function ContactForm({
  bookingData,
  updateBookingData,
}: ContactFormProps) {
  const handleInputChange = (field: keyof BookingData, value: string) => {
    updateBookingData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                type="text"
                placeholder="Enter your full name"
                value={bookingData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your mobile number"
                value={bookingData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                We'll send you a confirmation message and remind you about your appointment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Privacy Notice</h4>
        <p className="text-sm text-blue-700">
          Your contact information will only be used for appointment confirmation 
          and communication about your visit to Sreeramulu Classic Cuts. We respect 
          your privacy and do not share your information with third parties.
        </p>
      </div>
    </div>
  );
}
