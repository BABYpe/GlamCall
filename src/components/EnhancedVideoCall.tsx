import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Settings, 
  MessageCircle, 
  Maximize, 
  Minimize,
  Volume2,
  VolumeX,
  RotateCcw,
  Camera,
  Monitor,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Model } from '../types';
import { LiveChat } from './LiveChat';

interface EnhancedVideoCallProps {
  model: Model;
  onEndCall: (duration: number) => void;
  userBalance: number;
}

export const EnhancedVideoCall: React.FC<EnhancedVideoCallProps> = ({ 
  model, 
  onEndCall, 
  userBalance 
}) => {
  const [duration, setDuration] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [tip, setTip] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [showSettings, setShowSettings] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'HD' | 'SD' | 'LOW'>('HD');
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1;
        const newCost = (newDuration / 60) * model.pricePerMinute;
        setTotalCost(newCost);
        
        // Auto end call if balance runs out
        if (newCost >= userBalance) {
          clearInterval(interval);
          onEndCall(newDuration);
        }
        
        return newDuration;
      });
    }, 1000);

    // Simulate connection quality changes
    const qualityInterval = setInterval(() => {
      const qualities: Array<'excellent' | 'good' | 'poor'> = ['excellent', 'good', 'poor'];
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(qualityInterval);
    };
  }, [model.pricePerMinute, userBalance, onEndCall]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onEndCall(duration);
  };

  const handleSendGift = (gift: any) => {
    setTip(prev => prev + gift.value);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case 'excellent': return <Wifi className="w-4 h-4 text-green-400" />;
      case 'good': return <Wifi className="w-4 h-4 text-yellow-400" />;
      case 'poor': return <WifiOff className="w-4 h-4 text-red-400" />;
    }
  };

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
    }
  };

  return (
    <>
      <div className={`min-h-screen bg-black flex flex-col relative ${chatOpen ? 'pr-80' : ''}`}>
        {/* Video Container */}
        <div className="flex-1 relative">
          {/* Model Video (Main) */}
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={model.coverImage}
              autoPlay
              muted={!isVolumeOn}
            />
            
            {/* Video Quality Overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-lg rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2 text-white text-sm">
                {getConnectionIcon()}
                <span className={getQualityColor()}>{videoQuality}</span>
                <span className="text-gray-400">•</span>
                <span className={getQualityColor()}>{connectionQuality}</span>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-lg rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2 text-white text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>REC</span>
                </div>
              </div>
            )}

            {/* User Video (Picture-in-Picture) */}
            <div className="absolute bottom-20 right-4 w-40 h-28 bg-gray-800 rounded-lg overflow-hidden border-2 border-purple-500 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-gray-900 flex items-center justify-center relative">
                {isVideoOn ? (
                  <div className="text-white text-xs">Your Video</div>
                ) : (
                  <VideoOff className="w-6 h-6 text-gray-400" />
                )}
                
                {/* PiP Controls */}
                <div className="absolute top-1 right-1 flex space-x-1">
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className="p-1 bg-black/50 rounded text-white hover:bg-black/70 transition-colors"
                  >
                    {isVideoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Call Stats Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-lg rounded-lg p-4 text-white min-w-[200px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{model.name}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>
                
                <div className="text-2xl font-mono text-purple-400">{formatTime(duration)}</div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-gold">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Balance:</span>
                    <span className="text-white">${(userBalance - totalCost).toFixed(2)}</span>
                  </div>
                  {tip > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tips:</span>
                      <span className="text-green-400">${tip.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center Controls (Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-lg rounded-full px-6 py-3">
                <button
                  onClick={toggleFullscreen}
                  className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-full transition-all"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-full transition-all"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50 text-white'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls Bar */}
        <div className="bg-black/90 backdrop-blur-lg border-t border-gray-800 p-4">
          <div className="max-w-2xl mx-auto">
            {/* Main Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              {/* Video Toggle */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  isVideoOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              {/* Audio Toggle */}
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  isAudioOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              {/* Volume Toggle */}
              <button
                onClick={() => setIsVolumeOn(!isVolumeOn)}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  isVolumeOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isVolumeOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>

              {/* End Call */}
              <button
                onClick={handleEndCall}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-6 h-6 transform rotate-[135deg]" />
              </button>

              {/* Chat Toggle */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  chatOpen 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
              </button>

              {/* Screen Share */}
              <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all transform hover:scale-105">
                <Monitor className="w-6 h-6" />
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                {getConnectionIcon()}
                <span className="text-gray-300">Connection: </span>
                <span className={getQualityColor()}>{connectionQuality}</span>
              </div>
              
              <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-gray-300">
                Quality: {videoQuality}
              </div>
              
              <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-gray-300">
                Rate: ${model.pricePerMinute}/min
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-gray-700 p-4 min-w-[300px]">
            <h3 className="text-white font-semibold mb-4">Call Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Video Quality</label>
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value as any)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="HD">HD (720p)</option>
                  <option value="SD">SD (480p)</option>
                  <option value="LOW">Low (240p)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Auto-adjust quality</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
              >
                Close Settings
              </button>
            </div>
          </div>
        )}

        {/* Low Balance Warning */}
        {userBalance - totalCost < model.pricePerMinute * 2 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600/90 backdrop-blur-lg text-white px-6 py-4 rounded-lg border border-red-500 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">⚠️ Low Balance Warning</div>
              <div className="text-sm">Your call will end in approximately {Math.floor((userBalance - totalCost) / model.pricePerMinute)} minutes</div>
              <button className="mt-3 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Add Coins Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Live Chat */}
      <LiveChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        modelName={model.name}
        modelAvatar={model.avatar}
        onSendGift={handleSendGift}
      />
    </>
  );
};