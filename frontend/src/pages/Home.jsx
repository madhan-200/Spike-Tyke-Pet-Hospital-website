import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { hospitalInfo } from '../data/mock';
import { Phone, Award, Heart, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/6235120/pexels-photo-6235120.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-blue-900/90 to-cyan-800/85"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold text-sm">{t.home.hero.rating}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="text-xl text-cyan-100 mb-3 font-medium">
              {t.home.hero.subtitle}
            </p>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              {t.home.hero.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${hospitalInfo.phone}`}>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                  <Phone className="w-5 h-5 mr-2" />
                  {t.home.hero.cta}
                </Button>
              </a>
              <Button 
                onClick={() => navigate('/services')}
                variant="outline" 
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg transition-all duration-300"
              >
                {t.nav.services}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: t.home.stats.experience, label: t.home.stats.experienceLabel, icon: Award },
              { value: t.home.stats.pets, label: t.home.stats.petsLabel, icon: Heart },
              { value: t.home.stats.services, label: t.home.stats.servicesLabel, icon: Clock }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t.home.whyChoose.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.home.whyChoose.reason1Title, desc: t.home.whyChoose.reason1Desc, gradient: 'from-cyan-500 to-blue-600' },
              { title: t.home.whyChoose.reason2Title, desc: t.home.whyChoose.reason2Desc, gradient: 'from-blue-500 to-indigo-600' },
              { title: t.home.whyChoose.reason3Title, desc: t.home.whyChoose.reason3Desc, gradient: 'from-orange-500 to-red-600' },
              { title: t.home.whyChoose.reason4Title, desc: t.home.whyChoose.reason4Desc, gradient: 'from-teal-500 to-cyan-600' }
            ].map((reason, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-200 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Ready to Care for Your Pet?' : 'உங்கள் செல்லப்பிராணியை பராமரிக்க தயாரா?'}
          </h2>
          <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Contact us today for professional veterinary care' 
              : 'தொழில்முறை கால்நடை பராமரிப்பிற்கு இன்றே எங்களை தொடர்பு கொள்ளுங்கள்'
            }
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`tel:${hospitalInfo.phone}`}>
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                {hospitalInfo.phone}
              </Button>
            </a>
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-6 text-lg transition-all duration-300"
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;