import React, { useState } from 'react';
import { 
  Video, 
  Shield, 
  Globe, 
  Coins, 
  Star, 
  Users, 
  MessageCircle, 
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'video' | 'chat' | 'coins' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const features = [
    {
      id: 'video',
      icon: Video,
      title: 'مكالمات فيديو عالية الجودة',
      description: 'استمتع بمكالمات فيديو واضحة مع عارضات محترفات',
      color: 'purple',
      demo: (
        <div className="bg-gray-800 rounded-lg p-4 aspect-video relative overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Video Call Demo"
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="font-semibold">Sofia Rodriguez</div>
                <div className="text-sm text-gray-300">🟢 Online • HD Quality</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'دردشة تفاعلية',
      description: 'تواصل مع العارضات عبر الرسائل والهدايا',
      color: 'pink',
      demo: (
        <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Model"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gray-700 rounded-lg p-2 max-w-xs">
                <p className="text-white text-sm">مرحباً! كيف حالك اليوم؟ 😊</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 justify-end">
              <div className="bg-purple-600 rounded-lg p-2 max-w-xs">
                <p className="text-white text-sm">أهلاً! أنا بخير، شكراً لك</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Model"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 border border-gold/30 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌹</span>
                  <div>
                    <div className="text-gold font-semibold text-sm">وردة</div>
                    <div className="text-xs text-gold/75">هدية من المعجب</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'coins',
      icon: Coins,
      title: 'نظام عملات مرن',
      description: 'اشتري العملات واستخدمها للمحادثات والهدايا',
      color: 'gold',
      demo: (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-gold mb-2">250 عملة</div>
            <div className="text-gray-400 text-sm">رصيدك الحالي</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">مكالمة مع Sofia</span>
              <span className="text-red-400 text-sm">-21 عملة</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">هدية وردة</span>
              <span className="text-red-400 text-sm">-5 عملات</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-900/30 rounded">
              <span className="text-white text-sm">شراء باقة</span>
              <span className="text-green-400 text-sm">+100 عملة</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-800/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            اكتشف ميزات GlamCall
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            تجربة محادثات مرئية متطورة مع أحدث التقنيات
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeDemo === feature.id;
              
              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveDemo(isActive ? null : feature.id as any)}
                  className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600/20 border-purple-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700/50 text-purple-400 group-hover:bg-purple-600/20'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                        isActive ? 'text-purple-300' : 'text-white group-hover:text-purple-300'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Area */}
          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 min-h-[400px] flex items-center justify-center">
              {activeDemo ? (
                <div className="w-full">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {features.find(f => f.id === activeDemo)?.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      تجربة تفاعلية للميزة
                    </p>
                  </div>
                  {features.find(f => f.id === activeDemo)?.demo}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    انقر على أي ميزة
                  </h3>
                  <p className="text-gray-400">
                    لمشاهدة عرض توضيحي تفاعلي
                  </p>
                </div>
              )}
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              🟢 2,341 متصل الآن
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              ⭐ تقييم 4.9/5
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};