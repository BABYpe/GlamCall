import React, { useState, useMemo } from 'react';
import { Filter, TrendingUp, Sparkles, Users, Clock, Search as SearchIcon, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useModels, useFavorites } from '../hooks/useModels';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ModelCard } from './ModelCard';
import { FilterPanel } from './FilterPanel';
import { NotificationCenter } from './NotificationCenter';
import { AdvancedSearch } from './AdvancedSearch';
import { LoadingSpinner } from './LoadingSpinner';
import { ProtectedRoute } from './ProtectedRoute';
import { SupabaseConnectionBanner } from './SupabaseConnectionBanner';

interface EnhancedHomePageProps {
  onSelectModel: (model: any) => void;
}

export const EnhancedHomePage: React.FC<EnhancedHomePageProps> = ({ onSelectModel }) => {
  const { user, userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [filters, setFilters] = useState({
    country: 'all',
    status: 'all',
    priceRange: [0, 50] as [number, number],
    rating: 0,
    language: 'all'
  });
  // Helper function to safely get language string from model
  const getModelLanguageString = (model: any): string => {
    if (Array.isArray(model.languages)) {
      return model.languages.map(lang => String(lang)).join(' ').toLowerCase();
    }
    if (typeof model.language === 'string') {
      return model.language.toLowerCase();
    }
    return '';
  };

  // Filter models based on search and other criteria
  const filteredModels = useMemo(() => {
    if (!models || models.length === 0) return [];

    return models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = model.rating >= filters.rating;
      const matchesLanguage = filters.language === 'all' || 
                             getModelLanguageString(model).includes(filters.language.toLowerCase());
      
      return matchesSearch && matchesRating && matchesLanguage;
    });
  }, [models, searchTerm, filters]);

  const getSectionModels = () => {
    const favoriteIds = (favorites || []).map(fav => fav?.id || fav);
    
    switch (activeSection) {
      case 'favorites':
        return filteredModels.filter(model => favoriteIds.includes(model.id));
      case 'trending':
        return filteredModels.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      case 'new':
        return filteredModels.sort((a, b) => (b.totalMinutes || 0) - (a.totalMinutes || 0));
      case 'top-rated':
        return filteredModels.sort((a, b) => b.rating - a.rating);
      default:
        return filteredModels;
    }
  };

  const handleFavorite = (modelId: string) => {
    const isFavorite = (favorites || []).some(fav => (fav?.id || fav) === modelId);
    if (isFavorite) {
      removeFromFavorites(modelId);
    } else {
      addToFavorites(modelId);
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'favorites': return 'المفضلة';
      case 'trending': return 'الأكثر شعبية';
      case 'new': return 'العارضات الجديدات';
      case 'top-rated': return 'الأعلى تقييماً';
      default: return 'جميع العارضات';
    }
  };

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'favorites': return <Sparkles className="w-6 h-6" />;
      case 'trending': return <TrendingUp className="w-6 h-6" />;
      case 'new': return <Users className="w-6 h-6" />;
      case 'top-rated': return <Star className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="جاري تحميل العارضات..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">خطأ في التحميل</h2>
          <p className="text-gray-400 mb-6">حدث خطأ أثناء تحميل البيانات</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
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
              userBalance={userProfile?.balance || 0}
              onAddCoins={() => {}} // Will be handled in parent component
              onProfile={() => {}} // Will be handled in parent component
              onNotifications={() => setNotificationOpen(true)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onMenuToggle={() => setSidebarOpen(true)}
            />

            {/* Content */}
            <div className="p-6">
              {/* Supabase Connection Banner */}
              <SupabaseConnectionBanner />
              
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
                    {getSectionIcon()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{getSectionTitle()}</h1>
                    <p className="text-gray-400">{getSectionModels().length} عارضة متاحة</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setAdvancedSearchOpen(true)}
                    className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-4 py-2 rounded-xl transition-all border border-gray-700"
                  >
                    <SearchIcon className="w-4 h-4" />
                    <span>بحث متقدم</span>
                  </button>
                  <button
                    onClick={() => setFilterPanelOpen(true)}
                    className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-4 py-2 rounded-xl transition-all border border-gray-700"
                  >
                    <Filter className="w-4 h-4" />
                    <span>فلاتر</span>
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
                    isFavorite={(favorites || []).some(fav => (fav?.id || fav) === model.id)}
                  />
                ))}
              </div>

              {getSectionModels().length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">لا توجد عارضات</h3>
                  <p className="text-gray-400 mb-6">جرب تعديل البحث أو الفلاتر</p>
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
                    مسح الفلاتر
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Modals */}
        <FilterPanel
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          countries={[...new Set(models?.map(model => model.country) || [])]}
          languages={[...new Set(models?.flatMap(model => model.languages) || [])]}
        />
        
        <NotificationCenter
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
        />
        
        <AdvancedSearch
          isOpen={advancedSearchOpen}
          onClose={() => setAdvancedSearchOpen(false)}
          onSearch={(criteria) => {
            console.log('Advanced search:', criteria);
            // Implement advanced search logic here
          }}
        />
      </div>
    </ProtectedRoute>
  );
};