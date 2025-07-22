import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLocation } from "wouter";
import ServiceSelection from "@/components/booking/ServiceSelection";
import BarberSelection from "@/components/booking/BarberSelection";
import ChairSelection from "@/components/booking/ChairSelection";
import DateTimeSelection from "@/components/booking/DateTimeSelection";
import ContactForm from "@/components/booking/ContactForm";
import PaymentMethod from "@/components/booking/PaymentMethod";
import BookingSummary from "@/components/booking/BookingSummary";

const STEPS = [
  { id: 1, title: "Services", description: "Choose your services" },
  { id: 2, title: "Barber", description: "Select your barber" },
  { id: 3, title: "Chair", description: "Pick your chair" },
  { id: 4, title: "Date & Time", description: "Schedule your visit" },
  { id: 5, title: "Contact", description: "Your details" },
  { id: 6, title: "Payment", description: "Complete booking" },
];

export interface BookingData {
  selectedServices: Array<{ id: number; name: string; price: number; quantity: number }>;
  selectedBarber: number | null;
  selectedChair: number | null;
  selectedDate: string;
  selectedTime: string;
  customerName: string;
  phoneNumber: string;
  paymentMethod: 'cash' | 'upi' | '';
  totalAmount: number;
}

export default function Booking() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    selectedBarber: null,
    selectedChair: null,
    selectedDate: '',
    selectedTime: '',
    customerName: '',
    phoneNumber: '',
    paymentMethod: '',
    totalAmount: 0,
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (bookingData.selectedServices.length === 0) {
          toast({
            title: "Please select services",
            description: "Choose at least one service to continue.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!bookingData.selectedBarber) {
          toast({
            title: "Please select a barber",
            description: "Choose your preferred barber to continue.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!bookingData.selectedChair) {
          toast({
            title: "Please select a chair",
            description: "Choose your preferred chair to continue.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (!bookingData.selectedDate || !bookingData.selectedTime) {
          toast({
            title: "Please select date and time",
            description: "Choose your preferred appointment time to continue.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 5:
        if (!bookingData.customerName || !bookingData.phoneNumber) {
          toast({
            title: "Please fill contact details",
            description: "Enter your name and phone number to continue.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 6:
        if (!bookingData.paymentMethod) {
          toast({
            title: "Please select payment method",
            description: "Choose how you'd like to pay for your services.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 2:
        return <BarberSelection bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 3:
        return <ChairSelection bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 4:
        return <DateTimeSelection bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 5:
        return <ContactForm bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 6:
        return <PaymentMethod bookingData={bookingData} updateBookingData={updateBookingData} />;
      default:
        return null;
    }
  };



  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Your Appointment
            </h1>
            <p className="text-gray-600">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.description}
            </p>
          </div>

          <Progress value={progress} className="mb-6" />

          {/* Step indicators */}
          <div className="flex justify-between mb-8">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs mt-2 text-center max-w-16">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{STEPS[currentStep - 1]?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <BookingSummary bookingData={bookingData} />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === STEPS.length}
          >
            {currentStep === STEPS.length ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Complete Booking
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
