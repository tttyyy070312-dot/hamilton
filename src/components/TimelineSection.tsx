import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/hamiltonData';
import { TimelineEvent } from '../types/hamilton';
import { Play, Volume2, MapPin, Quote, Sparkles, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';

export const TimelineSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to 1776 (My Shot)
  const currentEvent: TimelineEvent = TIMELINE_EVENTS[selectedIndex];

  const handleSelectEvent = (index: number) => {
    setSelectedIndex(index);
    const ev = TIMELINE_EVENTS[index];
    if (ev && ev.songTrack) {
      hamiltonAudio.transitionToTrack(ev.songTrack);
    }
  };

  const handlePlayCurrentSong = () => {
    if (currentEvent.songTrack) {
      hamiltonAudio.transitionToTrack(currentEvent.songTrack);
      hamiltonAudio.setMuted(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Editorial Banner */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              CHRONOLOGY OF REVOLUTION & REPUBLIC
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Timeline of Revolution
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            <span className="text-xs text-stone-400 font-serif italic">
              Synchronized with Broadway Score
            </span>
            <button
              onClick={handlePlayCurrentSong}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37] text-[#070b16] text-xs font-cinzel font-semibold hover:bg-[#ebd074] transition-all cursor-pointer shadow-md"
              title="Play this year's score motif"
            >
              <Play className="w-3 h-3 fill-current" />
              Play Motif
            </button>
          </div>
        </div>

        {/* Year Carousel / Ribbon Selector */}
        <div className="relative mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={event.year}
                  onClick={() => handleSelectEvent(idx)}
                  className={`px-4 py-2.5 rounded-lg border text-left transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af37] border-[#d4af37] text-[#070b16] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                      : 'bg-[#0f172a] border-[#223152] text-stone-300 hover:border-[#44567e] hover:bg-[#152038]'
                  }`}
                >
                  <span className={`text-base font-cinzel font-bold block ${isSelected ? 'text-[#070b16]' : 'text-[#f3ebdb]'}`}>
                    {event.year}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider truncate max-w-[120px] block ${isSelected ? 'text-[#070b16]/80 font-medium' : 'text-stone-400'}`}>
                    {event.songTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Magazine Layout for the Selected Year */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-stretch">
        {/* Left Column: Big Year Callout & Musical Manifestation (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#111a31] to-[#0a1020] border border-[#2b3a61] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-5xl sm:text-7xl font-cinzel font-black text-[#d4af37] tracking-tight text-gold-glow">
                {currentEvent.year}
              </span>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel block">Musical Track</span>
                <span className="text-sm font-bold text-white font-cinzel">{currentEvent.songTitle}</span>
              </div>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-4 leading-tight">
              {currentEvent.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{currentEvent.location}</span>
            </div>

            {/* Lyric Excerpt Card */}
            <div className="mt-6 p-4 rounded-xl bg-[#090e1b] border border-[#233152] relative">
              <Quote className="w-6 h-6 text-[#d4af37]/20 absolute top-3 right-3" />
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel block mb-1">
                Broadway Lyric Excerpt
              </span>
              <p className="font-cormorant italic text-sm sm:text-base text-[#e7ded1] leading-relaxed">
                "{currentEvent.lyricSnippet}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#233152] flex items-center justify-between text-xs text-stone-400">
            <span>Figure: <strong className="text-stone-200">{currentEvent.primaryFigure}</strong></span>
            <div className="flex items-center gap-2">
              <button
                disabled={selectedIndex === 0}
                onClick={() => handleSelectEvent(selectedIndex - 1)}
                className="p-1 rounded bg-[#18233d] hover:bg-[#25365e] disabled:opacity-40 cursor-pointer"
                title="Previous Year"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={selectedIndex === TIMELINE_EVENTS.length - 1}
                onClick={() => handleSelectEvent(selectedIndex + 1)}
                className="p-1 rounded bg-[#18233d] hover:bg-[#25365e] disabled:opacity-40 cursor-pointer"
                title="Next Year"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Analysis & Musical Dramatic Staging (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Card 1: Real Historical Context */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#263558] shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              <h4 className="text-xs uppercase tracking-widest font-cinzel font-bold text-[#d4af37]">
                Archival Historical Record
              </h4>
            </div>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {currentEvent.historicalContext}
            </p>
          </div>

          {/* Card 2: Musical Dramatization & Thematic Genius */}
          <div className="p-6 rounded-2xl bg-[#131d35] border border-[#2d3e68] shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <h4 className="text-xs uppercase tracking-widest font-cinzel font-bold text-[#d4af37]">
                Stage & Musical Transformation
              </h4>
            </div>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {currentEvent.musicalInterpretation}
            </p>
          </div>

          {/* Card 3: Notable Epigram */}
          <div className="p-4 rounded-xl bg-[#0b101e] border-l-2 border-[#d4af37] text-xs sm:text-sm text-stone-300 font-serif italic">
            "{currentEvent.quote}"
          </div>
        </div>
      </div>

      {/* Footnote Bar */}
      <div className="pt-6 border-t border-[#1e2a47] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-cinzel">
        <span>HAMILTON CHRONOLOGY · 1772 - 1804</span>
        <span className="mt-1 sm:mt-0">Historical consultation grounded in Ron Chernow's biography</span>
      </div>
    </div>
  );
};
