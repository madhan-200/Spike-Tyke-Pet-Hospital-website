import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { hospitalInfo } from '../data/mock';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                S&T
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">Spike & Tyke</span>
                <span className="text-xs text-gray-400">Pet Hospital</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.footer.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {[
                { path: '/', label: t.nav.home },
                { path: '/about', label: t.nav.about },
                { path: '/services', label: t.nav.services },
                { path: '/reviews', label: t.nav.reviews },
                { path: '/contact', label: t.nav.contact }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${hospitalInfo.phone}`} className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  {hospitalInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${hospitalInfo.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  {hospitalInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {language === 'en' ? hospitalInfo.address : t.contact.info.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.hours}</h3>
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
              <div className="text-gray-300 text-sm">
                <p>{t.footer.hoursDetail}</p>
                <p className="text-xs text-gray-400 mt-1">{t.contact.info.note}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;