import React, { useState } from 'react';
import { CHARACTERS } from '../data/hamiltonData';
import { Character } from '../types/hamilton';
import { Sparkles, BookOpen, Quote, Music, UserCheck, X, Search, Play } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';

export const CharactersSection: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);

  const factions = ['All', 'Federalist', 'Democratic-Republican', 'Schuyler', 'Patriot', 'Crown'];

  const filteredCharacters = CHARACTERS.filter((c) => {
    const matchesFaction = selectedFaction === 'All' || c.faction === selectedFaction;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.originalActor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFaction && matchesSearch;
  });

  const handlePlaySongName = (songName: string) => {
    // Convert song name to normalized track id if possible
    const normalizedId = songName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    hamiltonAudio.transitionToTrack(normalizedId);
    hamiltonAudio.setMuted(false);
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Header & Filter Controls */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              DRAMATIS PERSONAE · COMPLETE ARCHIVAL DIRECTORY ({CHARACTERS.length} FIGURES)
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              All Named Figures
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic max-w-md mt-2 md:mt-0">
            Every named character in the musical — from the Founding Fathers and Schuyler Sisters to loyalist clergy and soldiers of fate.
          </p>
        </div>

        {/* Filter Controls Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          {/* Faction Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0d1424] rounded-lg border border-[#233152] w-fit overflow-x-auto custom-scrollbar">
            {factions.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFaction(f)}
                className={`px-3 py-1.5 text-xs font-cinzel rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedFaction === f
                    ? 'bg-[#d4af37] text-[#070b16] font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, actor, role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0d1424] border border-[#233152] text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Character Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto max-h-[620px] overflow-y-auto pr-1 custom-scrollbar py-2">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            onClick={() => setActiveCharacter(character)}
            className="group relative rounded-xl bg-gradient-to-b from-[#11192e] to-[#0a0f1d] border border-[#263558] hover:border-[#d4af37] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Faction Tag */}
              <div className="flex items-center justify-between text-[11px] mb-2.5">
                <span className="text-[#d4af37] font-cinzel tracking-wider uppercase font-semibold">
                  {character.faction}
                </span>
                <span className="text-stone-400 font-mono text-[10px]">
                  {character.originalActor}
                </span>
              </div>

              {/* Character Name */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-[#f3eccf] transition-colors leading-tight">
                {character.name}
              </h3>

              <p className="text-xs text-stone-400 mt-1 font-medium line-clamp-1">
                {character.role}
              </p>

              {/* Quote Excerpt */}
              <div className="mt-3.5 pt-2.5 border-t border-[#1e2a47]">
                <p className="font-cormorant italic text-xs text-[#dcd4c5] line-clamp-2">
                  "{character.famousQuote}"
                </p>
              </div>
            </div>

            {/* Bottom Key Songs & Explore CTA */}
            <div className="mt-4 pt-2.5 border-t border-[#1e2a47] flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-400 flex items-center gap-1 truncate max-w-[140px]">
                <Music className="w-3 h-3 text-[#d4af37] shrink-0" />
                <span className="truncate">{character.keySongs[0]}</span>
              </span>
              <span className="text-[#d4af37] font-cinzel text-[11px] font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
                View &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal for Selected Character */}
      {activeCharacter && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1222] border border-[#d4af37]/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveCharacter(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-[#1a2540] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-[#233152] pb-4 mb-5">
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-cinzel tracking-wider uppercase mb-1">
                <span>{activeCharacter.faction}</span>
                <span>·</span>
                <span>Broadway Cast: {activeCharacter.originalActor}</span>
              </div>
              <h3 className="font-cinzel text-3xl font-bold text-white">
                {activeCharacter.name}
              </h3>
              <p className="text-sm text-stone-300 mt-1 font-serif italic">
                {activeCharacter.role}
              </p>
            </div>

            {/* Quote Banner */}
            <div className="p-4 rounded-xl bg-[#131d33] border border-[#2b3a61] mb-5 relative">
              <Quote className="w-8 h-8 text-[#d4af37]/15 absolute top-2 right-2" />
              <p className="font-cormorant italic text-base sm:text-lg text-[#f3ebdb]">
                "{activeCharacter.famousQuote}"
              </p>
            </div>

            {/* Two Column Detail: Historical vs Musical */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#090e1a] border border-[#1f2b45]">
                <h4 className="text-xs uppercase tracking-widest font-cinzel text-[#d4af37] font-bold mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Archival Historical Biography
                </h4>
                <p className="text-stone-300 leading-relaxed font-light">
                  {activeCharacter.historicalBio}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e1a] border border-[#1f2b45]">
                <h4 className="text-xs uppercase tracking-widest font-cinzel text-[#d4af37] font-bold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Musical Dramatization Persona
                </h4>
                <p className="text-stone-300 leading-relaxed font-light">
                  {activeCharacter.musicalPersona}
                </p>
              </div>
            </div>

            {/* Signature Songs Chips */}
            <div className="mt-5 pt-4 border-t border-[#233152]">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-cinzel block mb-2">
                Signature Broadway Musical Numbers (Click to Play)
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCharacter.keySongs.map((song) => (
                  <button
                    key={song}
                    onClick={() => handlePlaySongName(song)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17223b] hover:bg-[#d4af37] text-stone-200 hover:text-[#070b16] border border-[#2d3e68] hover:border-[#d4af37] text-xs font-serif transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {song}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Signature */}
      <div className="pt-4 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        DRAMATIS PERSONAE · {CHARACTERS.length} OFFICIAL CHARACTERS CATALOGED
      </div>
    </div>
  );
};
