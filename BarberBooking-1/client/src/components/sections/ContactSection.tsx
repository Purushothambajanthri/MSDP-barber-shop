import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, PhoneCall } from "lucide-react";

const contacts = [
  {
    type: "whatsapp",
    title: "WhatsApp",
    description: "Quick booking and inquiries",
    phone: "919573761730",
    action: "Message Us",
    color: "bg-green-500 hover:bg-green-600",
    icon: MessageCircle,
  },
  {
    type: "call-sreeramulu",
    title: "Call Sreeramulu",
    description: "Direct booking line",
    phone: "919573761730",
    action: "Call Now",
    color: "bg-primary hover:bg-primary/90",
    icon: Phone,
  },
  {
    type: "call-purushotham",
    title: "Call Purushotham",
    description: "Alternative booking line",
    phone: "919381625471",
    action: "Call Now",
    color: "bg-secondary hover:bg-secondary/90",
    icon: PhoneCall,
  },
];

export default function ContactSection() {
  const handleContact = (type: string, phone: string) => {
    switch (type) {
      case "whatsapp":
        window.open(`https://wa.me/${phone}`, '_blank');
        break;
      case "call-sreeramulu":
      case "call-purushotham":
        window.location.href = `tel:+${phone}`;
        break;
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to book or have questions? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <Card
                key={contact.type}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{contact.description}</p>
                  <Button
                    onClick={() => handleContact(contact.type, contact.phone)}
                    className={`${contact.color} text-white`}
                  >
                    {contact.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
