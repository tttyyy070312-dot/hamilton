import React, { useState } from 'react';
import { DOCUMENT_ARCHIVES } from '../data/hamiltonData';
import { DocumentArchive } from '../types/hamilton';
import { FileText, Feather, Scroll, Calendar, Award, ExternalLink } from 'lucide-react';
import archiveImg from '../assets/images/founding_fathers_archive_1791621792865.jpg';

export const DocumentsSection: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentArchive>(DOCUMENT_ARCHIVES[0]);

  return (
    <div className="w-full min-h-screen py-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#243354] pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-1">
              PRIMARY ARTIFACTS & CORRESPONDENCE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Historical Documents
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-serif italic mt-2 sm:mt-0 max-w-md">
            Unfiltered primary sources written in Hamilton's own hand that shaped the American Republic and the musical score.
          </p>
        </div>

        {/* Document Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
          {DOCUMENT_ARCHIVES.map((doc) => {
            const isSelected = doc.id === selectedDoc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`px-4 py-2 rounded-lg border text-xs font-cinzel tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#d4af37] text-[#070b16] font-bold border-[#d4af37] shadow-md'
                    : 'bg-[#0f172a] text-stone-300 border-[#233152] hover:bg-[#16213b]'
                }`}
              >
                {doc.title.split(':')[0]} ({doc.year})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Document Reader Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-stretch">
        {/* Left Column: Visual Archival Desk & Metadata (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#11192e] to-[#090e1b] border border-[#2b3a61] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="relative h-56 sm:h-64 overflow-hidden border-b border-[#243354]">
            <img
              src={archiveImg}
              alt="Founding Fathers Manuscript Desk"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1b] via-transparent to-black/30" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#f3ebdb]">
              <span className="font-cinzel tracking-wider text-[11px] bg-black/60 px-2 py-0.5 rounded border border-[#d4af37]/40">
                Library of Congress Archive
              </span>
              <span className="font-mono text-[11px] text-[#d4af37]">{selectedDoc.year}</span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#d4af37] block mb-1">
                {selectedDoc.type}
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white leading-tight">
                {selectedDoc.title}
              </h3>
              <p className="text-xs text-stone-300 mt-2 font-serif italic">
                Author: {selectedDoc.author}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1e2a47] text-xs text-stone-300 leading-relaxed font-light">
                <strong className="text-[#d4af37] font-cinzel text-[11px] block mb-1">
                  Historical Significance
                </strong>
                {selectedDoc.significance}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e2a47] text-xs text-stone-400">
              <span className="text-[#d4af37] font-semibold">Stage Echo: </span>
              {selectedDoc.hamiltonConnection}
            </div>
          </div>
        </div>

        {/* Right Column: Parchment Transcript Reader (7 cols) */}
        <div className="lg:col-span-7 bg-[#f7f2e7] text-[#1c1917] rounded-2xl p-6 sm:p-10 shadow-2xl border-4 border-[#e2d5bd] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle watermark background stamp */}
          <div className="absolute top-4 right-4 text-[#d8c7a6]/25 font-cinzel text-6xl select-none pointer-events-none">
            PUBLIUS
          </div>

          <div>
            {/* Archival Masthead */}
            <div className="border-b-2 border-[#d8c7a6] pb-4 mb-6 text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#785b28] font-cinzel block font-bold">
                HISTORICAL TRANSCRIPT EXCERPT · ANNO {selectedDoc.year}
              </span>
              <h4 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#1c1917] mt-1">
                {selectedDoc.title}
              </h4>
            </div>

            {/* Parchment Body Prose with Drop Cap */}
            <div className="font-cormorant text-base sm:text-lg leading-relaxed text-[#2a241e] italic relative">
              <p className="first-letter:text-5xl first-letter:font-cinzel first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#785b28]">
                {selectedDoc.originalExcerpt}
              </p>
            </div>
          </div>

          {/* Bottom Archival Seal */}
          <div className="mt-8 pt-4 border-t-2 border-[#d8c7a6] flex items-center justify-between text-xs text-[#785b28] font-cinzel">
            <span className="flex items-center gap-1">
              <Feather className="w-3.5 h-3.5" />
              Original Manuscript in Ink
            </span>
            <span>Recorded in Historical Annals</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-[#1e2a47] text-xs text-stone-500 font-cinzel text-center">
        PRIMARY SOURCES · NATIONAL ARCHIVES & RECORDS ADMINISTRATION
      </div>
    </div>
  );
};
