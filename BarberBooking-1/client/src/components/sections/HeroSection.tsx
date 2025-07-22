import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  const handleBookSeat = () => {
    window.location.href = '/booking';
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-accent">Sreeramulu Classic Cuts</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          45+ Years of Traditional Excellence in Kristipadu Village
        </p>
        <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
          Experience masterful haircuts and grooming services from our skilled
          barbers. Book your seat for a premium barbering experience in Andhra
          Pradesh.
        </p>
        <Button
          onClick={handleBookSeat}
          className="bg-accent hover:bg-accent/90 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          size="lg"
        >
          <CalendarDays className="mr-2 h-5 w-5" />
          Book Your Seat Now
        </Button>
      </div>
    </section>
  );
}
