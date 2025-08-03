import React from 'react';
import { Filter, X, Star, DollarSign, Globe, Users } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    country: string;
    status: string;
    priceRange: [number, number];
    rating: number;
    language: string;
  };
  onFiltersChange: (filters: any) => void;
  countries: string[];
  languages: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  countries,
  languages
}) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      country: 'all',
      status: 'all',
      priceRange: [0, 50],
      rating: 0,
      language: 'all'
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

      {/* Filter Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Users className="w-4 h-4 inline mr-2" />
                Availability
              </label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Models' },
                  { value: 'online', label: 'Online Now' },
                  { value: 'offline', label: 'Offline' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={filters.status === option.value}
                      onChange={(e) => updateFilter('status', e.target.value)}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-300 text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Globe className="w-4 h-4 inline mr-2" />
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => updateFilter('country', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white text-sm"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => updateFilter('language', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white text-sm"
              >
                <option value="all">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price Range (per minute)
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>$0</span>
                  <span className="text-purple-400 font-semibold">Up to ${filters.priceRange[1]}</span>
                  <span>$50+</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Star className="w-4 h-4 inline mr-2" />
                Minimum Rating
              </label>
              <div className="space-y-2">
                {[0, 3, 4, 4.5].map(rating => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating}
                      onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                    />
                    <div className="flex items-center space-x-1">
                      {rating === 0 ? (
                        <span className="text-gray-300 text-sm">Any Rating</span>
                      ) : (
                        <>
                          <span className="text-gray-300 text-sm">{rating}+</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= rating ? 'text-gold fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 space-y-3">
            <button
              onClick={clearFilters}
              className="w-full py-2 px-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-colors text-sm"
            >
              Clear All Filters
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};