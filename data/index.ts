// src/data/index.ts

// BU KISIM KALSIN (TypeScript için gerekli)
export interface Item {
    id: string;
    name: string;
    type: 'place' | 'food' | 'activity';
    description: string;
    images: string[];
    mapsUrl?: string;
}

export interface City {
    id: string;
    name: string;
    type: 'city';
    description: string;
    coverImage: string;
    items: Item[];
    mapsUrl?: string; // Opsiyonel
}

// AŞAĞIDAKİ ESKİ VERİ LİSTESİNİ ARTIK BOŞ BIRAKABİLİRSİN
// Çünkü veriyi artık Firebase'den çekiyoruz.
export const cities: City[] = [];