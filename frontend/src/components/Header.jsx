import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { hospitalInfo } from '../data/mock';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              S&T
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800 leading-tight">Spike & Tyke</span>
              <span className="text-xs text-gray-500">Pet Hospital</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: t.nav.home },
              { path: '/about', label: t.nav.about },
              { path: '/services', label: t.nav.services },
              { path: '/reviews', label: t.nav.reviews },
              { path: '/contact', label: t.nav.contact }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 hover:bg-gray-100"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </Button>

            {/* Call Button */}
            <a href={`tel:${hospitalInfo.phone}`}>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="w-4 h-4 mr-2" />
                {t.home.hero.cta}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <nav className="flex items-center justify-around py-2">
          {[
            { path: '/', label: t.nav.home },
            { path: '/about', label: t.nav.about },
            { path: '/services', label: t.nav.services },
            { path: '/reviews', label: t.nav.reviews },
            { path: '/contact', label: t.nav.contact }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-2 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-cyan-50 text-cyan-600'
                  : 'text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;