/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingStage } from './components/LandingStage';
import { MainStage } from './components/MainStage';
import { AudioController } from './components/AudioController';
import { SectionId } from './types/hamilton';
import { hamiltonAudio } from './services/audioEngine';

export default function App() {
  // Two-tier stage state: 'landing' (Opening number) or 'main' (Archive Stage)
  const [stage, setStage] = useState<'landing' | 'main'>('landing');
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  // On initial mount, start the procedural audio loop with 'alexander-hamilton' muted by default
  useEffect(() => {
    hamiltonAudio.transitionToTrack('alexander-hamilton');
    hamiltonAudio.play();
  }, []);

  const handleEnterArchive = () => {
    setStage('main');
    setActiveSection('home');
  };

  const handleReturnToLanding = () => {
    setStage('landing');
    hamiltonAudio.transitionToTrack('alexander-hamilton');
  };

  const handleSectionChange = (section: SectionId) => {
    setActiveSection(section);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050811] text-[#e8dfcf] overflow-hidden">
      {/* Stage 1: Landing Page (The Opening Number) */}
      {stage === 'landing' ? (
        <LandingStage onEnter={handleEnterArchive} />
      ) : (
        /* Stage 2: Main Archive Stage (The True Homepage) */
        <MainStage
          onReturnToLanding={handleReturnToLanding}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      )}

      {/* Persistent Theatrical Music Control Icon (Bottom Right Corner) */}
      <AudioController currentSection={stage === 'landing' ? 'home' : activeSection} />
    </div>
  );
}
