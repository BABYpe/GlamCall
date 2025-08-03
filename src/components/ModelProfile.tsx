import React from 'react';
import { ArrowLeft, Star, MapPin, Globe, Video, Heart, Flag, MessageCircle } from 'lucide-react';
import { Model } from '../types';

interface ModelProfileProps {
  model: Model;
  onBack: () => void;
  onStartCall: (model: Model) => void;
  userBalance: number;
}

export const ModelProfile: React.FC<ModelProfileProps> = ({ 
  model, 
  onBack, 
  onStartCall, 
  userBalance 
}) => {
  const canAffordCall = userBalance >= model.pricePerMinute;

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
            Back to Models
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Images and Basic Info */}
          <div className="lg:col-span-1">
            {/* Main Image */}
            <div className="relative mb-6">
              <img
                src={model.coverImage}
                alt={model.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                model.isOnline 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {model.isOnline ? '🟢 Online' : '⚫ Offline'}
              </div>
            </div>

            {/* Call Button */}
            <button
              onClick={() => onStartCall(model)}
              disabled={!model.isOnline || !canAffordCall}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                model.isOnline && canAffordCall
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-500/25'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Video className="w-5 h-5" />
              <span>Start Video Call</span>
            </button>

            {!canAffordCall && (
              <p className="text-red-400 text-sm mt-2 text-center">
                Insufficient balance. Add more coins to start a call.
              </p>
            )}

            {/* Quick Stats */}
            <div className="bg-gray-800/50 rounded-xl p-4 mt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400">{model.totalMinutes}</div>
                  <div className="text-gray-400 text-sm">Total Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">{model.reviewCount}</div>
                  <div className="text-gray-400 text-sm">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Info */}
          <div className="lg:col-span-2">
            {/* Name and Rating */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{model.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-gold">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{model.rating}</span>
                  <span className="text-gray-400 ml-1">({model.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <span className="text-xl font-bold">${model.pricePerMinute}</span>
                  <span className="text-gray-400 ml-1">/minute</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{model.country}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{(model.languages?.join(', ') || model.language || 'English')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">About Me</h3>
              <p className="text-gray-300 leading-relaxed">{model.description}</p>
            </div>

            {/* Tags */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {model.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
                <span>Add to Favorites</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Send Message</span>
              </button>
              <button className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors">
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>

            {/* Call Info */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 mt-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-2">Call Information</h3>
              <div className="text-gray-300 space-y-1">
                <p>• Calls are charged per minute at ${model.pricePerMinute}/min</p>
                <p>• Your current balance: ${userBalance.toFixed(2)}</p>
                <p>• Estimated call time: {Math.floor(userBalance / model.pricePerMinute)} minutes</p>
                <p>• HD video quality and crystal clear audio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};