import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Youtube, Image, Clock, Calendar, ChevronRight, Send } from 'lucide-react';

const Scheduler = () => {
  const [caption, setCaption] = useState("");
  const [activePlatform, setActivePlatform] = useState('instagram');

  const platforms = [
    { key: 'instagram', icon: Instagram, label: 'Instagram', color: '#E1306C', shadow: 'shadow-pink-200' },
    { key: 'twitter', icon: Twitter, label: 'X / Twitter', color: '#1DA1F2', shadow: 'shadow-blue-200' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: '#0077B5', shadow: 'shadow-blue-200' },
    { key: 'facebook', icon: Facebook, label: 'Facebook', color: '#1877F2', shadow: 'shadow-blue-200' },
    // { key: 'tiktok', icon: Tiktok, label: 'TikTok', color: '#000000', shadow: 'shadow-gray-200' },
    { key: 'youtube', icon: Youtube, label: 'YouTube', color: '#FF0000', shadow: 'shadow-red-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT CARD: COMPOSER */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 shadow-2xl shadow-slate-200/30 border border-white/50">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">New Post</h2>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
          </header>

          {/* Platform Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {platforms.map(({ key, icon: Icon, label, color, shadow }) => (
              <button 
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  activePlatform === key 
                    ? `bg-[${color}] text-white shadow-lg ${shadow} transform scale-105` 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}>
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="space-y-4 mb-8">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Composer</label>
            <div className="relative bg-slate-50/80 rounded-2xl border border-slate-100 p-4 hover:border-slate-200 transition-colors">
              <textarea 
                className="w-full h-32 bg-transparent border-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent text-slate-700 placeholder-slate-300 resize-none outline-none"
                placeholder={`Write your ${activePlatform} post...`}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group">
                  <Image size={18} className="group-hover:scale-110 transition-transform" /> 
                  <span className="text-sm font-medium">Add Media</span>
                </button>
                <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-400 shadow-sm">
                  {caption.length}/280
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="space-y-4 mb-10">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduling Options</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md cursor-pointer transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-800 mb-3 font-semibold text-sm">
                  <Clock size={16} className="text-indigo-500" /> Suggested Times
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {['09:00', '12:30', '18:00', '21:00'].map(t => (
                    <span key={t} className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:bg-indigo-100 transition-colors cursor-pointer">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white/50 border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between hover:border-indigo-200 hover:shadow-md cursor-pointer transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                  <Calendar size={16} className="text-indigo-500" /> Custom Date
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Save Draft</button>
            <button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-indigo-100 transition-all duration-300 active:scale-95 transform hover:shadow-xl">
              Schedule Post <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT CARD: PREVIEW */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 shadow-2xl shadow-slate-200/30 border border-white/50 flex flex-col items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight mb-8 self-start">Live Preview</h2>
          
          {/* Mockup Phone */}
          <div className="w-[280px] h-[580px] relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-4 border-8 border-gray-700 shadow-2xl flex flex-col overflow-hidden">
            <div className="w-20 h-6 bg-gray-700 rounded-full self-center mb-6"></div>
            
            <div className={`bg-white rounded-[24px] flex-1 p-4 overflow-hidden ${activePlatform === 'tiktok' ? 'bg-black text-white' : ''}`}>
              {/* Platform Header */}
              <div className={`flex items-center gap-3 mb-4 ${activePlatform === 'tiktok' ? 'text-white' : 'text-gray-800'}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                <div>
                  <div className="h-3 w-20 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-12 bg-slate-100 rounded"></div>
                </div>
                <div className="ml-auto">
                  <div className={`w-6 h-6 rounded-full ${activePlatform === 'tiktok' ? 'bg-white' : 'bg-gray-200'}`}></div>
                </div>
              </div>

              {/* Media Preview */}
              <div className={`w-full aspect-video ${activePlatform === 'tiktok' ? 'bg-black' : 'bg-slate-50'} rounded-xl border-2 border-dashed ${activePlatform === 'tiktok' ? 'border-white/20' : 'border-slate-100'} flex items-center justify-center text-sm font-medium mb-4 text-center p-4`}>
                <span className={`${activePlatform === 'tiktok' ? 'text-white/60' : 'text-slate-300'}`}>
                  {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} Media Preview
                </span>
              </div>

              {/* Caption */}
              <div className={`space-y-2 ${activePlatform === 'tiktok' ? 'text-white' : ''}`}>
                <p className={`text-sm leading-relaxed ${activePlatform === 'tiktok' ? 'text-white/90' : 'text-slate-600'}`}>
                  {caption || `Your ${activePlatform} post will appear here...`}
                </p>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span>❤️ 1.2K</span>
                  <span>💬 45</span>
                  <span>🔗 Share</span>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-24 bg-gray-700 rounded-full self-center mt-4"></div>
          </div>

          {/* Platform Indicator */}
          <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
            <span className="text-xs text-slate-400">Preview for:</span>
            <div className={`w-4 h-4 rounded-full ${platforms.find(p => p.key === activePlatform)?.color || '#000'}`}></div>
            <span className="font-semibold capitalize">{activePlatform}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scheduler;