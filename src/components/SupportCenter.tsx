import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Clock, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface SupportCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportCenter: React.FC<SupportCenterProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'chat'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      category: 'Getting Started',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button on the login page, fill in your details, and verify your email address.'
    },
    {
      id: '2',
      category: 'Payments',
      question: 'How do I add coins to my account?',
      answer: 'Go to the Coin Store from the main menu, select a package, and complete the payment using your preferred method.'
    },
    {
      id: '3',
      category: 'Video Calls',
      question: 'What are the technical requirements for video calls?',
      answer: 'You need a stable internet connection, a webcam, microphone, and a modern web browser (Chrome, Firefox, Safari, or Edge).'
    },
    {
      id: '4',
      category: 'Safety',
      question: 'How do I report inappropriate behavior?',
      answer: 'Use the report button during calls or visit the Security Center to file a detailed report. Our team reviews all reports within 24 hours.'
    },
    {
      id: '5',
      category: 'Models',
      question: 'How can I become a model?',
      answer: 'Click "Apply to Become a Model" on the login page, complete the application form, and wait for approval (usually 24-48 hours).'
    },
    {
      id: '6',
      category: 'Billing',
      question: 'How are charges calculated?',
      answer: 'Charges are calculated per minute based on each model\'s rate. You can see the rate before starting a call.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const renderFaqTab = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
          placeholder="Search frequently asked questions..."
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSearchTerm('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            searchTerm === '' ? 'bg-purple-600 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSearchTerm(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              searchTerm === category ? 'bg-purple-600 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map(faq => (
          <div key={faq.id} className="bg-gray-700/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-600/30 transition-colors"
            >
              <div>
                <div className="text-purple-400 text-xs font-medium mb-1">{faq.category}</div>
                <div className="text-white font-medium">{faq.question}</div>
              </div>
              {expandedFaq === faq.id ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedFaq === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-8">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No FAQs found matching your search.</p>
        </div>
      )}
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Contact Support</h2>
        <p className="text-gray-400">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-blue-400" />
            <h3 className="text-white font-semibold">Email Support</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Get detailed help via email</p>
          <p className="text-purple-400 font-medium">support@glamcall.com</p>
          <p className="text-gray-500 text-xs mt-2">Response time: 2-4 hours</p>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Phone className="w-6 h-6 text-green-400" />
            <h3 className="text-white font-semibold">Phone Support</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">Speak directly with our team</p>
          <p className="text-purple-400 font-medium">+1 (555) 123-4567</p>
          <p className="text-gray-500 text-xs mt-2">Available 24/7</p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
          <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white">
            <option>Select a topic</option>
            <option>Account Issues</option>
            <option>Payment Problems</option>
            <option>Technical Support</option>
            <option>Model Application</option>
            <option>Report a Bug</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            rows={5}
            placeholder="Describe your issue or question..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );

  const renderChatTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Live Chat</h2>
        <p className="text-gray-400">Chat with our support team in real-time</p>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">Support team is online</span>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Average response time: 2 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Available 24/7</span>
          </div>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Start Live Chat
        </button>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-blue-400 font-semibold mb-3">Before you chat...</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Have your account information ready</li>
          <li>• Describe your issue clearly</li>
          <li>• Include any error messages you've seen</li>
          <li>• Be patient - we're here to help!</li>
        </ul>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Support Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Support Center</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            {[
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'contact', label: 'Contact Us', icon: Mail },
              { id: 'chat', label: 'Live Chat', icon: MessageCircle }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'faq' && renderFaqTab()}
            {activeTab === 'contact' && renderContactTab()}
            {activeTab === 'chat' && renderChatTab()}
          </div>
        </div>
      </div>
    </>
  );
};