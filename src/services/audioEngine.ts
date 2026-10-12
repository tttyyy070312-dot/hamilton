/**
 * Hamilton Web Audio Theatrical Synthesizer Engine
 * Generates signature musical motifs from the Broadway musical Hamilton
 * using multi-oscillator polyphony, harmonic overtones, and rhythmic sequencing.
 */

export interface TrackDefinition {
  id: string;
  title: string;
  act: string;
  keySignature: string;
  tempo: number; // BPM
  description: string;
  motifPattern: {
    // Array of notes (frequency in Hz or note name) and durations (in seconds)
    melody: Array<{ note: number; duration: number; type?: OscillatorType }>;
    bass: Array<{ note: number; duration: number }>;
    chords: Array<{ notes: number[]; duration: number }>;
  };
}

// Standard musical note frequencies in Hz
const NOTES = {
  // Octave 2
  C2: 65.41, Db2: 69.30, D2: 73.42, Eb2: 77.78, E2: 82.41, F2: 87.31, Gb2: 92.50, G2: 98.00, Ab2: 103.83, A2: 110.00, Bb2: 116.54, B2: 123.47,
  // Octave 3
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  // Octave 4
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  // Octave 5
  C5: 523.25, Db5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Gb5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  REST: 0,
};

export const HAMILTON_TRACKS: Record<string, TrackDefinition> = {
  'alexander-hamilton': {
    id: 'alexander-hamilton',
    title: 'Alexander Hamilton',
    act: 'Act I, Scene 1',
    keySignature: 'Eb Minor',
    tempo: 78,
    description: 'Iconic Broadway opening cadence with staccato minor chords and rising string tension.',
    motifPattern: {
      melody: [
        { note: NOTES.Eb4, duration: 0.35 },
        { note: NOTES.Eb4, duration: 0.35 },
        { note: NOTES.Gb4, duration: 0.35 },
        { note: NOTES.Ab4, duration: 0.35 },
        { note: NOTES.Bb4, duration: 0.70 },
        { note: NOTES.Ab4, duration: 0.35 },
        { note: NOTES.Gb4, duration: 0.35 },
        { note: NOTES.Eb4, duration: 0.70 },
        { note: NOTES.Db4, duration: 0.35 },
        { note: NOTES.Eb4, duration: 0.70 },
      ],
      bass: [
        { note: NOTES.Eb2, duration: 1.4 },
        { note: NOTES.B2, duration: 1.4 },
        { note: NOTES.Gb2, duration: 1.4 },
        { note: NOTES.Db2, duration: 1.4 },
      ],
      chords: [
        { notes: [NOTES.Eb3, NOTES.Gb3, NOTES.Bb3], duration: 1.4 },
        { notes: [NOTES.B2, NOTES.Eb3, NOTES.Gb3], duration: 1.4 },
        { notes: [NOTES.Gb3, NOTES.Bb3, NOTES.Db4], duration: 1.4 },
        { notes: [NOTES.Db3, NOTES.F3, NOTES.Ab3], duration: 1.4 },
      ],
    },
  },
  'my-shot': {
    id: 'my-shot',
    title: 'My Shot',
    act: 'Act I, Scene 3',
    keySignature: 'G Minor / A Minor',
    tempo: 92,
    description: 'Energetic revolutionary march with punchy boom-bap rhythm and syncopated brass stabs.',
    motifPattern: {
      melody: [
        { note: NOTES.A4, duration: 0.25 },
        { note: NOTES.A4, duration: 0.25 },
        { note: NOTES.C5, duration: 0.25 },
        { note: NOTES.D5, duration: 0.50 },
        { note: NOTES.C5, duration: 0.25 },
        { note: NOTES.A4, duration: 0.50 },
        { note: NOTES.G4, duration: 0.25 },
        { note: NOTES.A4, duration: 0.75 },
      ],
      bass: [
        { note: NOTES.A2, duration: 0.75 },
        { note: NOTES.G2, duration: 0.75 },
        { note: NOTES.F2, duration: 0.75 },
        { note: NOTES.E2, duration: 0.75 },
      ],
      chords: [
        { notes: [NOTES.A3, NOTES.C4, NOTES.E4], duration: 0.75 },
        { notes: [NOTES.G3, NOTES.B3, NOTES.D4], duration: 0.75 },
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 0.75 },
        { notes: [NOTES.E3, NOTES.Ab3, NOTES.B3], duration: 0.75 },
      ],
    },
  },
  'the-schuyler-sisters': {
    id: 'the-schuyler-sisters',
    title: 'The Schuyler Sisters',
    act: 'Act I, Scene 5',
    keySignature: 'Bb Major',
    tempo: 98,
    description: 'Upbeat 90s R&B girl group swing with bright electric piano and lively walking bass.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.3 },
        { note: NOTES.F4, duration: 0.3 },
        { note: NOTES.Bb4, duration: 0.6 },
        { note: NOTES.A4, duration: 0.3 },
        { note: NOTES.G4, duration: 0.3 },
        { note: NOTES.F4, duration: 0.6 },
        { note: NOTES.G4, duration: 0.3 },
        { note: NOTES.D4, duration: 0.6 },
      ],
      bass: [
        { note: NOTES.Bb2, duration: 0.75 },
        { note: NOTES.F2, duration: 0.75 },
        { note: NOTES.G2, duration: 0.75 },
        { note: NOTES.Eb2, duration: 0.75 },
      ],
      chords: [
        { notes: [NOTES.Bb3, NOTES.D4, NOTES.F4], duration: 0.75 },
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 0.75 },
        { notes: [NOTES.G3, NOTES.Bb3, NOTES.D4], duration: 0.75 },
        { notes: [NOTES.Eb3, NOTES.G3, NOTES.Bb3], duration: 0.75 },
      ],
    },
  },
  'wait-for-it': {
    id: 'wait-for-it',
    title: 'Wait for It',
    act: 'Act I, Scene 13',
    keySignature: 'Db Major / Bb Minor',
    tempo: 96,
    description: 'Aaron Burr\'s introspective, clock-like marimba arpeggio and emotional swelling minor chorus.',
    motifPattern: {
      melody: [
        { note: NOTES.F4, duration: 0.4 },
        { note: NOTES.Ab4, duration: 0.4 },
        { note: NOTES.Bb4, duration: 0.8 },
        { note: NOTES.Ab4, duration: 0.4 },
        { note: NOTES.F4, duration: 0.4 },
        { note: NOTES.Eb4, duration: 0.8 },
        { note: NOTES.Db4, duration: 0.4 },
        { note: NOTES.F4, duration: 0.8 },
      ],
      bass: [
        { note: NOTES.Bb2, duration: 1.0 },
        { note: NOTES.Gb2, duration: 1.0 },
        { note: NOTES.Db2, duration: 1.0 },
        { note: NOTES.Ab2, duration: 1.0 },
      ],
      chords: [
        { notes: [NOTES.Bb3, NOTES.Db4, NOTES.F4], duration: 1.0 },
        { notes: [NOTES.Gb3, NOTES.Bb3, NOTES.Db4], duration: 1.0 },
        { notes: [NOTES.Db3, NOTES.F3, NOTES.Ab3], duration: 1.0 },
        { notes: [NOTES.Ab3, NOTES.C4, NOTES.Eb4], duration: 1.0 },
      ],
    },
  },
  'yorktown': {
    id: 'yorktown',
    title: 'Yorktown (The World Turned Upside Down)',
    act: 'Act I, Scene 20',
    keySignature: 'D Minor',
    tempo: 95,
    description: 'Martial rhythm, fife and drum salute, and triumphant French-American battle cadence.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.25 },
        { note: NOTES.F4, duration: 0.25 },
        { note: NOTES.A4, duration: 0.50 },
        { note: NOTES.A4, duration: 0.25 },
        { note: NOTES.G4, duration: 0.25 },
        { note: NOTES.F4, duration: 0.50 },
        { note: NOTES.E4, duration: 0.25 },
        { note: NOTES.D4, duration: 0.75 },
      ],
      bass: [
        { note: NOTES.D2, duration: 0.75 },
        { note: NOTES.C2, duration: 0.75 },
        { note: NOTES.Bb2, duration: 0.75 },
        { note: NOTES.A2, duration: 0.75 },
      ],
      chords: [
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 0.75 },
        { notes: [NOTES.C3, NOTES.E3, NOTES.G3], duration: 0.75 },
        { notes: [NOTES.Bb2, NOTES.D3, NOTES.F3], duration: 0.75 },
        { notes: [NOTES.A2, NOTES.C3, NOTES.E3], duration: 0.75 },
      ],
    },
  },
  'non-stop': {
    id: 'non-stop',
    title: 'Non-Stop',
    act: 'Act I Finale',
    keySignature: 'G Minor / D Minor',
    tempo: 100,
    description: 'Relentless string ostinato, fast ticking clockwork, and polyphonic Act I climax.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.2 },
        { note: NOTES.E4, duration: 0.2 },
        { note: NOTES.F4, duration: 0.2 },
        { note: NOTES.G4, duration: 0.2 },
        { note: NOTES.A4, duration: 0.4 },
        { note: NOTES.F4, duration: 0.2 },
        { note: NOTES.D4, duration: 0.4 },
        { note: NOTES.A3, duration: 0.4 },
      ],
      bass: [
        { note: NOTES.D2, duration: 0.6 },
        { note: NOTES.Bb2, duration: 0.6 },
        { note: NOTES.G2, duration: 0.6 },
        { note: NOTES.A2, duration: 0.6 },
      ],
      chords: [
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 0.6 },
        { notes: [NOTES.Bb2, NOTES.D3, NOTES.F3], duration: 0.6 },
        { notes: [NOTES.G2, NOTES.Bb2, NOTES.D3], duration: 0.6 },
        { notes: [NOTES.A2, NOTES.C3, NOTES.E3], duration: 0.6 },
      ],
    },
  },
  'the-room-where-it-happens': {
    id: 'the-room-where-it-happens',
    title: 'The Room Where It Happens',
    act: 'Act II, Scene 5',
    keySignature: 'E Minor',
    tempo: 104,
    description: 'Showstopper swing jazz with syncopated banjo/clarinet staccato and walking bass.',
    motifPattern: {
      melody: [
        { note: NOTES.E4, duration: 0.25 },
        { note: NOTES.G4, duration: 0.25 },
        { note: NOTES.B4, duration: 0.50 },
        { note: NOTES.A4, duration: 0.25 },
        { note: NOTES.G4, duration: 0.25 },
        { note: NOTES.E4, duration: 0.50 },
        { note: NOTES.D4, duration: 0.25 },
        { note: NOTES.E4, duration: 0.75 },
      ],
      bass: [
        { note: NOTES.E2, duration: 0.75 },
        { note: NOTES.G2, duration: 0.75 },
        { note: NOTES.A2, duration: 0.75 },
        { note: NOTES.B2, duration: 0.75 },
      ],
      chords: [
        { notes: [NOTES.E3, NOTES.G3, NOTES.B3], duration: 0.75 },
        { notes: [NOTES.G3, NOTES.B3, NOTES.D4], duration: 0.75 },
        { notes: [NOTES.A3, NOTES.C4, NOTES.E4], duration: 0.75 },
        { notes: [NOTES.B3, NOTES.Eb4, NOTES.Gb4], duration: 0.75 },
      ],
    },
  },
  'the-world-was-wide-enough': {
    id: 'the-world-was-wide-enough',
    title: 'The World Was Wide Enough',
    act: 'Act II, Scene 21',
    keySignature: 'C Minor / Bb Major',
    tempo: 74,
    description: 'Solemn ticking heartbeat clock, suspended chords, and lingering dawn reflections of Weehawken.',
    motifPattern: {
      melody: [
        { note: NOTES.G4, duration: 0.5 },
        { note: NOTES.Eb4, duration: 0.5 },
        { note: NOTES.C4, duration: 1.0 },
        { note: NOTES.F4, duration: 0.5 },
        { note: NOTES.D4, duration: 0.5 },
        { note: NOTES.Bb3, duration: 1.0 },
      ],
      bass: [
        { note: NOTES.C2, duration: 1.5 },
        { note: NOTES.Ab2, duration: 1.5 },
        { note: NOTES.Eb2, duration: 1.5 },
        { note: NOTES.Bb2, duration: 1.5 },
      ],
      chords: [
        { notes: [NOTES.C3, NOTES.Eb3, NOTES.G3], duration: 1.5 },
        { notes: [NOTES.Ab2, NOTES.C3, NOTES.Eb3], duration: 1.5 },
        { notes: [NOTES.Eb3, NOTES.G3, NOTES.Bb3], duration: 1.5 },
        { notes: [NOTES.Bb2, NOTES.D3, NOTES.F3], duration: 1.5 },
      ],
    },
  },
  'burn': {
    id: 'burn',
    title: 'Burn',
    act: 'Act II, Scene 15',
    keySignature: 'G Minor',
    tempo: 68,
    description: 'Intimate, fragile solo grand piano ballad evoking Eliza\'s letters burning to ash.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.6 },
        { note: NOTES.Bb4, duration: 0.6 },
        { note: NOTES.A4, duration: 0.6 },
        { note: NOTES.G4, duration: 1.2 },
        { note: NOTES.F4, duration: 0.6 },
        { note: NOTES.Eb4, duration: 0.6 },
        { note: NOTES.D4, duration: 1.2 },
      ],
      bass: [
        { note: NOTES.G2, duration: 1.8 },
        { note: NOTES.Eb2, duration: 1.8 },
        { note: NOTES.F2, duration: 1.8 },
        { note: NOTES.D2, duration: 1.8 },
      ],
      chords: [
        { notes: [NOTES.G3, NOTES.Bb3, NOTES.D4], duration: 1.8 },
        { notes: [NOTES.Eb3, NOTES.G3, NOTES.Bb3], duration: 1.8 },
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 1.8 },
        { notes: [NOTES.D3, NOTES.Gb3, NOTES.A3], duration: 1.8 },
      ],
    },
  },
  'youll-be-back': {
    id: 'youll-be-back',
    title: 'You\'ll Be Back',
    act: 'Act I, Scene 7',
    keySignature: 'F Major',
    tempo: 82,
    description: 'Cheerfully deranged 60s British invasion pop with harpsichord and walking baseline.',
    motifPattern: {
      melody: [
        { note: NOTES.C4, duration: 0.35 },
        { note: NOTES.F4, duration: 0.35 },
        { note: NOTES.A4, duration: 0.70 },
        { note: NOTES.G4, duration: 0.35 },
        { note: NOTES.F4, duration: 0.35 },
        { note: NOTES.E4, duration: 0.70 },
        { note: NOTES.G4, duration: 0.35 },
        { note: NOTES.F4, duration: 0.70 },
      ],
      bass: [
        { note: NOTES.F2, duration: 1.0 },
        { note: NOTES.C2, duration: 1.0 },
        { note: NOTES.D2, duration: 1.0 },
        { note: NOTES.Bb2, duration: 1.0 },
      ],
      chords: [
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 1.0 },
        { notes: [NOTES.C3, NOTES.E3, NOTES.G3], duration: 1.0 },
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 1.0 },
        { notes: [NOTES.Bb2, NOTES.D3, NOTES.F3], duration: 1.0 },
      ],
    },
  },
  'guns-and-ships': {
    id: 'guns-and-ships',
    title: 'Guns and Ships',
    act: 'Act I, Scene 18',
    keySignature: 'D Minor',
    tempo: 104,
    description: 'Fast, relentless cadence with sharp brass stabs and driving battle tempo.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.15 },
        { note: NOTES.D4, duration: 0.15 },
        { note: NOTES.F4, duration: 0.15 },
        { note: NOTES.A4, duration: 0.30 },
        { note: NOTES.G4, duration: 0.15 },
        { note: NOTES.F4, duration: 0.15 },
        { note: NOTES.D4, duration: 0.30 },
      ],
      bass: [
        { note: NOTES.D2, duration: 0.5 },
        { note: NOTES.F2, duration: 0.5 },
        { note: NOTES.G2, duration: 0.5 },
        { note: NOTES.A2, duration: 0.5 },
      ],
      chords: [
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 0.5 },
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 0.5 },
        { notes: [NOTES.G3, NOTES.Bb3, NOTES.D4], duration: 0.5 },
        { notes: [NOTES.A3, NOTES.C4, NOTES.E4], duration: 0.5 },
      ],
    },
  },
  'dear-theodosia': {
    id: 'dear-theodosia',
    title: 'Dear Theodosia',
    act: 'Act I, Scene 22',
    keySignature: 'A Major',
    tempo: 74,
    description: 'Gentle, tender lullaby with acoustic piano chords and warm counterpoint.',
    motifPattern: {
      melody: [
        { note: NOTES.E4, duration: 0.5 },
        { note: NOTES.A4, duration: 0.5 },
        { note: NOTES.B4, duration: 0.5 },
        { note: NOTES.C5, duration: 1.0 },
        { note: NOTES.B4, duration: 0.5 },
        { note: NOTES.A4, duration: 1.0 },
      ],
      bass: [
        { note: NOTES.A2, duration: 1.5 },
        { note: NOTES.E2, duration: 1.5 },
        { note: NOTES.F2, duration: 1.5 },
        { note: NOTES.D2, duration: 1.5 },
      ],
      chords: [
        { notes: [NOTES.A3, NOTES.C4, NOTES.E4], duration: 1.5 },
        { notes: [NOTES.E3, NOTES.Ab3, NOTES.B3], duration: 1.5 },
        { notes: [NOTES.F3, NOTES.A3, NOTES.C4], duration: 1.5 },
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 1.5 },
      ],
    },
  },
  'one-last-time': {
    id: 'one-last-time',
    title: 'One Last Time',
    act: 'Act II, Scene 9',
    keySignature: 'Ab Major',
    tempo: 72,
    description: 'Majestic, soaring gospel organ and grand paternal hymn.',
    motifPattern: {
      melody: [
        { note: NOTES.Ab4, duration: 0.5 },
        { note: NOTES.C5, duration: 0.5 },
        { note: NOTES.Eb5, duration: 1.0 },
        { note: NOTES.Db5, duration: 0.5 },
        { note: NOTES.C5, duration: 0.5 },
        { note: NOTES.Bb4, duration: 1.0 },
      ],
      bass: [
        { note: NOTES.Ab2, duration: 1.5 },
        { note: NOTES.F2, duration: 1.5 },
        { note: NOTES.Db2, duration: 1.5 },
        { note: NOTES.Eb2, duration: 1.5 },
      ],
      chords: [
        { notes: [NOTES.Ab3, NOTES.C4, NOTES.Eb4], duration: 1.5 },
        { notes: [NOTES.F3, NOTES.Ab3, NOTES.C4], duration: 1.5 },
        { notes: [NOTES.Db3, NOTES.F3, NOTES.Ab3], duration: 1.5 },
        { notes: [NOTES.Eb3, NOTES.G3, NOTES.Bb3], duration: 1.5 },
      ],
    },
  },
  'its-quiet-uptown': {
    id: 'its-quiet-uptown',
    title: 'It\'s Quiet Uptown',
    act: 'Act II, Scene 18',
    keySignature: 'E Minor',
    tempo: 72,
    description: 'Somber acoustic piano and string cello mourning ballad.',
    motifPattern: {
      melody: [
        { note: NOTES.E4, duration: 0.6 },
        { note: NOTES.G4, duration: 0.6 },
        { note: NOTES.B4, duration: 1.2 },
        { note: NOTES.A4, duration: 0.6 },
        { note: NOTES.G4, duration: 0.6 },
        { note: NOTES.F4, duration: 1.2 },
      ],
      bass: [
        { note: NOTES.E2, duration: 1.8 },
        { note: NOTES.C2, duration: 1.8 },
        { note: NOTES.G2, duration: 1.8 },
        { note: NOTES.D2, duration: 1.8 },
      ],
      chords: [
        { notes: [NOTES.E3, NOTES.G3, NOTES.B3], duration: 1.8 },
        { notes: [NOTES.C3, NOTES.E3, NOTES.G3], duration: 1.8 },
        { notes: [NOTES.G3, NOTES.B3, NOTES.D4], duration: 1.8 },
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 1.8 },
      ],
    },
  },
  'who-lives-who-dies-who-tells-your-story': {
    id: 'who-lives-who-dies-who-tells-your-story',
    title: 'Who Lives, Who Dies, Who Tells Your Story',
    act: 'Act II Finale',
    keySignature: 'F# Minor / D Major',
    tempo: 72,
    description: 'Tender orchestral epilogue celebrating Eliza\'s 50-year legacy.',
    motifPattern: {
      melody: [
        { note: NOTES.D4, duration: 0.4 },
        { note: NOTES.F4, duration: 0.4 },
        { note: NOTES.A4, duration: 0.8 },
        { note: NOTES.G4, duration: 0.4 },
        { note: NOTES.F4, duration: 0.4 },
        { note: NOTES.E4, duration: 0.8 },
        { note: NOTES.D4, duration: 1.2 },
      ],
      bass: [
        { note: NOTES.D2, duration: 1.4 },
        { note: NOTES.A2, duration: 1.4 },
        { note: NOTES.B2, duration: 1.4 },
        { note: NOTES.G2, duration: 1.4 },
      ],
      chords: [
        { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 1.4 },
        { notes: [NOTES.A2, NOTES.C3, NOTES.E3], duration: 1.4 },
        { notes: [NOTES.B2, NOTES.D3, NOTES.F3], duration: 1.4 },
        { notes: [NOTES.G2, NOTES.B2, NOTES.D3], duration: 1.4 },
      ],
    },
  },
};

class HamiltonAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true; // Initially muted as per requirement
  private isPlaying: boolean = false;
  private volume: number = 0.65;
  private currentTrackId: string = 'alexander-hamilton';
  private intervalId: number | null = null;
  private noteIndex: number = 0;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended' && !this.isMuted) {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
    }
  }

  public resolveTrack(trackId: string): TrackDefinition {
    if (HAMILTON_TRACKS[trackId]) {
      return HAMILTON_TRACKS[trackId];
    }
    // Generate a contextual musical theme for any other Hamilton song
    const cleanTitle = trackId
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      id: trackId,
      title: cleanTitle,
      act: 'Original Broadway Cast Recording',
      keySignature: 'D Minor / G Minor',
      tempo: 90,
      description: `Synthesized Broadway pit score for "${cleanTitle}".`,
      motifPattern: {
        melody: [
          { note: NOTES.D4, duration: 0.3 },
          { note: NOTES.F4, duration: 0.3 },
          { note: NOTES.G4, duration: 0.3 },
          { note: NOTES.A4, duration: 0.6 },
          { note: NOTES.G4, duration: 0.3 },
          { note: NOTES.F4, duration: 0.3 },
          { note: NOTES.D4, duration: 0.6 },
        ],
        bass: [
          { note: NOTES.D2, duration: 1.0 },
          { note: NOTES.Bb2, duration: 1.0 },
          { note: NOTES.G2, duration: 1.0 },
          { note: NOTES.A2, duration: 1.0 },
        ],
        chords: [
          { notes: [NOTES.D3, NOTES.F3, NOTES.A3], duration: 1.0 },
          { notes: [NOTES.Bb2, NOTES.D3, NOTES.F3], duration: 1.0 },
          { notes: [NOTES.G2, NOTES.Bb2, NOTES.D3], duration: 1.0 },
          { notes: [NOTES.A2, NOTES.C3, NOTES.E3], duration: 1.0 },
        ],
      },
    };
  }

  private initContext() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended' && !this.isMuted) {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Graceful fallback for non-audio or sandboxed environments
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTrackId: this.currentTrackId,
      track: this.resolveTrack(this.currentTrackId),
    };
  }

  public setMuted(muted: boolean) {
    this.initContext();
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      if (!muted && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const targetGain = muted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    }
    // If unmuting for the first time and not yet playing, start playback!
    if (!muted && !this.isPlaying) {
      this.startLoop();
    }
    this.notify();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public play() {
    this.initContext();
    if (!this.isPlaying) {
      this.startLoop();
    }
  }

  public pause() {
    if (this.isPlaying) {
      this.stopLoop();
    }
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public transitionToTrack(trackId: string) {
    if (this.currentTrackId === trackId) return;

    this.currentTrackId = trackId;
    this.noteIndex = 0;
    this.notify();

    // If already initialized and running, restart with new track immediately
    if (this.isPlaying) {
      this.stopLoop();
      this.startLoop();
    }
  }

  private startLoop() {
    this.initContext();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.notify();

    const track = this.resolveTrack(this.currentTrackId);
    const stepTime = (60 / track.tempo) * 500; // in ms

    // Immediate initial note
    this.playStep();

    this.intervalId = window.setInterval(() => {
      this.playStep();
    }, stepTime);
  }

  private stopLoop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  private playStep() {
    if (!this.ctx || !this.masterGain) return;
    if (this.isMuted || this.ctx.state === 'suspended') {
      this.noteIndex++;
      return;
    }

    const track = this.resolveTrack(this.currentTrackId);
    const pattern = track.motifPattern;
    const now = this.ctx.currentTime;

    // 1. Play Melody note
    const melItem = pattern.melody[this.noteIndex % pattern.melody.length];
    if (melItem && melItem.note > 0) {
      this.synthesizeNote(melItem.note, melItem.duration, melItem.type || 'triangle', 0.28, now);
    }

    // 2. Play Bass note (every 2 steps)
    if (this.noteIndex % 2 === 0) {
      const bassIndex = Math.floor(this.noteIndex / 2) % pattern.bass.length;
      const bassItem = pattern.bass[bassIndex];
      if (bassItem && bassItem.note > 0) {
        this.synthesizeBass(bassItem.note, bassItem.duration, now);
      }
    }

    // 3. Play Chord pad (every 4 steps)
    if (this.noteIndex % 4 === 0) {
      const chordIndex = Math.floor(this.noteIndex / 4) % pattern.chords.length;
      const chordItem = pattern.chords[chordIndex];
      if (chordItem) {
        this.synthesizeChord(chordItem.notes, chordItem.duration, now);
      }
    }

    // 4. Subtle percussive tick (Hamilton metronomic pulse)
    if (this.noteIndex % 2 === 0) {
      this.synthesizePercussion(now);
    }

    this.noteIndex++;
  }

  private synthesizeNote(freq: number, duration: number, type: OscillatorType, gainVal: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private synthesizeBass(freq: number, duration: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    // Low-pass filter for rich warm analog bass
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private synthesizeChord(notes: number[], duration: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Soft ambient organ/strings pad
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), startTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  }

  private synthesizePercussion(startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    // Subtle wooden rimshot / ticking metronome
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, startTime);
    osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.03);

    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.04);
  }

  // Theatrical FX: Quill scratch, page flip, gunshot or gavel
  public playEffect(effect: 'curtain' | 'page' | 'gavel') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    if (effect === 'page') {
      // Noise burst for paper / playbill flip
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(now);
    } else if (effect === 'gavel') {
      // Deep resonant gavel strike (Cabinet battle / Constitutional convention)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (effect === 'curtain') {
      // Majestic low brass swell for curtain rise
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65.41, now); // C2
      osc.frequency.exponentialRampToValueAtTime(130.81, now + 0.8); // C3

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.25);
    }
  }
}

export const hamiltonAudio = new HamiltonAudioSynthesizer();
