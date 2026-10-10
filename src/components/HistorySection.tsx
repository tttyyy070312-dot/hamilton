import React, { useState } from 'react';
import { HISTORY_TOPICS } from '../data/hamiltonData';
import { HistoryTopic } from '../types/hamilton';
import { BookOpen, CheckCircle, AlertCircle, FileSearch, Sparkles, Scale } from 'lucide-react';

export const HistorySection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<HistoryTopic>(HISTORY_TOPICS[0]);

  const getVerdictBadge = (verdict: HistoryTopic['verdict']) => {
    switch (verdict) {
      case 'Historically Accurate':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
      case 'Dramatic License':
        return 'text-amber-300 bg-amber-950/40 border-amber-800';
      case 'Compressed Timeline':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800';
      default:
        return 'text-purple-400 bg-purple-950/40 border-purple-800';
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              HISTORIOGRAPHICAL ANALYSIS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Musical vs. Real History
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-2 sm:mt-0 max-w-md">
            Examining artistic license, compressed historical timelines, and astonishing biographical truths.
          </p>
        </div>

        {/* Topic Horizontal Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
          {HISTORY_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg border text-xs font-cinzel tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#d4af37] text-[#070b16] font-bold border-[#d4af37] shadow-md'
                    : 'bg-[#0f172a] text-stone-300 border-[#233152] hover:bg-[#16213b]'
                }`}
              >
                {topic.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparative Presentation */}
      <div className="bg-gradient-to-b from-[#11192e] to-[#090e1b] border border-[#2b3a61] rounded-2xl p-6 sm:p-8 my-auto shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#243354] pb-4 mb-6 gap-3">
          <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-white">
            {selectedTopic.title}
          </h3>
          <span className={`px-3 py-1 rounded-full border text-xs font-cinzel font-semibold tracking-wider ${getVerdictBadge(selectedTopic.verdict)}`}>
            {selectedTopic.verdict}
          </span>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* Broadway Musical Depiction */}
          <div className="p-5 rounded-xl bg-[#090e1b] border border-[#233152] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-bold mb-3">
                <Sparkles className="w-4 h-4" />
                Broadway Musical Staging
              </div>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {selectedTopic.musicalVersion}
              </p>
            </div>
            <span className="text-[10px] text-stone-500 font-serif italic mt-4 block">
              Staged for dramatic tension & thematic clarity
            </span>
          </div>

          {/* Historical Reality */}
          <div className="p-5 rounded-xl bg-[#090e1b] border border-[#233152] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-bold mb-3">
                <BookOpen className="w-4 h-4" />
                Primary Historical Record
              </div>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {selectedTopic.realHistory}
              </p>
            </div>
            <span className="text-[10px] text-stone-500 font-serif italic mt-4 block">
              Grounded in 18th-century letters and legal archives
            </span>
          </div>
        </div>

        {/* The Curatorial Analysis */}
        <div className="mt-4 p-5 rounded-xl bg-[#141d33] border border-[#2c3d66]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-bold mb-2">
            <Scale className="w-4 h-4" />
            Curatorial Synthesis: Why the Difference Matters
          </div>
          <p className="text-sm text-stone-200 leading-relaxed font-light">
            {selectedTopic.theDifference}
          </p>
          <div className="mt-3 pt-2 border-t border-[#243354] flex items-center gap-2 text-xs text-stone-400 font-serif italic">
            <FileSearch className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Citation: {selectedTopic.sourceCitation}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        HISTORICAL INQUIRY · ARCHIVAL TRUTH & THEATRICAL ARTISTRY
      </div>
    </div>
  );
};
