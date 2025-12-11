// data/index.ts

export type CategoryType = 'place' | 'food' | 'activity';

export interface Item {
    id: string;
    name: string;
    type: CategoryType;
    description: string;
    images: string[]; // ARTIK DİZİ (ARRAY) OLDU
}

export interface City {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    items: Item[];
}

export const cities: City[] = [
    {
        id: "antalya",
        name: "Antalya",
        description: "Mavinin en güzel tonu, tarihin en canlı şahidi.",
        coverImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1920&auto=format&fit=crop",
        items: [
            // --- GEZİLECEK YERLER ---
            {
                id: "a1",
                name: "Kaleiçi",
                type: "place",
                description: "Bergama Krallığı'ndan Osmanlı'ya uzanan tarih. Dar sokakları, cumbalı evleri ve Hadrian Kapısı ile şehrin kalbi.",
                // BURAYA DİKKAT: ARTIK BİRDEN FAZLA RESİM VAR
                images: [
                    "https://images.unsplash.com/photo-1572535936749-8c26f03e2c65?q=80&w=800&auto=format&fit=crop", // Sokak
                    "https://images.unsplash.com/photo-1625893774883-9b9876ee24c4?q=80&w=800&auto=format&fit=crop", // Kapı
                    "https://images.unsplash.com/photo-1596306499317-849942a27546?q=80&w=800&auto=format&fit=crop"  // Liman
                ]
            },
            {
                id: "a2",
                name: "Düden Şelalesi",
                type: "place",
                description: "Şehrin içinde bir doğa harikası. Suların 40 metreden Akdeniz'e döküldüğü o muazzam manzara.",
                images: ["https://images.unsplash.com/photo-1530268578403-ade528997193?q=80&w=800&auto=format&fit=crop"]
            },
            {
                id: "a3",
                name: "Konyaaltı Plajı",
                type: "place",
                description: "Dünyaca ünlü mavi bayraklı plaj. Dağ manzarasına karşı yüzmek isteyenler için 7 km'lik sahil şeridi.",
                images: ["https://images.unsplash.com/photo-1599587289524-7647249b6b91?q=80&w=800&auto=format&fit=crop"]
            },

            // --- LEZZETLER ---
            {
                id: "a5",
                name: "Antalya Piyazı",
                type: "food",
                description: "Tahinli sosu, bol sarımsağı ve özel fasulyesiyle tescilli bir lezzet.",
                images: ["https://iasbh.tmgrup.com.tr/f4f728/1200/627/0/83/724/461?u=https://isbh.tmgrup.com.tr/sbh/2020/12/17/cografi-isaretli-antalya-piyazi-tarifi-nasil-yapilir-1608207865261.jpg"]
            },
            {
                id: "a6",
                name: "Şiş Köfte",
                type: "food",
                description: "Kömür ateşinde pişen efsane lezzet.",
                images: ["https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop"]
            },

            // --- AKTİVİTELER ---
            {
                id: "a9",
                name: "Rafting",
                type: "activity",
                description: "Köprülü Kanyon'da buz gibi suda heyecan dolu macera.",
                images: ["https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800&auto=format&fit=crop"]
            }
        ]
    },
    {
        id: "istanbul",
        name: "İstanbul",
        description: "Tarihin başkenti.",
        coverImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
        items: [
            {
                id: "ist1",
                name: "Galata Kulesi",
                type: "place",
                description: "Panoramik manzara.",
                images: ["https://images.unsplash.com/photo-1570535263002-861f4357c3e5"]
            }
        ]
    },
    {
        id: "ankara",
        name: "Ankara",
        description: "Başkent.",
        coverImage: "https://images.unsplash.com/photo-1596423736735-9614275038f9",
        items: []
    }
];