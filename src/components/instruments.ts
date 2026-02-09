import type { Instrument } from '../lib/types';

export function renderInstruments(instruments: Instrument[]): string {
  return instruments.map(instrument => `
    <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div class="relative mb-6">
        <img src="${instrument.image_url}"
             alt="${instrument.name}"
             class="w-full h-48 object-cover rounded-xl">
        <div class="absolute top-4 right-4 w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <i class="ri-play-fill text-white"></i>
        </div>
      </div>
      <h3 class="font-['Playfair_Display'] text-2xl font-bold text-primary mb-3">${instrument.name}</h3>
      <p class="text-gray-600 mb-4">
        ${instrument.description}
      </p>
      <div class="flex items-center text-secondary font-medium">
        <i class="ri-volume-up-line mr-2"></i>
        Listen to Sample
      </div>
    </div>
  `).join('');
}
