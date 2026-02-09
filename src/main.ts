import { getInstruments, getFolkSongs, getChordCharts } from './lib/database';
import { renderInstruments } from './components/instruments';
import { renderFeaturedSong, renderFolkSongs } from './components/folkSongs';
import { renderChordChartsForSongs } from './components/chordCharts';
import { initContactForm } from './components/contactForm';

async function loadInstruments() {
  const instruments = await getInstruments();
  const container = document.getElementById('instruments-grid');
  if (container) {
    container.innerHTML = renderInstruments(instruments);
  }
}

async function loadFolkSongs() {
  const songs = await getFolkSongs();
  const featuredSong = songs.find(s => s.is_featured);
  const regularSongs = songs.filter(s => !s.is_featured);

  const featuredContainer = document.getElementById('featured-song');
  if (featuredContainer && featuredSong) {
    featuredContainer.innerHTML = renderFeaturedSong(featuredSong);
  }

  const songsContainer = document.getElementById('folk-songs-grid');
  if (songsContainer) {
    songsContainer.innerHTML = renderFolkSongs(regularSongs);
  }
}

async function loadChordCharts() {
  const [chordCharts, songs] = await Promise.all([
    getChordCharts(),
    getFolkSongs()
  ]);

  const container = document.getElementById('chord-charts-grid');
  if (container) {
    container.innerHTML = renderChordChartsForSongs(chordCharts, songs);
  }
}

async function init() {
  await Promise.all([
    loadInstruments(),
    loadFolkSongs(),
    loadChordCharts()
  ]);

  initContactForm();
}

document.addEventListener('DOMContentLoaded', init);
