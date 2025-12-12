import Link from 'next/link';
import { notFound } from 'next/navigation';
import CityTabs from '@/components/CityTabs';
import { getCity } from '@/lib/db'; // YENİ: Veritabanı fonksiyonu

export const dynamic = "force-dynamic"

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CityDetail({ params }: PageProps) {
    const resolvedParams = await params;
    const cityId = resolvedParams.id;

    // YENİ: Veritabanından tek bir şehri çekiyoruz
    // (Artık .find() ile aramak yok, direkt ID ile soruyoruz)
    const city = await getCity(cityId);

    if (!city) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Bölümü */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={city.coverImage}
                    alt={city.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-4 text-center">
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight drop-shadow-lg">
                        {city.name}
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl font-light text-gray-200 drop-shadow-md">
                        {city.description}
                    </p>
                </div>

                <Link
                    href="/"
                    className="absolute top-8 left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full transition font-semibold flex items-center gap-2 border border-white/20"
                >
                    &larr; Haritaya Dön
                </Link>
            </div>

            {/* İçerik Alanı */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
                <CityTabs items={city.items} />
            </div>
        </main>
    );
}