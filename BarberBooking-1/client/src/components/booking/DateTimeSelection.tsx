import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock } from "lucide-react";
import { format, addDays, isBefore, isToday } from "date-fns";
import type { BookingData } from "@/pages/booking";

interface DateTimeSelectionProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00"
];

export default function DateTimeSelection({
  bookingData,
  updateBookingData,
}: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.selectedDate ? new Date(bookingData.selectedDate) : undefined
  );

  // Check availability for selected date, barber, and chair
  const { data: availability, isLoading: isCheckingAvailability } = useQuery({
    queryKey: ['/api/availability', bookingData.selectedBarber, bookingData.selectedChair, selectedDate],
    enabled: !!(selectedDate && bookingData.selectedBarber && bookingData.selectedChair),
    queryFn: async () => {
      if (!selectedDate || !bookingData.selectedBarber || !bookingData.selectedChair) return null;
      
      const params = new URLSearchParams({
        barberId: bookingData.selectedBarber.toString(),
        chairId: bookingData.selectedChair.toString(),
        date: selectedDate.toISOString(),
      });
      
      const response = await fetch(`/api/availability?${params}`);
      return response.json();
    }
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      updateBookingData({ 
        selectedDate: format(date, 'yyyy-MM-dd'),
        selectedTime: '' // Reset time when date changes
      });
    }
  };

  const handleTimeSelect = (time: string) => {
    updateBookingData({ selectedTime: time });
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, new Date()) && !isToday(date);
  };

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
              fromDate={new Date()}
              toDate={addDays(new Date(), 30)} // Allow booking up to 30 days ahead
            />
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Time</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <p className="text-gray-500 text-center py-8">
                Please select a date first
              </p>
            ) : isCheckingAvailability ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Checking availability...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => {
                  const isSelected = bookingData.selectedTime === time;
                  const isAvailable = availability?.available !== false; // Assume available if not explicitly false
                  
                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeSelect(time)}
                      disabled={!isAvailable}
                      className={`${
                        isSelected 
                          ? 'bg-primary text-white' 
                          : isAvailable
                          ? 'hover:bg-primary hover:text-white'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {formatTimeSlot(time)}
                      {!isAvailable && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Booked
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      {bookingData.selectedDate && bookingData.selectedTime && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-900">
                  Selected Appointment
                </h4>
                <p className="text-green-700">
                  {format(new Date(bookingData.selectedDate), 'EEEE, MMMM do, yyyy')} at{' '}
                  {formatTimeSlot(bookingData.selectedTime)}
                </p>
              </div>
              <Badge className="bg-green-500 text-white">
                Available
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
