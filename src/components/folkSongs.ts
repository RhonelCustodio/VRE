import type { FolkSong } from '../lib/types';

export function renderFeaturedSong(song: FolkSong | undefined): string {
  if (!song) return '';

  return `
    <div class="bg-gradient-to-r from-primary to-red-700 rounded-3xl p-8 mb-12 text-white">
      <div class="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="font-['Playfair_Display'] text-3xl font-bold mb-4">${song.title}</h3>
          <p class="text-lg mb-6 text-red-100">
            ${song.description}
          </p>
          <div class="flex gap-4">
            <button class="bg-white text-primary px-6 py-3 !rounded-button font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2">
              <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-play-fill"></i>
              </div>
              Play Recording
            </button>
            <button class="border-2 border-white text-white px-6 py-3 !rounded-button font-semibold hover:bg-white hover:text-primary transition-colors whitespace-nowrap flex items-center gap-2">
              <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-file-music-line"></i>
              </div>
              View Sheet Music
            </button>
          </div>
        </div>
        <div class="relative">
          <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="w-full h-48 bg-white/20 rounded-xl flex items-center justify-center">
              <div class="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                <i class="ri-play-fill text-3xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderFolkSongs(songs: FolkSong[]): string {
  return songs.map(song => `
    <div class="bg-amber-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-['Playfair_Display'] text-xl font-bold text-primary">${song.title}</h4>
        <button class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <i class="ri-play-fill"></i>
        </button>
      </div>
      <p class="text-gray-600 mb-4">${song.description}</p>
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span class="flex items-center gap-1">
          <i class="ri-time-line"></i>
          ${song.duration}
        </span>
        <span class="flex items-center gap-1">
          <i class="ri-music-2-line"></i>
          ${song.category}
        </span>
      </div>
    </div>
  `).join('');
}
