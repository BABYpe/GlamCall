import React, { useState, useMemo } from 'react';
import { Filter, TrendingUp, Sparkles, Users, Clock, Search as SearchIcon } from 'lucide-react';
import { Model } from '../types';
import { mockModels } from '../data/mockData';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ModelCard } from './ModelCard';
import { FilterPanel } from './FilterPanel';
import { NotificationCenter } from './NotificationCenter';
import { AdvancedSearch } from './AdvancedSearch';

interface HomePageProps {
  onSelectModel: (model: Model) => void;
  userBalance: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectModel, userBalance }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    country: 'all',
    status: 'all',
    priceRange: [0, 50] as [number, number],
    rating: 0,
    language: 'all'
  });

  const countries = useMemo(() => [...new Set(mockModels.map(model => model.country))], []);
  const languages = useMemo(() => [...new Set(mockModels.flatMap(model => model.language.split(', ')))], []);

  const filteredModels = useMemo(() => {
    return mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filters.country === 'all' || model.country === filters.country;
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'online' && model.isOnline) ||
                         (filters.status === 'offline' && !model.isOnline);
    const matchesPrice = model.pricePerMinute <= filters.priceRange[1];
    const matchesRating = model.rating >= filters.rating;
    const matchesLanguage = filters.language === 'all' || 
                           model.language.toLowerCase().includes(filters.language.toLowerCase());
    
    return matchesSearch && matchesCountry && matchesStatus && matchesPrice && matchesRating && matchesLanguage;
    });
  }, [searchTerm, filters]);

  const getSectionModels = () => {
    switch (activeSection) {
      case 'favorites':
        return filteredModels.filter(model => favorites.includes(model.id));
      case 'trending':
        return filteredModels.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'new':
        return filteredModels.sort((a, b) => b.totalMinutes - a.totalMinutes);
      case 'top-rated':
        return filteredModels.sort((a, b) => b.rating - a.rating);
      default:
        return filteredModels;
    }
  };

  const handleFavorite = (modelId: string) => {
    setFavorites(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'favorites': return 'Your Favorites';
      case 'trending': return 'Trending Models';
      case 'new': return 'New Models';
      case 'top-rated': return 'Top Rated Models';
      default: return 'All Models';
    }
  };

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'favorites': return <Sparkles className="w-6 h-6" />;
      case 'trending': return <TrendingUp className="w-6 h-6" />;
      case 'new': return <Users className="w-6 h-6" />;
      case 'top-rated': return <Clock className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <Header
            userBalance={userBalance}
            onAddCoins={() => {}} // سيتم التعامل معها في المكون الرئيسي
            onProfile={() => {}} // سيتم التعامل معها في المكون الرئيسي
            onNotifications={() => setNotificationOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onMenuToggle={() => setSidebarOpen(true)}
          />

          {/* Content */}
          <div className="p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
                  {getSectionIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{getSectionTitle()}</h1>
                  <p className="text-gray-400">{getSectionModels().length} models available</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setAdvancedSearchOpen(true)}
                  className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-4 py-2 rounded-xl transition-all border border-gray-700"
                >
                  <SearchIcon className="w-4 h-4" />
                  <span>Advanced Search</span>
                </button>
                <button
                  onClick={() => setFilterPanelOpen(true)}
                  className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-4 py-2 rounded-xl transition-all border border-gray-700"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {getSectionModels().map(model => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onSelect={onSelectModel}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(model.id)}
                />
              ))}
            </div>

            {getSectionModels().length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No models found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      country: 'all',
                      status: 'all',
                      priceRange: [0, 50],
                      rating: 0,
                      language: 'all'
                    });
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        countries={countries}
        languages={languages}
      />
      
      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      
      {/* Advanced Search */}
      <AdvancedSearch
        isOpen={advancedSearchOpen}
        onClose={() => setAdvancedSearchOpen(false)}
        onSearch={(criteria) => {
          console.log('Advanced search:', criteria);
          // Implement advanced search logic here
        }}
      />
    </div>
  );
};