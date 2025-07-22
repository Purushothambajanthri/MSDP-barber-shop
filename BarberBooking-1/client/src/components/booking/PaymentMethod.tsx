import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

import type { BookingData } from "@/pages/booking";
import qrCodeImage from "@assets/WhatsApp Image 2025-07-19 at 15.31.12_bf9e72b1_1753179625403.jpg";

interface PaymentMethodProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export default function PaymentMethod({
  bookingData,
  updateBookingData,
}: PaymentMethodProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return await apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      
      if (bookingData.paymentMethod === 'cash') {
        toast({
          title: "Booking Confirmed!",
          description: "Thank you for booking at Sreeramulu Classic Cuts. Please arrive on time and pay at the shop.",
        });
      } else {
        toast({
          title: "Booking Submitted!",
          description: "Please complete the UPI payment to confirm your booking. Your seat will be reserved after payment.",
        });
      }
      
      // Redirect to home after successful booking
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePaymentMethodChange = (method: 'cash' | 'upi') => {
    updateBookingData({ paymentMethod: method });
  };

  const handleBookingSubmit = async () => {
    if (!bookingData.paymentMethod) {
      toast({
        title: "Please select payment method",
        description: "Choose how you'd like to pay for your services.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare booking data for API
      const bookingPayload = {
        barberId: bookingData.selectedBarber,
        chairId: bookingData.selectedChair,
        bookingDate: new Date(`${bookingData.selectedDate}T${bookingData.selectedTime}:00`).toISOString(),
        phoneNumber: bookingData.phoneNumber,
        customerName: bookingData.customerName,
        totalAmount: bookingData.totalAmount.toString(),
        paymentMethod: bookingData.paymentMethod,
        paymentStatus: bookingData.paymentMethod === 'cash' ? 'pending' : 'pending',
        services: bookingData.selectedServices.map(service => ({
          serviceId: service.id,
          quantity: service.quantity,
          price: service.price.toString(),
        })),
      };

      await bookingMutation.mutateAsync(bookingPayload);
    } catch (error) {
      // Error is handled in the mutation
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
        <RadioGroup
          value={bookingData.paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Cash Payment */}
          <div>
            <RadioGroupItem
              value="cash"
              id="payment-cash"
              className="sr-only"
            />
            <Label
              htmlFor="payment-cash"
              className="cursor-pointer"
            >
              <Card
                className={`transition-all duration-200 hover:shadow-lg ${
                  bookingData.paymentMethod === 'cash'
                    ? 'ring-2 ring-primary bg-blue-50'
                    : ''
                }`}
              >
                <CardContent className="p-6 text-center">
                  <Banknote className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h4 className="font-semibold text-lg mb-2">Cash on Service</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Pay when you arrive at the shop
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Pay Later
                  </Badge>
                </CardContent>
              </Card>
            </Label>
          </div>

          {/* UPI Payment */}
          <div>
            <RadioGroupItem
              value="upi"
              id="payment-upi"
              className="sr-only"
            />
            <Label
              htmlFor="payment-upi"
              className="cursor-pointer"
            >
              <Card
                className={`transition-all duration-200 hover:shadow-lg ${
                  bookingData.paymentMethod === 'upi'
                    ? 'ring-2 ring-primary bg-blue-50'
                    : ''
                }`}
              >
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h4 className="font-semibold text-lg mb-2">Online Payment (UPI)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Pay now to confirm booking
                  </p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Instant Confirmation
                  </Badge>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* UPI Payment Details */}
      {bookingData.paymentMethod === 'upi' && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h4 className="font-semibold text-lg mb-4 text-center">UPI Payment Details</h4>
            <div className="text-center space-y-4">
              <div>
                <p className="text-gray-700">
                  UPI Name: <strong>BAJANTHRI MALLESWARI</strong>
                </p>
                <p className="text-gray-700">
                  UPI ID: <strong>9573761730@phonepe</strong>
                </p>
              </div>
              
              <div className="flex justify-center">
                <img
                  src={qrCodeImage}
                  alt="PhonePe QR Code for Payment"
                  className="max-w-xs w-full h-auto rounded-lg shadow-md"
                />
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code with any UPI app to pay
                </p>
                <p className="text-2xl font-bold text-accent">
                  ₹{bookingData.totalAmount}
                </p>
              </div>
              
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Your booking will be confirmed only after successful payment. 
                  Please take a screenshot of your payment confirmation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Booking Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleBookingSubmit}
          disabled={!bookingData.paymentMethod || isProcessing || bookingMutation.isPending}
          className="bg-accent hover:bg-accent/90 text-gray-900 font-bold py-3 px-8 text-lg"
          size="lg"
        >
          {isProcessing || bookingMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2" />
              Processing...
            </>
          ) : bookingData.paymentMethod === 'cash' ? (
            'Confirm Booking'
          ) : (
            'Complete Payment & Book'
          )}
        </Button>
      </div>
    </div>
  );
}
