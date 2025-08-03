import React, { useState } from 'react';
import { Star, MapPin, Globe, Video, Heart, Eye, Clock, Zap } from 'lucide-react';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
  onSelect: (model: Model) => void;
  onFavorite?: (modelId: string) => void;
  isFavorite?: boolean;
  showQuickCall?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({ 
  model, 
  onSelect, 
  onFavorite,
  isFavorite = false,
  showQuickCall = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(model.id);
  };

  return (
    <div
      onClick={() => onSelect(model)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-gray-700/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-700 hover:border-purple-500/30"
    >
      {/* Model Image */}
      <div className="relative overflow-hidden">
        <div className={`w-full h-64 bg-gray-700 ${!imageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={model.avatar}
            alt={model.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Online Status */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
          model.isOnline 
            ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/25' 
            : 'bg-gray-600/90 text-gray-300'
        }`}>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${model.isOnline ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
            <span>{model.isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/25' 
              : 'bg-gray-800/70 text-gray-300 hover:bg-red-500/90 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions */}
        <div className={`absolute bottom-3 right-3 flex space-x-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {showQuickCall && model.isOnline && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(model);
              }}
              className="p-2 bg-purple-600/90 hover:bg-purple-700/90 text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              <Video className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(model);
            }}
            className="p-2 bg-gray-800/70 hover:bg-gray-700/90 text-white rounded-full backdrop-blur-sm transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Live Indicator */}
        {model.isOnline && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-red-500/90 px-2 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        )}
      </div>

      {/* Model Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
              {model.name}
            </h3>
            <div className="flex items-center text-gray-400 text-sm space-x-3">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{model.country}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                <span>{String(model.languages?.[0] || model.language?.split(',')[0] || 'English')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-gold">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-semibold">{model.rating}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{model.totalMinutes}m</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Eye className="w-4 h-4 mr-1" />
            <span>{model.reviewCount}</span>
          </div>
          <div className="text-purple-400 font-semibold">
            ${model.pricePerMinute}/min
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {model.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/20"
            >
              {String(tag)}
            </span>
          ))}
          {model.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full border border-gray-500/20">
              +{model.tags.length - 2}
            </span>
          )}
        </div>

        {/* Call Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(model);
          }}
          disabled={!model.isOnline}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            model.isOnline
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]'
              : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {model.isOnline ? (
            <>
              <Zap className="w-4 h-4" />
              <span>Start Call</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              <span>Offline</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};