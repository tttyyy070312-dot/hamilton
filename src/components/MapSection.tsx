import React, { useState } from 'react';
import { MAP_LOCATIONS } from '../data/hamiltonData';
import { MapLocation } from '../types/hamilton';
import { MapPin, Navigation, Compass, Play, Globe } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';
import duelImg from '../assets/images/weehawken_duel_clash_1791621801727.jpg';

export const MapSection: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<MapLocation>(MAP_LOCATIONS[0]);

  const handlePlayAssociatedSong = (loc: MapLocation) => {
    setSelectedLoc(loc);
    // Map to audio track
    if (loc.id === 'weehawken') {
      hamiltonAudio.transitionToTrack('the-world-was-wide-enough');
    } else if (loc.id === 'yorktown-va') {
      hamiltonAudio.transitionToTrack('yorktown');
    } else if (loc.id === 'nevis-stcroix') {
      hamiltonAudio.transitionToTrack('alexander-hamilton');
    } else if (loc.id === 'kings-college') {
      hamiltonAudio.transitionToTrack('my-shot');
    } else if (loc.id === 'morristown') {
      hamiltonAudio.transitionToTrack('the-schuyler-sisters');
    } else if (loc.id === 'federal-hall') {
      hamiltonAudio.transitionToTrack('non-stop');
    } else {
      hamiltonAudio.transitionToTrack('the-room-where-it-happens');
    }
    hamiltonAudio.setMuted(false);
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              HISTORICAL GEOGRAPHY & TOPOGRAPHY
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Revolutionary Map
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-2 sm:mt-0 max-w-md">
            Journey from the Caribbean Leeward Islands through revolutionary Manhattan to the dueling grounds of New Jersey.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Location Pins & Detailed Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-stretch">
        {/* Left Column: Interactive Map Nodes (6 cols) */}
        <div className="lg:col-span-6 bg-[#0c1322] border border-[#233152] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1e2a47]">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-bold flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Revolutionary Landmarks ({MAP_LOCATIONS.length})
            </span>
            <span className="text-xs text-stone-400 font-mono">1757 – 1804</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
            {MAP_LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLoc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#18233d] border-[#d4af37] text-white shadow-lg scale-[1.01]'
                      : 'bg-[#080d19] border-[#1d2740] text-stone-300 hover:border-[#33446b]'
                  }`}
                >
                  <div className="flex items-start gap-3 truncate pr-2">
                    <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#d4af37]' : 'text-stone-500'}`} />
                    <div className="truncate">
                      <h4 className="font-cinzel text-sm font-bold text-white truncate">
                        {loc.name}
                      </h4>
                      <span className="text-xs text-stone-400 truncate block">
                        {loc.region} · {loc.yearActive}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-cinzel uppercase px-2 py-0.5 rounded shrink-0 border ${
                    isSelected ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f7eecf]' : 'bg-[#131b2e] border-[#202c47] text-stone-400'
                  }`}>
                    {loc.associatedSong.split('/')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e2a47] text-[11px] text-stone-400 font-serif italic text-center">
            Select a waypoint to inspect historical events and hear associated musical numbers
          </div>
        </div>

        {/* Right Column: Location Spotlight & Featured Imagery (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#11192e] to-[#090e1b] border border-[#2b3a61] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          {/* Weehawken or Historic Graphic Spotlight */}
          {selectedLoc.id === 'weehawken' ? (
            <div className="rounded-xl overflow-hidden mb-5 border border-[#2b3a61] relative h-48 sm:h-56">
              <img
                src={duelImg}
                alt="Weehawken Dueling Grounds"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1b] via-transparent to-black/30" />
              <span className="absolute bottom-3 left-4 text-xs font-cinzel text-[#d4af37] bg-black/70 px-2.5 py-1 rounded border border-[#d4af37]/40">
                July 11, 1804 · The Palisades
              </span>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden mb-5 border border-[#2b3a61] bg-[#0c1222] p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#d4af37] block">
                  Region Topography
                </span>
                <span className="font-cinzel text-lg font-bold text-white">
                  {selectedLoc.region}
                </span>
                <span className="text-xs text-stone-400 font-mono block mt-0.5">
                  Chronology: {selectedLoc.yearActive}
                </span>
              </div>
              <Globe className="w-10 h-10 text-[#d4af37]/40" />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between border-b border-[#233152] pb-3 mb-4">
              <h3 className="font-cinzel text-2xl font-bold text-white">
                {selectedLoc.name}
              </h3>
              <button
                onClick={() => handlePlayAssociatedSong(selectedLoc)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37] text-[#070b16] font-cinzel font-bold text-xs hover:bg-[#ebd074] transition-all cursor-pointer shadow"
                title="Play associated Broadway song"
              >
                <Play className="w-3 h-3 fill-current" />
                Score Cue
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#080d19] border border-[#202c47] mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-cinzel block mb-1 font-bold">
                Archival Event
              </span>
              <p className="font-cinzel text-sm font-semibold text-[#f5ebd2]">
                {selectedLoc.historicalEvent}
              </p>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {selectedLoc.description}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-[#1e2a47] flex items-center justify-between text-xs text-stone-400">
            <span>Soundtrack: <strong className="text-[#d4af37]">{selectedLoc.associatedSong}</strong></span>
            <span className="font-cinzel text-[11px] text-stone-400">Early Republic Coordinates</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        GEOGRAPHIC TRAJECTORY · CARIBBEAN ROOTS TO MANHATTAN POWER
      </div>
    </div>
  );
};
