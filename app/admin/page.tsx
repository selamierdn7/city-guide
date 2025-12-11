import TurkeyMap from '@/components/TurkeyMap';
import { getCities } from '@/lib/db'; // YENİ: Veritabanı fonksiyonu
import Link from 'next/link';

// Sayfa artık "async" olmak zorunda çünkü veritabanını bekleyecek
export default async function Home() {
    // Veritabanından şehirleri çek
    const cities = await getCities();

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
                <TurkeyMap contentCities={cities} />
            </div>

            {/* Kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl px-4 w-full">
                {cities.map((city) => (
                    <Link
                        href={`/city/${city.id}`}
                        key={city.id}
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex items-center gap-4 cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={city.coverImage} alt={city.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{city.name}</h3>
                            <p className="text-xs text-blue-500 font-semibold">Keşfet &rarr;</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}