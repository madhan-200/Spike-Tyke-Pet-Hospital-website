import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { hospitalInfo } from '../data/mock';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: language === 'en' ? 'Error' : 'பிழை',
        description: t.contact.form.error,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store submission locally for now
      const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push(submission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      // Show success message
      toast({
        title: language === 'en' ? 'Success!' : 'வெற்றி!',
        description: language === 'en' 
          ? 'Thank you for reaching out! We will contact you soon.' 
          : 'எங்களைத் தொடர்பு கொண்டதற்கு நன்றி! நாங்கள் விரைவில் உங்களைத் தொடர்பு கொள்வோம்.',
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: language === 'en' ? 'Error' : 'பிழை',
        description: language === 'en' 
          ? 'Please call us directly at ' + hospitalInfo.phone
          : 'தயவுசெய்து எங்களை நேரடியாக ' + hospitalInfo.phone + ' என்ற எண்ணில் அழைக்கவும்',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxjbGluaWMlMjByZWNlcHRpb258ZW58MHx8fHwxNzY2NjM3ODU2fDA&ixlib=rb-4.1.0&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <Card className="p-8 bg-white shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.contact.info.title}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {language === 'en' ? 'Address' : 'முகவரி'}
                      </h3>
                      <p className="text-gray-600">{t.contact.info.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {language === 'en' ? 'Phone' : 'தொலைபேசி'}
                      </h3>
                      <a href={`tel:${hospitalInfo.phone}`} className="text-cyan-600 hover:text-cyan-700 font-medium">
                        {t.contact.info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}
                      </h3>
                      <a href={`mailto:${hospitalInfo.email}`} className="text-cyan-600 hover:text-cyan-700 font-medium">
                        {hospitalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {language === 'en' ? 'Hours' : 'நேரம்'}
                      </h3>
                      <p className="text-gray-600">{t.contact.info.hours}</p>
                      <p className="text-sm text-gray-500 mt-1">{t.contact.info.note}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Call Button */}
                <a href={`tel:${hospitalInfo.phone}`} className="block mt-8">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" />
                    {t.home.hero.cta}
                  </Button>
                </a>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-white shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.contact.form.title}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium mb-2">{t.contact.form.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium mb-2">{t.contact.form.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium mb-2">{t.contact.form.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2">{t.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="mt-2 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    language === 'en' ? 'Sending...' : 'அனுப்பப்படுகிறது...'
                  ) : (
                    t.contact.form.submit
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card className="p-8 bg-white shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.contact.map}</h2>
              <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  src={hospitalInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Location"
                ></iframe>
              </div>
              <p className="text-center text-gray-600 mt-4">
                <span className="font-medium">{language === 'en' ? 'Plus Code:' : 'ப்ளஸ் கோட்:'}</span> {hospitalInfo.googlePlusCode}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;