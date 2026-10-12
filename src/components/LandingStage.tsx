import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Sparkles, BookOpen, Film } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';
import starPosterImg from '../assets/images/hamilton_star_poster_1791621766100.jpg';
import theatreImg from '../assets/images/broadway_richard_rodgers_1791621777237.jpg';

interface LandingStageProps {
  onEnter: () => void;
}

export const LandingStage: React.FC<LandingStageProps> = ({ onEnter }) => {
  // Animation timing phases (0 to 4 across ~5.5 seconds)
  // Phase 0: Pitch black stage
  // Phase 1 (1.0s): Golden star shines
  // Phase 2 (2.2s): HAMILTON title emerges
  // Phase 3 (3.6s): Subtitle & "History has its eyes on you"
  // Phase 4 (4.8s): Enter button appears with golden glow
  const [phase, setPhase] = useState<number>(0);
  const [landingMode, setLandingMode] = useState<'poster' | 'playbill'>('poster');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const t4 = setTimeout(() => setPhase(4), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    hamiltonAudio.playEffect('curtain');
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  const handleOpenPlaybillClick = () => {
    setIsExiting(true);
    hamiltonAudio.playEffect('page');
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050811] transition-all duration-1000 ${
        isExiting ? 'scale-105 opacity-0 filter blur-sm pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image & Theatrical Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {landingMode === 'poster' ? (
          <>
            <img
              src={starPosterImg}
              alt="Hamilton Broadway Emblem"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
                phase >= 1 ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
              }`}
            />
            {/* Deep navy vignette scrim */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#060a16]/80 to-[#03060d]" />
          </>
        ) : (
          <>
            <img
              src={theatreImg}
              alt="Broadway Richard Rodgers Theatre"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
                phase >= 1 ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060e] via-[#050914]/85 to-[#04060e]" />
          </>
        )}
      </div>

      {/* Atmospheric Stage Lighting Spotlight */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#d4af37]/15 via-[#d4af37]/5 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          phase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Floating View Toggle (Discreet and unboxed) */}
      <header className="absolute top-6 z-20 flex items-center justify-between w-full max-w-5xl px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/70 font-cinzel">
          BROADWAY 2015 · HISTORICAL ARCHIVE
        </span>

        <div className="flex items-center gap-1 p-1 rounded-full bg-[#0d1424]/80 border border-[#233052] backdrop-blur-sm text-xs">
          <button
            onClick={() => setLandingMode('poster')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs ${
              landingMode === 'poster'
                ? 'bg-[#d4af37] text-[#070b16] font-semibold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Film className="w-3 h-3" />
            Official Poster
          </button>
          <button
            onClick={() => setLandingMode('playbill')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs ${
              landingMode === 'playbill'
                ? 'bg-[#d4af37] text-[#070b16] font-semibold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Playbill Mode
          </button>
        </div>
      </header>

      {/* Main Content: Scheme 1 (Official Poster Aesthetic) */}
      {landingMode === 'poster' && (
        <main className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto select-none">
          {/* 1. Golden Star Symbol (Appears at Phase 1) */}
          <div
            className={`mb-6 transition-all duration-1000 transform ${
              phase >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4'
            }`}
          >
            <div className="relative inline-flex items-center justify-center">
              <span className="text-[#d4af37] text-4xl sm:text-5xl font-serif text-gold-glow">
                ★
              </span>
            </div>
          </div>

          {/* 2. Title: HAMILTON (Appears at Phase 2) */}
          <h1
            className={`font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.22em] text-[#f4e8c1] transition-all duration-1000 transform text-gold-glow ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            HAMILTON
          </h1>

          {/* 3. Subtitles & Quote (Appears at Phase 3) */}
          <div
            className={`mt-6 space-y-4 transition-all duration-1000 transform ${
              phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="space-y-1">
              <p className="font-cinzel text-sm sm:text-lg md:text-xl text-[#d4af37] tracking-[0.22em] uppercase font-light">
                Who lives, who dies, who tells your story
              </p>
            </div>

            <p className="font-cormorant italic text-lg sm:text-2xl text-stone-300 font-light tracking-wide pt-4">
              "History has its eyes on you."
            </p>
          </div>

          {/* 4. Enter The Archive Button (Appears at Phase 4) */}
          <div
            className={`mt-12 transition-all duration-1000 transform flex flex-col items-center ${
              phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <button
              onClick={handleEnterClick}
              className="group relative px-9 py-3.5 rounded border border-[#d4af37] bg-[#0c1222]/80 text-[#f5ebd2] font-cinzel text-sm sm:text-base tracking-[0.28em] uppercase transition-all duration-300 hover:bg-[#d4af37] hover:text-[#070b16] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-95 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                ENTER THE ARCHIVE
              </span>
            </button>

            {/* Subtle Downward Theatrical Cue Arrow */}
            <div className="mt-4 flex flex-col items-center text-[#d4af37]/70 animate-bounce">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </main>
      )}

      {/* Main Content: Scheme 2 (Broadway Playbill Mode) */}
      {landingMode === 'playbill' && (
        <main className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto select-none py-8">
          {/* Authentic Broadway Playbill Booklet Frame */}
          <div
            className={`w-[320px] sm:w-[380px] bg-[#080d1a] border-4 border-[#1c263d] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 transform hover:scale-[1.01] ${
              phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Iconic Yellow Playbill Header */}
            <div className="bg-[#fad02c] text-[#0a0a0a] px-4 py-2 text-center border-b-2 border-black">
              <span className="font-cinzel text-2xl sm:text-3xl font-black tracking-[0.25em] block leading-none">
                PLAYBILL
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-black/80 mt-1 block">
                RICHARD RODGERS THEATRE · NEW YORK
              </span>
            </div>

            {/* Playbill Cover Art */}
            <div className="p-6 bg-gradient-to-b from-[#0a1020] via-[#080c18] to-[#04060d] text-center border-b border-[#222f4c]">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-[#d4af37] text-3xl font-serif text-gold-glow">
                ★
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-[0.2em] text-[#f4e8c1] text-gold-glow">
                HAMILTON
              </h2>

              <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] mt-2 font-cinzel">
                An American Musical
              </p>

              <div className="my-5 border-y border-[#d4af37]/30 py-2 text-[11px] text-stone-300 font-serif italic">
                Book, Music and Lyrics by Lin-Manuel Miranda
                <br />
                Inspired by the Book by Ron Chernow
              </div>

              <p className="text-xs text-stone-400 font-serif italic">
                "History has its eyes on you."
              </p>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-[#0a0f1d] flex flex-col items-center">
              <button
                onClick={handleOpenPlaybillClick}
                className="w-full py-3 px-6 rounded bg-[#d4af37] text-[#070b16] font-cinzel font-bold text-xs tracking-[0.25em] uppercase hover:bg-[#ebd074] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] cursor-pointer"
              >
                OPEN TONIGHT · ENTER THE SHOW
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-stone-400 font-cinzel tracking-wider">
            Click to turn the page into the historical archive
          </p>
        </main>
      )}

      {/* Footer Curatorial Signature */}
      <footer className="absolute bottom-4 z-20 text-center text-[11px] text-stone-500 font-cinzel tracking-widest">
        BROADWAY OPENING · DIGITAL HUMANITIES ARCHIVE
      </footer>
    </div>
  );
};
