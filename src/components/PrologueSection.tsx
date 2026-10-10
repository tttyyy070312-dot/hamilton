import React from 'react';
import { ChevronDown, Clock, Users, Music2, BookMarked, FileText, Compass, Theater } from 'lucide-react';
import { SectionId } from '../types/hamilton';

interface PrologueSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const PrologueSection: React.FC<PrologueSectionProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: 'timeline' as SectionId,
      title: 'Timeline of Revolution',
      subtitle: '1772 – 1804',
      song: 'My Shot',
      description: 'Follow Hamilton\'s meteoric rise from Caribbean orphan to Treasury Secretary, through constitutional battles to the fatal dawn at Weehawken.',
      icon: Clock,
      gradient: 'from-[#19223c] to-[#0e1424]',
      badge: 'Interactive Chronology',
    },
    {
      id: 'characters' as SectionId,
      title: 'Founding Figures & Sisters',
      subtitle: '8 Key Figures',
      song: 'The Schuyler Sisters',
      description: 'Explore Hamilton, Burr, Washington, Jefferson, Eliza, and Angelica — comparing their Broadway stage personas with real historical letters.',
      icon: Users,
      gradient: 'from-[#201d36] to-[#0e1424]',
      badge: 'Cast & History',
    },
    {
      id: 'songs' as SectionId,
      title: 'The Broadway Score',
      subtitle: 'Acts I & II',
      song: 'Wait for It / Non-Stop',
      description: 'Deconstruct Lin-Manuel Miranda\'s musical motifs, hip-hop rhyme schemes, R&B harmonies, and historical storytelling in 46 numbers.',
      icon: Music2,
      gradient: 'from-[#1d273a] to-[#0c1220]',
      badge: 'Musical Anatomy',
    },
    {
      id: 'history' as SectionId,
      title: 'Stage vs. Real History',
      subtitle: 'Fact vs. Drama',
      song: 'Cabinet Battle #1',
      description: 'Examine where the musical compressed time, created romantic foils, and adhered with astonishing accuracy to historical archives.',
      icon: BookMarked,
      gradient: 'from-[#2b1f24] to-[#0e1424]',
      badge: 'Historiography',
    },
    {
      id: 'documents' as SectionId,
      title: 'Archival Documents',
      subtitle: 'Original Texts',
      song: 'The Reynolds Pamphlet / Burn',
      description: 'Read primary sources: Federalist No. 1, the scandalous 1797 Reynolds Pamphlet, Washington\'s Farewell Address, and Alexander\'s last letter to Eliza.',
      icon: FileText,
      gradient: 'from-[#232018] to-[#0c1220]',
      badge: 'Primary Sources',
    },
    {
      id: 'map' as SectionId,
      title: 'Revolutionary Geography',
      subtitle: '7 Epic Locations',
      song: 'Yorktown (Surrender)',
      description: 'From St. Croix sugar plantations to Wall Street, the redoubts of Yorktown, and the high cliffs of Weehawken along the Hudson.',
      icon: Compass,
      gradient: 'from-[#172528] to-[#0d1424]',
      badge: 'Interactive Map',
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between py-12 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Editorial Welcome Header */}
      <div className="text-center pt-8 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-cinzel block mb-3">
          ACT II · THE LIVING ARCHIVE
        </span>

        <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-tight text-[#f3ebdb] text-gold-glow">
          WELCOME
        </h1>

        <p className="font-cormorant italic text-xl sm:text-2xl text-stone-300 mt-4 leading-relaxed font-light">
          "Every revolution begins with a story."
        </p>

        <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-xl mx-auto font-light leading-relaxed">
          Explore the people, music, and history behind the landmark Broadway musical that redefined American historical storytelling.
        </p>

        {/* Scroll Action cue */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('timeline')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#070b16] text-xs font-cinzel font-semibold tracking-widest uppercase transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            Start Exploring
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Netflix-Style 6 Archive Gateway Cards */}
      <div className="my-10">
        <div className="flex items-center justify-between mb-4 border-b border-[#233052] pb-2">
          <h2 className="text-xs font-cinzel tracking-[0.25em] uppercase text-[#d4af37]">
            FEATURED CURATORIAL GALLERIES
          </h2>
          <span className="text-xs text-stone-400">Click any card to enter</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group relative rounded-xl p-6 bg-gradient-to-br ${card.gradient} border border-[#263558] hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Card top row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-cinzel tracking-wider uppercase text-[#d4af37] flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                      {card.badge}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono tracking-tight">
                      {card.subtitle}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#f7eecf] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-stone-400 mt-2.5 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#233052]/60 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px] italic">
                    Theme: <span className="text-[#e2c77d]">{card.song}</span>
                  </span>
                  <span className="text-[#d4af37] font-cinzel text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer prompt */}
      <div className="text-center text-xs text-stone-500 font-cinzel tracking-widest pt-4">
        HAMILTON DIGITAL ARCHIVE · NEW YORK HISTORICAL ANTHOLOGY
      </div>
    </div>
  );
};
