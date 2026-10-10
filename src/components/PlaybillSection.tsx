import React, { useState } from 'react';
import { PLAYBILL_INFO } from '../data/hamiltonData';
import { BookOpen, Star, Sparkles, Award, Music, Users, Theater } from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';

export const PlaybillSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cast' | 'songs' | 'credits'>('cast');

  const handleTabChange = (tab: 'cast' | 'songs' | 'credits') => {
    setActiveTab(tab);
    hamiltonAudio.playEffect('page');
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Banner */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              AUTHENTIC BROADWAY PROGRAMME BOOKLET
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Broadway Playbill
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-2 sm:mt-0 max-w-md">
            The historic program booklet from the Richard Rodgers Theatre, 226 West 46th Street, New York City.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => handleTabChange('cast')}
            className={`px-4 py-2 rounded-lg text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cast'
                ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                : 'bg-[#10172a] text-stone-300 border border-[#233152] hover:bg-[#16213b]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Cast in Order of Appearance
          </button>
          <button
            onClick={() => handleTabChange('songs')}
            className={`px-4 py-2 rounded-lg text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'songs'
                ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                : 'bg-[#10172a] text-stone-300 border border-[#233152] hover:bg-[#16213b]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            Scenes & Musical Numbers
          </button>
          <button
            onClick={() => handleTabChange('credits')}
            className={`px-4 py-2 rounded-lg text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'credits'
                ? 'bg-[#d4af37] text-[#070b16] shadow-md'
                : 'bg-[#10172a] text-stone-300 border border-[#233152] hover:bg-[#16213b]'
            }`}
          >
            <Theater className="w-3.5 h-3.5" />
            Production Notes & Bio
          </button>
        </div>
      </div>

      {/* Main Playbill Booklet Experience */}
      <div className="max-w-4xl mx-auto w-full bg-[#fdfbf7] text-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden border-4 border-[#282828] my-auto">
        {/* Yellow Iconic Header */}
        <div className="bg-[#fad02c] text-black px-6 py-3 border-b-2 border-black flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-center sm:text-left">
            <h3 className="font-cinzel text-3xl sm:text-4xl font-black tracking-[0.22em] leading-none">
              PLAYBILL
            </h3>
            <span className="text-[11px] font-bold tracking-widest uppercase block mt-1">
              {PLAYBILL_INFO.theatreName}
            </span>
          </div>

          <div className="text-center sm:text-right text-[10px] uppercase font-bold tracking-wider">
            <div>BROADWAY PREMIERE · AUGUST 6, 2015</div>
            <div className="text-stone-700">{PLAYBILL_INFO.theatreAddress}</div>
          </div>
        </div>

        {/* Playbill Inside Content */}
        <div className="p-6 sm:p-10 min-h-[420px] max-h-[520px] overflow-y-auto custom-scrollbar">
          {activeTab === 'cast' && (
            <div>
              <div className="text-center mb-6 border-b border-stone-300 pb-4">
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider uppercase text-black">
                  CAST
                </h4>
                <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                  (in order of appearance on the Richard Rodgers Theatre stage)
                </p>
              </div>

              <div className="divide-y divide-stone-200">
                {PLAYBILL_INFO.castCredits.map((c, i) => (
                  <div key={i} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1">
                    <div>
                      <span className="font-cinzel font-bold text-stone-900 block sm:inline">
                        {c.role}
                      </span>
                      <span className="text-[11px] text-stone-500 font-serif italic block">
                        {c.note}
                      </span>
                    </div>
                    <span className="font-serif font-bold text-[#785b28] sm:text-right shrink-0">
                      {c.originalCast}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'songs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Act I */}
              <div>
                <div className="border-b-2 border-stone-800 pb-2 mb-3">
                  <h5 className="font-cinzel text-base font-bold uppercase text-stone-900">
                    ACT I
                  </h5>
                  <span className="text-[11px] text-stone-500 font-serif italic">
                    The Revolution & The Great Inversion (1772–1781)
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-stone-800 font-serif">
                  {PLAYBILL_INFO.act1Songs.map((s, idx) => (
                    <li key={idx} className="hover:text-[#785b28] transition-colors py-0.5">
                      <span className="font-medium">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Act II */}
              <div>
                <div className="border-b-2 border-stone-800 pb-2 mb-3">
                  <h5 className="font-cinzel text-base font-bold uppercase text-stone-900">
                    ACT II
                  </h5>
                  <span className="text-[11px] text-stone-500 font-serif italic">
                    The Republic, The Cabinet & The Legacy (1789–1804)
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-stone-800 font-serif">
                  {PLAYBILL_INFO.act2Songs.map((s, idx) => (
                    <li key={idx} className="hover:text-[#785b28] transition-colors py-0.5">
                      <span className="font-medium">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-6 text-xs sm:text-sm text-stone-800">
              <div className="border-b border-stone-300 pb-4">
                <span className="text-[10px] tracking-widest uppercase font-cinzel text-[#785b28] block mb-1">
                  CREATOR'S DEDICATION
                </span>
                <h4 className="font-cormorant text-xl font-bold text-stone-900">
                  A Note from Lin-Manuel Miranda
                </h4>
                <p className="font-serif italic text-stone-700 mt-2 leading-relaxed">
                  "I was reading Ron Chernow's biography of Alexander Hamilton on vacation, and within a few chapters, hip-hop music started playing in my head. Hamilton's relentless verbal energy, his struggle against poverty, his writing like he was running out of time—it wasn't dead 18th-century parchment. It was the purest embodiment of hip-hop culture and the American immigrant experiment."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-stone-100 rounded border border-stone-200">
                  <span className="text-[10px] uppercase font-cinzel font-bold text-stone-600 block">
                    Direction
                  </span>
                  <span className="font-bold text-stone-900 text-sm">Thomas Kail</span>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Tony Award Winner for Best Direction of a Musical
                  </p>
                </div>

                <div className="p-3 bg-stone-100 rounded border border-stone-200">
                  <span className="text-[10px] uppercase font-cinzel font-bold text-stone-600 block">
                    Choreography
                  </span>
                  <span className="font-bold text-stone-900 text-sm">Andy Blankenbuehler</span>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Innovative double-revolving turntable choreography
                  </p>
                </div>

                <div className="p-3 bg-stone-100 rounded border border-stone-200">
                  <span className="text-[10px] uppercase font-cinzel font-bold text-stone-600 block">
                    Music Supervision & Orchestrations
                  </span>
                  <span className="font-bold text-stone-900 text-sm">Alex Lacamoire</span>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Multi-genre orchestrations blending classical strings with 808s
                  </p>
                </div>

                <div className="p-3 bg-stone-100 rounded border border-stone-200">
                  <span className="text-[10px] uppercase font-cinzel font-bold text-stone-600 block">
                    Biographical Foundation
                  </span>
                  <span className="font-bold text-stone-900 text-sm">Ron Chernow</span>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Pulitzer Prize-winning biographer and historical consultant
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Playbill Bar */}
        <div className="bg-[#1a1a1a] text-[#fad02c] px-6 py-2.5 flex items-center justify-between text-xs font-cinzel tracking-wider">
          <span>THE RICHARD RODGERS THEATRE ARCHIVE</span>
          <span>11 TONY AWARDS · PULITZER PRIZE FOR DRAMA</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        BROADWAY PLAYBILL PROGRAMME · ARCHIVED UNDER LICENSED PERMISSION
      </div>
    </div>
  );
};
