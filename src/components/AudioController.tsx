import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, ChevronDown, ChevronUp, Sparkles, Disc } from 'lucide-react';
import { hamiltonAudio, HAMILTON_TRACKS } from '../services/audioEngine';

interface AudioControllerProps {
  currentSection: string;
}

export const AudioController: React.FC<AudioControllerProps> = ({ currentSection }) => {
  const [audioState, setAudioState] = useState(hamiltonAudio.getState());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = hamiltonAudio.subscribe(() => {
      setAudioState(hamiltonAudio.getState());
    });
    return unsubscribe;
  }, []);

  // Map section to corresponding signature song dynamically
  useEffect(() => {
    switch (currentSection) {
      case 'home':
        hamiltonAudio.transitionToTrack('alexander-hamilton');
        break;
      case 'timeline':
        hamiltonAudio.transitionToTrack('my-shot');
        break;
      case 'characters':
        hamiltonAudio.transitionToTrack('the-schuyler-sisters');
        break;
      case 'songs':
        // Keep current or 'wait-for-it'
        hamiltonAudio.transitionToTrack('wait-for-it');
        break;
      case 'history':
        hamiltonAudio.transitionToTrack('the-room-where-it-happens');
        break;
      case 'documents':
        hamiltonAudio.transitionToTrack('burn');
        break;
      case 'map':
        hamiltonAudio.transitionToTrack('yorktown');
        break;
      case 'playbill':
        hamiltonAudio.transitionToTrack('non-stop');
        break;
      default:
        break;
    }
  }, [currentSection]);

  const handleToggleMute = () => {
    hamiltonAudio.toggleMute();
  };

  const handleTogglePlay = () => {
    hamiltonAudio.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hamiltonAudio.setVolume(parseFloat(e.target.value));
  };

  const handleSelectTrack = (trackId: string) => {
    hamiltonAudio.transitionToTrack(trackId);
    if (audioState.isMuted) {
      hamiltonAudio.setMuted(false);
    } else if (!audioState.isPlaying) {
      hamiltonAudio.play();
    }
  };

  const activeTrack = audioState.track;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Audio Modal/Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-xl bg-[#0c1222]/95 backdrop-blur-md border border-[#d4af37]/40 shadow-2xl p-4 text-[#e8dfcf] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#24304f]">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-[#d4af37] ${audioState.isPlaying && !audioState.isMuted ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#d4af37] font-cinzel">Theatrical Pit Score</span>
                <p className="text-[10px] text-stone-400">Broadway Web Audio Synthesizer</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded transition-colors"
              title="Close panel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Currently Playing Card */}
          <div className="my-3 p-3 rounded-lg bg-[#141d33] border border-[#2b3a61]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium text-[#d4af37] tracking-wider uppercase font-cinzel">{activeTrack.act}</span>
                <h4 className="text-sm font-bold text-white font-cinzel">{activeTrack.title}</h4>
                <p className="text-xs text-stone-300 mt-0.5">{activeTrack.description}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2c4c] text-stone-300 border border-[#3b4c73] font-mono">
                {activeTrack.tempo} BPM
              </span>
            </div>

            {/* Quick Transport Controls */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#233052]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="p-2 rounded-full bg-[#d4af37] text-[#070b16] hover:bg-[#e6c35c] transition-transform active:scale-95 shadow-md flex items-center justify-center"
                  title={audioState.isPlaying ? 'Pause Score' : 'Play Score'}
                >
                  {audioState.isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={handleToggleMute}
                  className={`p-2 rounded-full border transition-colors ${
                    audioState.isMuted
                      ? 'border-red-500/50 text-red-400 bg-red-950/30'
                      : 'border-[#d4af37]/60 text-[#d4af37] bg-[#d4af37]/10'
                  }`}
                  title={audioState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {audioState.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 w-32">
                <Volume2 className="w-3 h-3 text-stone-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-[#233052] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
              </div>
            </div>
          </div>

          {/* Sound FX Buttons */}
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1.5 font-cinzel">Stage Effects</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => hamiltonAudio.playEffect('curtain')}
                className="py-1 px-2 text-xs rounded bg-[#151f38] hover:bg-[#202f54] text-stone-200 border border-[#2b3a61] transition-colors text-center"
              >
                Curtain Call
              </button>
              <button
                onClick={() => hamiltonAudio.playEffect('page')}
                className="py-1 px-2 text-xs rounded bg-[#151f38] hover:bg-[#202f54] text-stone-200 border border-[#2b3a61] transition-colors text-center"
              >
                Playbill Flip
              </button>
              <button
                onClick={() => hamiltonAudio.playEffect('gavel')}
                className="py-1 px-2 text-xs rounded bg-[#151f38] hover:bg-[#202f54] text-stone-200 border border-[#2b3a61] transition-colors text-center"
              >
                Gavel Strike
              </button>
            </div>
          </div>

          {/* Track Selection List */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1.5 font-cinzel">Score Tracklist</span>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {Object.values(HAMILTON_TRACKS).map((t) => {
                const isCurrent = t.id === audioState.currentTrackId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(t.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      isCurrent
                        ? 'bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f6ecc9]'
                        : 'hover:bg-[#1a2540] text-stone-300'
                    }`}
                  >
                    <span className="truncate pr-2 font-medium">{t.title}</span>
                    <span className="text-[10px] text-stone-400 shrink-0 font-mono">{t.keySignature}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom-Right Music Control Pill */}
      <div className="flex items-center gap-2">
        {/* Track Title Indicator Pill */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c1222]/90 border border-[#d4af37]/40 backdrop-blur-md shadow-lg cursor-pointer hover:border-[#d4af37] transition-all"
        >
          {/* Animated Audio Waveform Bars */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span
              className={`w-0.5 bg-[#d4af37] rounded-full ${
                audioState.isPlaying && !audioState.isMuted ? 'animate-bar-1' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-[#d4af37] rounded-full ${
                audioState.isPlaying && !audioState.isMuted ? 'animate-bar-2' : 'h-2'
              }`}
            />
            <span
              className={`w-0.5 bg-[#d4af37] rounded-full ${
                audioState.isPlaying && !audioState.isMuted ? 'animate-bar-3' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-[#d4af37] rounded-full ${
                audioState.isPlaying && !audioState.isMuted ? 'animate-bar-4' : 'h-2'
              }`}
            />
          </div>
          <span className="text-xs font-cinzel text-[#d4af37] tracking-wider truncate max-w-[130px]">
            {activeTrack.title}
          </span>
          {audioState.isMuted && (
            <span className="text-[10px] text-stone-400 font-sans">(Muted)</span>
          )}
        </div>

        {/* Main Floating Button */}
        <div className="relative group">
          <button
            onClick={() => {
              if (audioState.isMuted) {
                // If muted, clicking primary button unmutable starts sound!
                hamiltonAudio.setMuted(false);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border cursor-pointer ${
              audioState.isMuted
                ? 'bg-[#12192d] border-[#44567e] text-stone-400 hover:border-[#d4af37] hover:text-[#d4af37]'
                : 'bg-[#d4af37] border-[#fff2b2] text-[#070b16] box-gold-glow hover:scale-105'
            }`}
            aria-label="Toggle theatrical background music"
            title={audioState.isMuted ? 'Click to play Broadway music' : 'Music Controls'}
          >
            {audioState.isMuted ? (
              <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
            ) : (
              <Music className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
          </button>

          {/* Quick Mute Toggle Indicator Badge */}
          {!audioState.isMuted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                hamiltonAudio.setMuted(true);
              }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1e2a4a] border border-[#d4af37]/60 text-[#d4af37] flex items-center justify-center text-[10px] hover:bg-red-900 hover:text-white transition-colors"
              title="Quick mute"
            >
              <Volume2 className="w-2.5 h-2.5" />
            </button>
          )}

          {/* First-time prompt tooltip if muted */}
          {audioState.isMuted && (
            <div className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0a0f1e]/95 border border-[#d4af37]/40 px-3 py-1.5 rounded-lg text-xs text-[#f3ebdb] shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Click to unmute Broadway score
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
