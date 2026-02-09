import type { ChordChart } from '../lib/types';

export function renderChordChartsForSongs(chordCharts: ChordChart[], songs: any[]): string {
  const chartsWithSongs = chordCharts.map(chart => {
    const song = songs.find(s => s.id === chart.song_id);
    return { ...chart, song };
  }).filter(chart => chart.song);

  if (chartsWithSongs.length === 0) {
    return '';
  }

  return chartsWithSongs.map(chart => {
    const verseDisplay = chart.verse_chords ? `<div class="mb-2"><strong>Verse:</strong> ${chart.verse_chords}</div>` : '';
    const chorusDisplay = chart.chorus_chords ? `<div class="mb-2"><strong>Chorus:</strong> ${chart.chorus_chords}</div>` : '';
    const bridgeDisplay = chart.bridge_chords ? `<div><strong>Bridge:</strong> ${chart.bridge_chords}</div>` : '';

    return `
      <div class="bg-white rounded-2xl p-6 shadow-lg">
        <h4 class="font-['Playfair_Display'] text-xl font-bold text-primary mb-4">${chart.song?.title || 'Unknown Song'}</h4>
        <div class="text-sm text-gray-600 mb-4">
          ${verseDisplay}
          ${chorusDisplay}
          ${bridgeDisplay}
        </div>
        <button class="w-full bg-amber-100 text-primary py-2 !rounded-button font-medium hover:bg-amber-200 transition-colors whitespace-nowrap">
          Download Sheet
        </button>
      </div>
    `;
  }).join('');
}
