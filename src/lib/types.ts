export interface Instrument {
  id: string;
  name: string;
  description: string;
  image_url: string;
  string_count: number;
  voice_type: string;
  display_order: number;
  created_at: string;
}

export interface FolkSong {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  is_featured: boolean;
  audio_url: string | null;
  sheet_music_url: string | null;
  display_order: number;
  created_at: string;
}

export interface ChordChart {
  id: string;
  song_id: string;
  instrument: string;
  verse_chords: string;
  chorus_chords: string | null;
  bridge_chords: string | null;
  pdf_url: string | null;
  created_at: string;
}

export interface ContactMessage {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChordChartWithSong extends ChordChart {
  folk_songs: FolkSong;
}
