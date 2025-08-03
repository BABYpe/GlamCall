import React, { useState } from 'react';
import { Search, Filter, X, Star, MapPin, Clock, DollarSign } from 'lucide-react';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (criteria: SearchCriteria) => void;
}

interface SearchCriteria {
  name: string;
  country: string;
  ageRange: [number, number];
  priceRange: [number, number];
  rating: number;
  languages: string[];
  tags: string[];
  availability: string;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ isOpen, onClose, onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    country: '',
    ageRange: [18, 50],
    priceRange: [0, 50],
    rating: 0,
    languages: [],
    tags: [],
    availability: 'all'
  });

  const countries = ['Spain', 'UK', 'France', 'Germany', 'Italy', 'Brazil', 'Russia', 'USA', 'Canada'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian'];
  const popularTags = ['Dancing', 'Art', 'Music', 'Sports', 'Gaming', 'Movies', 'Culture', 'Fashion'];

  const handleTagToggle = (tag: string) => {
    setCriteria(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setCriteria(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleSearch = () => {
    onSearch(criteria);
    onClose();
  };

  const resetCriteria = () => {
    setCriteria({
      name: '',
      country: '',
      ageRange: [18, 50],
      priceRange: [0, 50],
      rating: 0,
      languages: [],
      tags: [],
      availability: 'all'
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Search Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Advanced Search</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Search */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Model Name</label>
                  <input
                    type="text"
                    value={criteria.name}
                    onChange={(e) => setCriteria(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Search by name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                  <select
                    value={criteria.country}
                    onChange={(e) => setCriteria(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                  <select
                    value={criteria.availability}
                    onChange={(e) => setCriteria(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    <option value="all">All Models</option>
                    <option value="online">Online Now</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Advanced Filters</h3>

                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age Range</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={criteria.ageRange[1]}
                      onChange={(e) => setCriteria(prev => ({ 
                        ...prev, 
                        ageRange: [prev.ageRange[0], parseInt(e.target.value)] 
                      }))}
                      className="flex-1"
                    />
                    <span className="text-purple-400 font-semibold min-w-[60px]">
                      18-{criteria.ageRange[1]}
                    </span>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range (per minute)</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={criteria.priceRange[1]}
                      onChange={(e) => setCriteria(prev => ({ 
                        ...prev, 
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                      }))}
                      className="flex-1"
                    />
                    <span className="text-purple-400 font-semibold min-w-[80px]">
                      $0-${criteria.priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Rating</label>
                  <div className="flex space-x-2">
                    {[0, 3, 4, 4.5, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setCriteria(prev => ({ ...prev, rating }))}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          criteria.rating === rating
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map(language => (
                    <button
                      key={language}
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        criteria.languages.includes(language)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">Interests & Tags</label>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        criteria.tags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
            <button
              onClick={resetCriteria}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Reset All
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
              >
                Search Models
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};