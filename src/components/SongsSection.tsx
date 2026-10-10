import React, { useState } from 'react';
import { SONGS_CATALOG } from '../data/hamiltonData';
import { SongItem } from '../types/hamilton';
import { Play, Disc, Quote, Clock, Layers, Sparkles, Search } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';

export const SongsSection: React.FC = () => {
  const [selectedAct, setSelectedAct] = useState<1 | 2 | 'all'>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSong, setActiveSong] = useState<SongItem>(SONGS_CATALOG[0]);

  const filteredSongs = SONGS_CATALOG.filter((s) => {
    const matchesAct = selectedAct === 'all' || s.act === selectedAct;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.performers.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keyTheme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAct && matchesSearch;
  });

  const handlePlaySong = (song: SongItem) => {
    setActiveSong(song);
    hamiltonAudio.transitionToTrack(song.id);
    hamiltonAudio.setMuted(false);
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Banner */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              THE COMPLETE ORIGINAL BROADWAY SCORE · ALL 46 NUMBERS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Every Song in the Score
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-2 sm:mt-0">
            From "Alexander Hamilton" to "Who Lives, Who Dies" — all 46 musical numbers fully cataloged and playable.
          </p>
        </div>

        {/* Act Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-[#0d1424] rounded-lg border border-[#233152] w-fit">
            <button
              onClick={() => setSelectedAct(1)}
              className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer ${
                selectedAct === 1
                  ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ACT I (Tracks 1–23)
            </button>
            <button
              onClick={() => setSelectedAct(2)}
              className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer ${
                selectedAct === 2
                  ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ACT II (Tracks 24–46)
            </button>
            <button
              onClick={() => setSelectedAct('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer ${
                selectedAct === 'all'
                  ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All 46 Songs
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, performer, genre..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0d1424] border border-[#233152] text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      </div>

      {/* Main Split: Song List on Left, Active Song Deep-Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-stretch">
        {/* Left Column: Track List (5 cols) */}
        <div className="lg:col-span-5 bg-[#0d1424] border border-[#243254] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#d4af37]">
              Tracklist ({filteredSongs.length} / 46 Songs)
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              Act {selectedAct === 'all' ? 'I & II' : selectedAct}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSongs.map((song) => {
              const isSelected = song.id === activeSong.id;
              return (
                <div
                  key={song.id}
                  onClick={() => setActiveSong(song)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#18233d] border-[#d4af37] text-white shadow-md'
                      : 'bg-[#090f1e] border-[#1e2a47] text-stone-300 hover:border-[#38486e]'
                  }`}
                >
                  <div className="truncate pr-3">
                    <span className="text-[10px] text-stone-400 font-mono block">
                      Act {song.act} · #{song.number} · {song.genre.split('/')[0]}
                    </span>
                    <h4 className="font-cinzel text-sm font-bold text-white truncate">
                      {song.title}
                    </h4>
                    <span className="text-[11px] text-stone-400 truncate block">
                      {song.performers.join(', ')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySong(song);
                    }}
                    className={`p-2 rounded-full transition-transform active:scale-95 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#070b16]'
                        : 'bg-[#1b2640] text-stone-300 hover:text-white hover:bg-[#25365c]'
                    }`}
                    title="Play musical motif in pit"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1e2a47] text-[11px] text-stone-400 font-serif italic text-center">
            Click any track to inspect lyrics, rhythmic analysis, and hear the pit synthesizer
          </div>
        </div>

        {/* Right Column: Song Anatomy & Analysis (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#11192e] to-[#090e1b] border border-[#2b3a61] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-[#233152] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-bold">
                  Act {activeSong.act} · Number {activeSong.number}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                  {activeSong.title}
                </h3>
              </div>

              <button
                onClick={() => handlePlaySong(activeSong)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d4af37] text-[#070b16] font-cinzel font-bold text-xs hover:bg-[#ebd074] transition-all cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Play in Pit
              </button>
            </div>

            {/* Metadata strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0b101f] border border-[#1f2b45]">
                <span className="text-stone-400 block text-[10px] uppercase font-cinzel">Musical Genre</span>
                <span className="text-white font-medium">{activeSong.genre}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0b101f] border border-[#1f2b45]">
                <span className="text-stone-400 block text-[10px] uppercase font-cinzel">Tempo</span>
                <span className="text-white font-mono">{activeSong.bpm} BPM</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0b101f] border border-[#1f2b45] col-span-2 sm:col-span-1">
                <span className="text-stone-400 block text-[10px] uppercase font-cinzel">Central Theme</span>
                <span className="text-white font-medium">{activeSong.keyTheme}</span>
              </div>
            </div>

            {/* Lyric Excerpt */}
            <div className="p-4 rounded-xl bg-[#080d1a] border border-[#233152] relative my-4">
              <Quote className="w-8 h-8 text-[#d4af37]/20 absolute top-2 right-3" />
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel block mb-1">
                Signature Lyric Excerpt
              </span>
              <p className="font-cormorant italic text-base sm:text-lg text-[#f3ebdb] leading-relaxed">
                "{activeSong.lyricsExcerpt}"
              </p>
            </div>

            {/* Thematic & Historical Analysis */}
            <div className="space-y-3 mt-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#0f172a] border border-[#233152]">
                <h5 className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                  Historical Grounding
                </h5>
                <p className="text-stone-300 font-light leading-relaxed">
                  {activeSong.historicalSignificance}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0f172a] border border-[#233152]">
                <h5 className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                  Musical Composition Analysis
                </h5>
                <p className="text-stone-300 font-light leading-relaxed">
                  {activeSong.thematicAnalysis}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e2a47] text-xs text-stone-400 flex items-center justify-between">
            <span>Performers: {activeSong.performers.join(', ')}</span>
            <span className="text-[#d4af37] font-cinzel">Score Archive</span>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <div className="pt-6 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        COMPLETE ORIGINAL BROADWAY SCORE · 46 COMPOSITIONS BY LIN-MANUEL MIRANDA
      </div>
    </div>
  );
};
