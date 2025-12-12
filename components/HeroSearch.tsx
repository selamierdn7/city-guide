"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { City } from "@/data";

interface Props {
    cities: City[];
}

export default function HeroSearch({ cities }: Props) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<City[]>([]);

    // Kullanıcı yazı yazdıkça filtrele
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setQuery(text);

        if (text.length > 0) {
            // Türkçe karakter duyarlı arama
            const searchLower = text.toLocaleLowerCase("tr");
            const results = cities.filter((city) =>
                city.name.toLocaleLowerCase("tr").includes(searchLower)
            );
            setFiltered(results);
        } else {
            setFiltered([]);
        }
    };

    const handleSelect = (cityId: string) => {
        router.push(`/city/${cityId}`);
    };

    return (
        <div className="relative w-full h-[550px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* 1. ARKA PLAN (Daha Karanlık Yapıldı) */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop")' }}
            >
                {/* Karartma katmanını %50'den %60'a çıkardık ve hafif mavi ton ekledik */}
                <div className="absolute inset-0 bg-slate-900/60"></div>
            </div>

            {/* 2. İÇERİK */}
            <div className="relative z-10 w-full max-w-4xl mx-auto animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
                    Nereye gitmek istiyorsun?
                </h1>
                <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
                    Türkiye'nin eşsiz güzelliklerini, gizli kalmış lezzetlerini ve tarihi mekanlarını keşfetmeye hazır mısın?
                </p>

                {/* 3. ARAMA KUTUSU (Görünürlük Artırıldı) */}
                <div className="relative w-full max-w-2xl mx-auto group">

                    {/* Input'un kendisi */}
                    <input
                        type="text"
                        placeholder="Şehir veya bölge ara... (Örn: Kapadokya)"
                        value={query}
                        onChange={handleSearch}
                        className="w-full p-5 pl-8 rounded-full bg-white text-gray-900 placeholder:text-gray-400 font-medium shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/40 outline-none text-lg transition-all"
                    />

                    {/* Ara Butonu */}
                    <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                        Ara
                    </button>

                    {/* 4. SONUÇ LİSTESİ (Dropdown) */}
                    {filtered.length > 0 && (
                        <div className="absolute top-full left-4 right-4 mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto border border-gray-100 z-50 animate-in slide-in-from-top-2">
                            <div className="p-2">
                                <p className="text-xs font-bold text-gray-400 uppercase px-3 py-2">Arama Sonuçları</p>
                                {filtered.map((city) => (
                                    <div
                                        key={city.id}
                                        onClick={() => handleSelect(city.id)}
                                        className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors group/item"
                                    >
                                        <img src={city.coverImage} alt={city.name} className="w-14 h-14 rounded-lg object-cover shadow-sm group-hover/item:scale-105 transition-transform" />
                                        <div className="text-left flex-grow">
                                            <h4 className="font-bold text-gray-800 text-lg">{city.name}</h4>
                                            <p className="text-xs text-gray-500 line-clamp-1">{city.description}</p>
                                        </div>
                                        <span className="text-sm text-blue-600 font-bold opacity-0 group-hover/item:opacity-100 transition-opacity px-2">
                                            Git &rarr;
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Eğer sonuç yoksa ve yazı yazılmışsa uyarı */}
                {query.length > 0 && filtered.length === 0 && (
                    <div className="mt-4 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full inline-block border border-white/20">
                        😔 "{query}" ile ilgili bir şehir bulamadık.
                    </div>
                )}

            </div>
        </div>
    );
}