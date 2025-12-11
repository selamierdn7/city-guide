"use client";

import { cities } from '@/data'; // veya '../data'
import TurkeyMap from '@/components/TurkeyMap'; // veya '../components/TurkeyMap'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-10">

      <div className="text-center mb-8 max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
          Rotanı Seç
        </h1>
        <p className="text-slate-500">
          Türkiye'nin lezzet ve tarih dolu şehirlerini keşfetmek için haritaya tıkla.
        </p>
      </div>

      {/* Harita Alanı */}
      <div className="w-full max-w-6xl px-4 mb-12">
        {/* DÜZELTME: availableCities yerine contentCities yazıyoruz */}
        <TurkeyMap contentCities={cities} />
      </div>

      {/* Kartlar (Alternatif Görünüm) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl px-4 w-full">
        {cities.map((city) => (
          <div
            key={city.id}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex items-center gap-4 cursor-pointer"
            onClick={() => window.location.href = `/city/${city.id}`}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={city.coverImage} alt={city.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{city.name}</h3>
              <p className="text-xs text-blue-500 font-semibold">Keşfet &rarr;</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
