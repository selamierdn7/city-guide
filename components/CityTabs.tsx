"use client";

import { useState } from 'react';
import { Item, CategoryType } from '@/data';

interface CityTabsProps {
    items: Item[];
}

export default function CityTabs({ items }: CityTabsProps) {
    const [activeTab, setActiveTab] = useState<'all' | CategoryType>('all');

    const filteredItems = activeTab === 'all'
        ? items
        : items.filter((item) => item.type === activeTab);

    return (
        <div>
            {/* SEKMELER */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['all', 'place', 'food', 'activity'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveTab(type as any)}
                        className={`
              px-5 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wide
              ${activeTab === type
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-300 transform scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-100'
                            }
            `}
                    >
                        {type === 'all' ? 'Tümü' : type === 'place' ? 'Gezilecek' : type === 'food' ? 'Lezzet' : 'Aktivite'}
                    </button>
                ))}
            </div>

            {/* LİSTE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                    // Buradaki kart yapısını ayırdık, aşağıda tanımlı bileşeni kullanıyoruz
                    <GalleryCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

// --- YENİ GALERİ KART BİLEŞENİ ---
// Her kart kendi resim sırasını (currentIndex) kendi içinde tutar.
function GalleryCard({ item }: { item: Item }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Bir sonraki resme geç
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Tıklama yukarı taşmasın
        setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
    };

    // Bir önceki resme geç
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full group">

            {/* --- RESİM ALANI (SLIDER) --- */}
            <div className="h-64 relative bg-gray-200">
                <img
                    src={item.images[currentImageIndex]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Kategori Etiketi (Sol Üst) */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {item.type}
                </div>

                {/* Resim Sayacı (Sağ Üst - Sadece birden fazla resim varsa) */}
                {item.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full font-mono">
                        {currentImageIndex + 1} / {item.images.length}
                    </div>
                )}

                {/* Slider Butonları (Sadece birden fazla resim varsa ve hover olunca görünür) */}
                {item.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                            &larr;
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                            &rarr;
                        </button>

                        {/* Alt Noktalar (Dots) */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                            {item.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* --- İÇERİK ALANI --- */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

                {/* Açıklama */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {item.description}
                </p>

                {/* Sabit Footer Butonu */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                    {item.mapsUrl ? (
                        <a
                            href={item.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1 w-fit"
                        >
                            📍 Konumunu Haritada Gör &rarr;
                        </a>
                    ) : (
                        <span className="text-gray-400 text-sm cursor-not-allowed flex items-center gap-1">
                            🚫 Konum bilgisi yok
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}