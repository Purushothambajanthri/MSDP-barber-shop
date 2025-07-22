import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { BookingData } from "@/pages/booking";
import type { Barber, Chair } from "@shared/schema";

interface BookingSummaryProps {
  bookingData: BookingData;
}

export default function BookingSummary({ bookingData }: BookingSummaryProps) {
  const { data: barbers } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  const { data: chairs } = useQuery<Chair[]>({
    queryKey: ['/api/chairs'],
  });

  const selectedBarber = barbers?.find(b => b.id === bookingData.selectedBarber);
  const selectedChair = chairs?.find(c => c.id === bookingData.selectedChair);

  const formatTimeSlot = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          {bookingData.selectedServices.length > 0 ? (
            <div className="space-y-2">
              {bookingData.selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{service.name}</span>
                  <span className="font-medium">₹{service.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No services selected</p>
          )}
        </div>

        <Separator />

        {/* Barber */}
        <div>
          <h4 className="font-semibold mb-2">Barber</h4>
          {selectedBarber ? (
            <div className="text-sm">
              <p className="font-medium">{selectedBarber.name}</p>
              <p className="text-gray-600">{selectedBarber.experience}+ years experience</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No barber selected</p>
          )}
        </div>

        <Separator />

        {/* Chair */}
        <div>
          <h4 className="font-semibold mb-2">Chair</h4>
          {selectedChair ? (
            <div className="text-sm">
              <p className="font-medium">{selectedChair.name}</p>
              <p className="text-gray-600">{selectedChair.description}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No chair selected</p>
          )}
        </div>

        <Separator />

        {/* Date & Time */}
        <div>
          <h4 className="font-semibold mb-2">Date & Time</h4>
          {bookingData.selectedDate && bookingData.selectedTime ? (
            <div className="text-sm">
              <p className="font-medium">
                {format(new Date(bookingData.selectedDate), 'EEEE, MMMM do, yyyy')}
              </p>
              <p className="text-gray-600">
                {formatTimeSlot(bookingData.selectedTime)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No date/time selected</p>
          )}
        </div>

        <Separator />

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          {bookingData.customerName && bookingData.phoneNumber ? (
            <div className="text-sm">
              <p className="font-medium">{bookingData.customerName}</p>
              <p className="text-gray-600">{bookingData.phoneNumber}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No contact details</p>
          )}
        </div>

        <Separator />

        {/* Payment Method */}
        <div>
          <h4 className="font-semibold mb-2">Payment Method</h4>
          {bookingData.paymentMethod ? (
            <Badge
              className={
                bookingData.paymentMethod === 'cash'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }
            >
              {bookingData.paymentMethod === 'cash' ? 'Cash on Service' : 'UPI Payment'}
            </Badge>
          ) : (
            <p className="text-gray-500 text-sm">No payment method selected</p>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="text-2xl font-bold text-accent">
              ₹{bookingData.totalAmount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
