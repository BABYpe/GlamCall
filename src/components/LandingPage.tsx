import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Star, 
  Users, 
  Shield, 
  Globe, 
  ArrowRight, 
  Check, 
  Heart,
  Video,
  MessageCircle,
  Coins,
  Crown,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { SEOHead } from './SEOHead';
import { FeatureShowcase } from './FeatureShowcase';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const { t, i18n } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Video,
      title: t('landing.features.hd_video.title') || 'HD Video Calls',
      description: t('landing.features.hd_video.description') || 'Crystal clear video quality with professional models',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: t('landing.features.secure.title') || 'Secure & Private',
      description: t('landing.features.secure.description') || 'End-to-end encryption and verified models',
      color: 'text-green-400'
    },
    {
      icon: Globe,
      title: t('landing.features.global.title') || 'Global Models',
      description: t('landing.features.global.description') || 'Connect with models from around the world',
      color: 'text-blue-400'
    },
    {
      icon: Coins,
      title: t('landing.features.flexible.title') || 'Flexible Pricing',
      description: t('landing.features.flexible.description') || 'Pay per minute with transparent pricing',
      color: 'text-gold'
    }
  ];

  const stats = [
    { number: '50K+', label: t('landing.stats.users') || 'Active Users' },
    { number: '2K+', label: t('landing.stats.models') || 'Verified Models' },
    { number: '100+', label: t('landing.stats.countries') || 'Countries' },
    { number: '4.9', label: t('landing.stats.rating') || 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      country: 'السعودية',
      rating: 5,
      comment: 'تجربة رائعة ومحادثات ممتعة مع عارضات محترفات',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'John Smith',
      country: 'USA',
      rating: 5,
      comment: 'Amazing platform with beautiful models and great video quality',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Carlos Rodriguez',
      country: 'Spain',
      rating: 5,
      comment: 'Increíble experiencia, modelos profesionales y muy buena calidad',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 9.99,
      coins: 100,
      features: ['HD Video Calls', 'Basic Chat', 'Customer Support'],
      popular: false
    },
    {
      name: 'Popular',
      price: 19.99,
      coins: 250,
      bonus: 25,
      features: ['HD Video Calls', 'Premium Chat', 'Priority Support', 'Exclusive Models'],
      popular: true
    },
    {
      name: 'VIP',
      price: 59.99,
      coins: 1000,
      bonus: 200,
      features: ['4K Video Calls', 'VIP Chat', '24/7 Support', 'All Models', 'Special Events'],
      popular: false
    }
  ];

  return (
    <>
      <SEOHead
        title={t('landing.seo.title') || 'GlamCall - Premium Video Chat Platform'}
        description={t('landing.seo.description') || 'Connect with beautiful verified models worldwide through HD video calls. Safe, secure, and professional adult entertainment platform.'}
        keywords="video chat, webcam models, adult entertainment, live cam, video call, online dating, premium chat"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
                  GlamCall
                </h1>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  {t('landing.nav.features') || 'Features'}
                </a>
                <a href="#models" className="text-gray-300 hover:text-white transition-colors">
                  {t('landing.nav.models') || 'Models'}
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  {t('landing.nav.pricing') || 'Pricing'}
                </a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  {t('landing.nav.about') || 'About'}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <button
                  onClick={onLogin}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('auth.login') || 'Login'}
                </button>
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  {t('landing.cta.get_started') || 'Get Started'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-gold bg-clip-text text-transparent">
                      {t('landing.hero.title') || 'Connect with Beautiful Models'}
                    </span>
                    <br />
                    <span className="text-white">
                      {t('landing.hero.subtitle') || 'Worldwide'}
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {t('landing.hero.description') || 'Experience premium video chat with verified models from around the globe. Safe, secure, and professional entertainment platform.'}
                  </p>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <img
                            key={i}
                            src={`https://images.pexels.com/photos/${415829 + i * 100}/pexels-photo-${415829 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-gray-900"
                          />
                        ))}
                      </div>
                      <div className="text-gray-300">
                        <div className="font-semibold">50,000+</div>
                        <div className="text-sm text-gray-400">Happy Users</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-5 h-5 text-gold fill-current" />
                      ))}
                      <span className="text-gray-300 ml-2">4.9/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={onGetStarted}
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>{t('landing.cta.start_now') || 'Start Now'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="group bg-gray-800/50 hover:bg-gray-700/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-gray-600 hover:border-purple-500/50 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t('landing.cta.watch_demo') || 'Watch Demo'}</span>
                  </button>
                </div>
              </div>

              {/* Hero Image/Animation */}
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative">
                  {/* Main Hero Image */}
                  <div className="relative z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 backdrop-blur-lg border border-purple-500/20">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Professional Model"
                      className="w-full h-96 object-cover rounded-2xl"
                    />
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                      🟢 2,341 Online
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                      💎 Premium Quality
                    </div>
                  </div>

                  {/* Background Decorations */}
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-pink-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-800/30 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-1000 delay-${index * 200} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeatureShowcase />

        {/* Models Preview Section */}
        <section id="models" className="py-20 px-4 bg-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('landing.models.title') || 'Meet Our Models'}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('landing.models.subtitle') || 'Verified, professional models from around the world ready to chat with you'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`group relative bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <img
                    src={`https://images.pexels.com/photos/${415829 + i * 200}/pexels-photo-${415829 + i * 200}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={`Model ${i}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    🟢 Online
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold mb-1">Model {i}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-gold fill-current" />
                        <span className="text-white text-sm">4.{8 + (i % 2)}</span>
                      </div>
                      <div className="text-purple-400 font-semibold text-sm">
                        ${(2.5 + (i * 0.3)).toFixed(2)}/min
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('landing.models.view_all') || 'View All Models'}
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('landing.testimonials.title') || 'What Our Users Say'}
              </h2>
            </div>

            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <div className="text-center">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-purple-500"
                  />
                  
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-5 h-5 text-gold fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl text-gray-300 mb-6 italic">
                    "{testimonials[currentTestimonial].comment}"
                  </blockquote>
                  
                  <div className="text-white font-semibold">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].country}
                  </div>
                </div>
              </div>

              {/* Testimonial Dots */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('landing.pricing.title') || 'Simple, Transparent Pricing'}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('landing.pricing.subtitle') || 'Choose the perfect plan for your needs. No hidden fees, cancel anytime.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 hover:scale-105 ${
                    plan.popular 
                      ? 'border-purple-500 shadow-purple-500/20 ring-2 ring-purple-500/20' 
                      : 'border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Crown className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      ${plan.price}
                    </div>
                    <div className="text-gray-400">{plan.coins} coins</div>
                    {plan.bonus && (
                      <div className="text-green-400 text-sm font-semibold mt-2">
                        +{plan.bonus} bonus coins!
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onGetStarted}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-lg">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('landing.cta.title') || 'Ready to Start?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t('landing.cta.description') || 'Join thousands of users already enjoying premium video chat experiences'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
                >
                  <span>{t('landing.cta.join_now') || 'Join Now - It\'s Free'}</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
                
                <div className="text-gray-400 text-sm">
                  ✓ No credit card required<br />
                  ✓ Instant access to models
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-lg border-t border-gray-700/50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <span className="text-xl font-bold text-white">GlamCall</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Premium video chat platform connecting users with verified models worldwide.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Browse Models</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">For Models</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Apply Now</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Model Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Earnings</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm">
                © 2024 GlamCall. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Verified Models</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      </div>
    </>
  );
};