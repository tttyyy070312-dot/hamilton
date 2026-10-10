export type SectionId = 
  | 'home'
  | 'timeline'
  | 'characters'
  | 'songs'
  | 'history'
  | 'documents'
  | 'map'
  | 'playbill';

export interface TimelineEvent {
  year: number | string;
  title: string;
  subtitle: string;
  songTrack: string;
  songTitle: string;
  location: string;
  historicalContext: string;
  musicalInterpretation: string;
  lyricSnippet: string;
  primaryFigure: string;
  quote: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  originalActor: string;
  faction: 'Federalist' | 'Democratic-Republican' | 'Crown' | 'Schuyler' | 'Patriot';
  keySongs: string[];
  historicalBio: string;
  musicalPersona: string;
  famousQuote: string;
  portraitDesc: string;
}

export interface SongItem {
  id: string;
  act: 1 | 2;
  number: number;
  title: string;
  performers: string[];
  genre: string;
  keyTheme: string;
  bpm: number;
  lyricsExcerpt: string;
  historicalSignificance: string;
  thematicAnalysis: string;
}

export interface HistoryTopic {
  id: string;
  title: string;
  musicalVersion: string;
  realHistory: string;
  theDifference: string;
  verdict: 'Dramatic License' | 'Historically Accurate' | 'Compressed Timeline' | 'Creative Myth';
  sourceCitation: string;
}

export interface DocumentArchive {
  id: string;
  title: string;
  year: number;
  author: string;
  type: string;
  originalExcerpt: string;
  significance: string;
  hamiltonConnection: string;
}

export interface MapLocation {
  id: string;
  name: string;
  region: string;
  yearActive: string;
  description: string;
  associatedSong: string;
  historicalEvent: string;
}
