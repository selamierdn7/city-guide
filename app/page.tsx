// src/app/page.tsx
export const dynamic = "force-dynamic"; // Veritabanını taze tutmak için şart

import HeroSearch from '@/components/HeroSearch';
import { getCities } from '@/lib/db';
import Link from 'next/link';

export default async function Home() {
  // Veritabanından tüm şehirleri çek
  const cities = await getCities();

  // Şimdilik ilk 5 şehri "Popüler" olarak alalım
  // (Daha sonra istersen rastgele de seçtirebiliriz)
  const popularCities = cities.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* 1. Bölüm: Arama ve Hero Alanı */}
      <HeroSearch cities={cities} />

      {/* 2. Bölüm: Popüler Şehirler */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Popüler Rotalar 🔥</h2>
            <p className="text-gray-500 mt-1">Gezginlerin en çok tercih ettiği 5 durak.</p>
          </div>
          {/* İstersen buraya "Tümünü Gör" butonu koyabiliriz */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCities.map((city, index) => (
            <Link
              href={`/city/${city.id}`}
              key={city.id}
              className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-80 ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Arka Plan Resmi */}
              <img
                src={city.coverImage}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Karartma (Gradient) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Yazılar */}
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  {city.name}
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Popüler</span>
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {city.description}
                </p>
                <div className="mt-4 inline-block text-white font-semibold border-b border-blue-500 pb-0.5">
                  Rehberi İncele &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Eğer hiç şehir yoksa uyarı */}
        {cities.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Henüz veritabanına şehir eklenmemiş.</p>
            <Link href="/admin" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
              + Şehir Ekle
            </Link>
          </div>
        )}
      </section>

    </main>
  );
}
