import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Heart, Award, Shield, DollarSign } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559190394-df5a28aab5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwyfHxoYXBweSUyMHBldHN8ZW58MHx8fHwxNzY2NjM3ODA5fDA&ixlib=rb-4.1.0&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.about.title}
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/6235657/pexels-photo-6235657.jpeg" 
                alt="Veterinary Care"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {t.about.mission.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t.about.mission.description}
              </p>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-6 rounded-r-xl">
                <p className="text-gray-700 italic text-lg">
                  "{t.about.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t.about.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: t.about.values.value1, desc: t.about.values.value1Desc, color: 'from-red-500 to-pink-600' },
              { icon: Award, title: t.about.values.value2, desc: t.about.values.value2Desc, color: 'from-cyan-500 to-blue-600' },
              { icon: Shield, title: t.about.values.value3, desc: t.about.values.value3Desc, color: 'from-green-500 to-teal-600' },
              { icon: DollarSign, title: t.about.values.value4, desc: t.about.values.value4Desc, color: 'from-orange-500 to-amber-600' }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHN8ZW58MHx8fHwxNzY2NjM3ODA5fDA&ixlib=rb-4.1.0&q=85" 
              alt="Happy Pet"
              className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
            <img 
              src="https://images.unsplash.com/photo-1718995398658-4469fd08cb04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGNhdHN8ZW58MHx8fHwxNzY2NjM3ODE1fDA&ixlib=rb-4.1.0&q=85" 
              alt="Happy Cats"
              className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
            <img 
              src="https://images.unsplash.com/photo-1683844235785-f8a277a1edc8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwzfHxoYXBweSUyMGNhdHN8ZW58MHx8fHwxNzY2NjM3ODE1fDA&ixlib=rb-4.1.0&q=85" 
              alt="Pet Care"
              className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;