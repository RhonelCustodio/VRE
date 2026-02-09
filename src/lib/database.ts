import { supabase } from './supabase';
import type { Instrument, FolkSong, ChordChart, ContactMessage } from './types';

export async function getInstruments(): Promise<Instrument[]> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching instruments:', error);
    return [];
  }

  return data || [];
}

export async function getFolkSongs(): Promise<FolkSong[]> {
  const { data, error } = await supabase
    .from('folk_songs')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching folk songs:', error);
    return [];
  }

  return data || [];
}

export async function getChordCharts(): Promise<ChordChart[]> {
  const { data, error } = await supabase
    .from('chord_charts')
    .select('*');

  if (error) {
    console.error('Error fetching chord charts:', error);
    return [];
  }

  return data || [];
}

export async function submitContactMessage(message: ContactMessage): Promise<boolean> {
  const { error } = await supabase
    .from('contact_messages')
    .insert([message]);

  if (error) {
    console.error('Error submitting contact message:', error);
    return false;
  }

  return true;
}
