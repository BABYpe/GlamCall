import React, { useState } from 'react';
import { ArrowLeft, Upload, Camera, FileText, Globe, Calendar, DollarSign } from 'lucide-react';

interface ModelApplicationProps {
  onBack: () => void;
  onSubmit: (application: any) => void;
}

export const ModelApplication: React.FC<ModelApplicationProps> = ({ onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    languages: [],
    age: '',
    experience: '',
    description: '',
    photos: [],
    idDocument: null,
    pricePerMinute: '',
    availability: {
      monday: { available: false, start: '18:00', end: '02:00' },
      tuesday: { available: false, start: '18:00', end: '02:00' },
      wednesday: { available: false, start: '18:00', end: '02:00' },
      thursday: { available: false, start: '18:00', end: '02:00' },
      friday: { available: false, start: '18:00', end: '02:00' },
      saturday: { available: false, start: '18:00', end: '02:00' },
      sunday: { available: false, start: '18:00', end: '02:00' }
    }
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Arabic', 'Chinese', 'Japanese'];
  const countries = ['Spain', 'UK', 'France', 'Germany', 'Italy', 'Brazil', 'Russia', 'USA', 'Canada', 'Australia'];

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleAvailabilityChange = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Age *</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            placeholder="18+"
            min="18"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Phone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            placeholder="+1 234 567 8900"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-2">Country *</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            required
          >
            <option value="">Select your country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3">Languages Spoken *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {languages.map(language => (
            <label key={language} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.languages.includes(language)}
                onChange={() => handleLanguageToggle(language)}
                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-300 text-sm">{language}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Professional Information</h2>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Experience Level *</label>
        <select
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          required
        >
          <option value="">Select your experience</option>
          <option value="beginner">Beginner (0-6 months)</option>
          <option value="intermediate">Intermediate (6 months - 2 years)</option>
          <option value="experienced">Experienced (2+ years)</option>
          <option value="expert">Expert (5+ years)</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Price Per Minute (USD) *</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={formData.pricePerMinute}
            onChange={(e) => setFormData({...formData, pricePerMinute: e.target.value})}
            className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            placeholder="2.50"
            min="1"
            max="50"
            step="0.50"
            required
          />
        </div>
        <p className="text-gray-400 text-sm mt-1">Recommended range: $2.00 - $10.00 per minute</p>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">About You *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          rows={4}
          placeholder="Tell us about yourself, your interests, and what makes you unique..."
          required
        />
        <p className="text-gray-400 text-sm mt-1">{formData.description.length}/500 characters</p>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3">Weekly Availability</label>
        <div className="space-y-3">
          {Object.entries(formData.availability).map(([day, schedule]) => (
            <div key={day} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-20">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedule.available}
                    onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300 text-sm capitalize">{day}</span>
                </label>
              </div>
              {schedule.available && (
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={schedule.start}
                    onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                    className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    value={schedule.end}
                    onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                    className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Photos & Verification</h2>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3">Profile Photos *</label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Upload 3-5 high-quality photos</p>
          <p className="text-gray-400 text-sm mb-4">JPG, PNG up to 5MB each</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
            Choose Photos
          </button>
        </div>
        <div className="text-gray-400 text-sm mt-2">
          <p>• Photos should be clear and well-lit</p>
          <p>• Include at least one face photo</p>
          <p>• No inappropriate content</p>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3">ID Verification *</label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Upload Government ID</p>
          <p className="text-gray-400 text-sm mb-4">Passport, Driver's License, or National ID</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
            Upload ID
          </button>
        </div>
        <div className="text-gray-400 text-sm mt-2">
          <p>• Must be 18+ years old</p>
          <p>• Document must be valid and clear</p>
          <p>• Information will be kept confidential</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-3">Application Review Process</h3>
        <div className="text-gray-300 space-y-2 text-sm">
          <p>• Applications are reviewed within 24-48 hours</p>
          <p>• You'll receive an email notification about the status</p>
          <p>• Approved models can start earning immediately</p>
          <p>• We maintain high quality standards for user safety</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
              Become a Model
            </h1>
            <span className="text-gray-400">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};