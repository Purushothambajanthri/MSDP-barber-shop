import { MapPin, Clock, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LocationSection() {
  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Shop
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conveniently located in the heart of Kristipadu Village
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Shop Address
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-primary text-xl mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-semibold">3Q7J+H3P</p>
                    <p className="text-gray-600">Kristipadu, Andhra Pradesh 515455</p>
                    <p className="text-gray-600 mt-2">3-21A, Raghavendra Colony Road</p>
                    <p className="text-gray-600">Near Elementary School</p>
                    <p className="text-gray-600">Peddavaduguru Mandal</p>
                    <p className="text-gray-600">Anantapur District</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="text-primary text-xl mr-4" />
                  <div>
                    <p className="text-gray-900 font-semibold">Working Hours</p>
                    <p className="text-gray-600">Monday - Sunday: 7:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Navigation className="text-primary text-xl mr-4" />
                  <div>
                    <p className="text-gray-900 font-semibold">Easy to Find</p>
                    <p className="text-gray-600">
                      Near Elementary School, well-known location in village
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl overflow-hidden">
            <div className="h-80 bg-gray-200 flex items-center justify-center relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d487.3971234567!2d77.68123456789!3d14.12345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z3Q7J+H3P+Kristipadu%2C+Andhra+Pradesh+515455!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
