import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Scissors, Star } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Experience professional grooming services at Sreeramulu Classic Cuts. 
            Our skilled barbers provide traditional and modern styling with attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services?.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Scissors className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </CardTitle>
                <div className="text-3xl font-bold text-primary">
                  ₹{parseFloat(service.price).toFixed(0)}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 min-h-[3rem]">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>30-45 minutes</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Professional Service</span>
                  </div>
                </div>

                <Link href="/booking">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-gray-900">
                    Book This Service
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Service Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hair Cutting</h3>
              <p className="text-sm text-gray-600">
                Professional haircuts tailored to your style preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grooming</h3>
              <p className="text-sm text-gray-600">
                Complete grooming services including beard and mustache care
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hair Care</h3>
              <p className="text-sm text-gray-600">
                Hair washing, conditioning, and styling treatments
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Expert Barbers</h3>
                <p className="text-gray-600 text-sm">
                  Skilled professionals with years of experience in traditional and modern cuts
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quality Products</h3>
                <p className="text-gray-600 text-sm">
                  We use premium quality hair care products for the best results
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Affordable Prices</h3>
                <p className="text-gray-600 text-sm">
                  Professional services at competitive prices that fit your budget
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clean Environment</h3>
                <p className="text-gray-600 text-sm">
                  Hygienic and comfortable shop environment for your safety
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}