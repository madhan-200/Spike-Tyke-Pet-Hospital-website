import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Stethoscope, Syringe, AlertCircle, Activity, Apple, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const serviceIcons = [Stethoscope, Syringe, AlertCircle, Activity, Apple, MessageCircle];
  const serviceImages = [
    'https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6',
    'https://images.pexels.com/photos/7469229/pexels-photo-7469229.jpeg',
    'https://images.pexels.com/photos/5732461/pexels-photo-5732461.jpeg',
    'https://images.unsplash.com/photo-1759164955427-14ca448a839d',
    'https://images.pexels.com/photos/7469229/pexels-photo-7469229.jpeg',
    'https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1654895716780-b4664497420d')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.services.title}
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.list.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={serviceImages[index]} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Need Our Services?' : 'எங்கள் சேவை தேவையா?'}
          </h2>
          <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Contact us today to book an appointment for your pet' 
              : 'உங்கள் செல்லப்பிராணிக்கான சந்திப்பை பதிவு செய்ய இன்றே எங்களை தொடர்பு கொள்ளுங்கள்'
            }
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
          >
            {t.services.cta}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;