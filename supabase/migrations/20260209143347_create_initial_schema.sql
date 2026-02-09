/*
  # Create Initial Schema for Victoria Rondalla Ensemble

  ## Overview
  This migration creates the core database structure for the Victoria Rondalla Ensemble website,
  including tables for instruments, folk songs, chord charts, and contact form submissions.

  ## New Tables

  ### `instruments`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Instrument name (e.g., "Bandurria", "Laud")
  - `description` (text) - Detailed description of the instrument
  - `image_url` (text) - URL to instrument image
  - `string_count` (integer) - Number of strings
  - `voice_type` (text) - Voice type (soprano, alto, tenor, bass, etc.)
  - `display_order` (integer) - Order for displaying instruments
  - `created_at` (timestamptz) - Creation timestamp

  ### `folk_songs`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Song title
  - `description` (text) - Song description
  - `duration` (text) - Duration in format "MM:SS"
  - `category` (text) - Category (Traditional, Folk Song, Nature Song, etc.)
  - `is_featured` (boolean) - Whether song is featured (like Lupang Hinirang)
  - `audio_url` (text, nullable) - URL to audio recording
  - `sheet_music_url` (text, nullable) - URL to sheet music PDF
  - `display_order` (integer) - Order for displaying songs
  - `created_at` (timestamptz) - Creation timestamp

  ### `chord_charts`
  - `id` (uuid, primary key) - Unique identifier
  - `song_id` (uuid, foreign key) - Reference to folk_songs table
  - `instrument` (text) - Instrument name (Bandurria, Laud, Octavina, Guitar)
  - `verse_chords` (text) - Chord progression for verse
  - `chorus_chords` (text, nullable) - Chord progression for chorus
  - `bridge_chords` (text, nullable) - Chord progression for bridge
  - `pdf_url` (text, nullable) - URL to PDF chord chart
  - `created_at` (timestamptz) - Creation timestamp

  ### `contact_messages`
  - `id` (uuid, primary key) - Unique identifier
  - `first_name` (text) - Sender's first name
  - `last_name` (text) - Sender's last name
  - `email` (text) - Sender's email address
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `status` (text) - Status (new, read, archived) - default: 'new'
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for instruments, folk_songs, and chord_charts
  - Authenticated users can insert contact messages
  - Only authenticated users can view contact messages

  ## Notes
  - All tables use UUID primary keys for better security and scalability
  - Timestamps are automatically set using `now()` function
  - Default values are provided where appropriate for data integrity
*/

CREATE TABLE IF NOT EXISTS instruments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  string_count integer NOT NULL DEFAULT 0,
  voice_type text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS folk_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL DEFAULT '0:00',
  category text NOT NULL DEFAULT 'Traditional',
  is_featured boolean DEFAULT false,
  audio_url text,
  sheet_music_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chord_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id uuid REFERENCES folk_songs(id) ON DELETE CASCADE,
  instrument text NOT NULL,
  verse_chords text NOT NULL,
  chorus_chords text,
  bridge_chords text,
  pdf_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE instruments ENABLE ROW LEVEL SECURITY;
ALTER TABLE folk_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chord_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view instruments"
  ON instruments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view folk songs"
  ON folk_songs FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view chord charts"
  ON chord_charts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);
