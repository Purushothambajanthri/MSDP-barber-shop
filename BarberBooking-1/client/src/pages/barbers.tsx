import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Phone, Star, MapPin } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import type { Barber } from "@shared/schema";
import sreeramuluImage from "@assets/IMG-20231219-WA0006_1753179660622.jpg";
import purushothamImage from "@assets/IMG_20220112_203001_1753179646371.jpg";

const barberImages = {
  'Sreeramulu': sreeramuluImage,
  'Purushotham': purushothamImage,
};

export default function Barbers() {
  const { data: barbers, isLoading } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Barbers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Our skilled professional barbers bring years of experience and passion for their craft. 
            Each barber specializes in different techniques to give you the perfect look.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {barbers?.map((barber) => (
            <Card key={barber.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  {barberImages[barber.name as keyof typeof barberImages] && (
                    <img
                      src={barberImages[barber.name as keyof typeof barberImages]}
                      alt={barber.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-white">
                    {barber.experience}+ years exp
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {barber.name}
                </CardTitle>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Master Barber • Age {barber.age}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {barber.description}
                </p>
                
                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{barber.phone}</span>
                  </div>
                </div>

                {/* Experience Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Experience Highlights</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>{barber.experience} years of professional experience</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Expert in traditional and modern cutting techniques</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Specialized in {barber.specialties[0].toLowerCase()}</span>
                    </div>
                  </div>
                </div>

                <Link href="/booking">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-gray-900">
                    Book with {barber.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shop Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            About Sreeramulu Classic Cuts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Our Heritage</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sreeramulu Classic Cuts has been serving the Kristipadu community with traditional 
                barbering excellence. Our shop represents a perfect blend of time-honored techniques 
                and modern styling approaches.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Located in the heart of Kristipadu village, we take pride in providing personalized 
                grooming services that meet the unique needs of each customer.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Our Philosophy</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600 text-sm">Quality craftsmanship in every cut</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600 text-sm">Personalized attention to detail</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600 text-sm">Maintaining traditional barbering values</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600 text-sm">Building lasting customer relationships</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours & Availability */}
        <div className="bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Schedule & Availability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Daily Hours</h3>
              <p className="text-sm text-gray-600">
                Monday - Sunday<br />
                7:00 AM - 8:00 PM
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Peak Hours</h3>
              <p className="text-sm text-gray-600">
                Weekends & Evenings<br />
                Book in advance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Walk-ins Welcome</h3>
              <p className="text-sm text-gray-600">
                Subject to availability<br />
                Or book online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}