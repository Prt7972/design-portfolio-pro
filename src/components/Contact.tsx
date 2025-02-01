import { Mail, Phone, Globe, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center">
            <a href="mailto:contact@example.com" className="flex items-center text-gray-600 hover:text-gold transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              <span>Email</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="flex items-center text-gray-600 hover:text-gold transition-colors">
              <Globe className="w-5 h-5 mr-2" />
              <span>Links</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="flex items-center text-gray-600 hover:text-gold transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              <span>Save Contact</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="flex items-center text-gray-600 hover:text-gold transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;