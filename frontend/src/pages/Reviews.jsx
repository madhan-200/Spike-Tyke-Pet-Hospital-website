import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { mockReviews, hospitalInfo } from '../data/mock';
import { Star, User } from 'lucide-react';
import { Card } from '../components/ui/card';

const Reviews = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1688092807693-fd1c1a30c6c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwaG9zcGl0YWx8ZW58MHx8fHwxNzY2NjM3ODUwfDA&ixlib=rb-4.1.0&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.reviews.title}
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-6">
            {t.reviews.subtitle}
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold text-lg">{t.reviews.rating}</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockReviews.map((review) => (
              <Card key={review.id} className="p-6 hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 hover:border-cyan-200 hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Overall Rating Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-12 text-center border border-cyan-100 shadow-xl">
            <div className="mb-6">
              <div className="text-7xl font-bold text-gray-800 mb-2">{hospitalInfo.rating}</div>
              <div className="flex justify-center space-x-1 mb-3">
                {renderStars(Math.round(hospitalInfo.rating))}
              </div>
              <p className="text-xl text-gray-600">
                {language === 'en' 
                  ? `Based on ${hospitalInfo.totalReviews} reviews` 
                  : `${hospitalInfo.totalReviews} மதிப்புரைகளின் அடிப்படையில்`
                }
              </p>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Thank you to all our wonderful pet owners for trusting us with your beloved companions!'
                : 'உங்கள் அன்பான தூதுவர்களை எங்களிடம் ஒப்படைத்ததற்கு எங்கள் அனைத்து சிறப்பு செல்ல விலங்கு உரிமையாளர்களுக்கு நன்றி!'
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;