import React, { useState } from 'react';
import { SectionId } from '../types/hamilton';
import { PrologueSection } from './PrologueSection';
import { TimelineSection } from './TimelineSection';
import { CharactersSection } from './CharactersSection';
import { SongsSection } from './SongsSection';
import { HistorySection } from './HistorySection';
import { DocumentsSection } from './DocumentsSection';
import { MapSection } from './MapSection';
import { PlaybillSection } from './PlaybillSection';
import {
  Home,
  Clock,
  Users,
  Music2,
  BookMarked,
  FileText,
  Compass,
  Theater,
  Menu,
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { hamiltonAudio } from '../services/audioEngine';

interface MainStageProps {
  onReturnToLanding: () => void;
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

export const MainStage: React.FC<MainStageProps> = ({
  onReturnToLanding,
  activeSection,
  onSectionChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: Array<{ id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'timeline', label: 'TIMELINE', icon: Clock },
    { id: 'characters', label: 'CHARACTERS', icon: Users },
    { id: 'songs', label: 'SONGS', icon: Music2 },
    { id: 'history', label: 'HISTORY', icon: BookMarked },
    { id: 'documents', label: 'ARCHIVES', icon: FileText },
    { id: 'map', label: 'MAP', icon: Compass },
    { id: 'playbill', label: 'PLAYBILL', icon: Theater },
  ];

  const handleNavClick = (sectionId: SectionId) => {
    onSectionChange(sectionId);
    setSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070b16] text-[#e8dfcf] flex overflow-x-hidden">
      {/* Mobile Sidebar Toggle Button */}
      <div className="fixed top-4 left-4 z-40 lg:hidden flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-lg bg-[#0d1424]/90 border border-[#2b3a61] text-[#d4af37] shadow-xl backdrop-blur-md cursor-pointer"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar Navigation (Appears only on Main Stage!) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#080d1a]/95 border-r border-[#1f2b45] backdrop-blur-md flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Top Stage Brand Lockup */}
          <div className="p-6 border-b border-[#1b253d]">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-2xl font-serif text-gold-glow">★</span>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.18em] text-[#f4e8c1] block">
                  HAMILTON
                </span>
                <span className="text-[10px] tracking-widest text-[#d4af37]/80 font-cinzel block">
                  THE LIVING ARCHIVE
                </span>
              </div>
            </div>

            {/* Back to Broadway Opening / Landing Page Button */}
            <button
              onClick={onReturnToLanding}
              className="mt-4 w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs font-cinzel text-stone-400 hover:text-[#d4af37] hover:bg-[#12192e] border border-transparent hover:border-[#2b3a61] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Broadway Opening
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37] text-[#070b16] font-bold shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-[#121a2f]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#070b16]' : 'text-[#d4af37]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Theatre Badge */}
        <div className="p-4 border-t border-[#1b253d] text-[10px] text-stone-500 font-cinzel text-center">
          <div>RICHARD RODGERS THEATRE</div>
          <div className="text-stone-600 mt-0.5">NEW YORK CITY</div>
        </div>
      </aside>

      {/* Main Content Area (Offset by sidebar width on lg screens) */}
      <main className="flex-1 lg:ml-64 w-full min-h-screen relative overflow-y-auto">
        {/* Render the Active Full-Screen Section */}
        {activeSection === 'home' && <PrologueSection onNavigate={onSectionChange} />}
        {activeSection === 'timeline' && <TimelineSection />}
        {activeSection === 'characters' && <CharactersSection />}
        {activeSection === 'songs' && <SongsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'documents' && <DocumentsSection />}
        {activeSection === 'map' && <MapSection />}
        {activeSection === 'playbill' && <PlaybillSection />}
      </main>
    </div>
  );
};
