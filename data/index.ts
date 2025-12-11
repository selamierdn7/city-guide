// data/index.ts

export type CategoryType = 'place' | 'food' | 'activity';

export interface Item {
    id: string;
    name: string;
    type: CategoryType;
    description: string;
    images: string[];
    mapsUrl?: string;
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
            {
                id: "a1",
                name: "Kaleiçi",
                type: "place",
                description: "Bergama Krallığı'ndan Osmanlı'ya uzanan tarih. Dar sokakları, cumbalı evleri ve Hadrian Kapısı ile şehrin kalbi.",
                images: [
                    "https://images.unsplash.com/photo-1572535936749-8c26f03e2c65?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1625893774883-9b9876ee24c4?q=80&w=800&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1596306499317-849942a27546?q=80&w=800&auto=format&fit=crop"
                ],
                // GERÇEK LINK EKLENDİ
                mapsUrl: "https://www.google.com/maps/place/Kaleiçi,+Muratpaşa%2FAntalya"
            },
            {
                id: "a2",
                name: "Düden Şelalesi",
                type: "place",
                description: "Şehrin içinde bir doğa harikası. Suların 40 metreden Akdeniz'e döküldüğü o muazzam manzara.",
                images: ["https://images.unsplash.com/photo-1530268578403-ade528997193?q=80&w=800&auto=format&fit=crop"],
                // GERÇEK LINK EKLENDİ
                mapsUrl: "https://www.google.com/maps/place/Düden+Şelalesi"
            },
            {
                id: "a3",
                name: "Konyaaltı Plajı",
                type: "place",
                description: "Dünyaca ünlü mavi bayraklı plaj. Dağ manzarasına karşı yüzmek isteyenler için 7 km'lik sahil şeridi.",
                images: ["https://images.unsplash.com/photo-1599587289524-7647249b6b91?q=80&w=800&auto=format&fit=crop"],
                mapsUrl: "https://www.google.com/maps/place/Konyaaltı+Plajı"
            },
            {
                id: "a5",
                name: "Antalya Piyazı (Piyazcı Sami)",
                type: "food",
                description: "Tahinli sosu, bol sarımsağı ve özel fasulyesiyle tescilli bir lezzet. En iyisi Piyazcı Sami'de yenir.",
                images: ["https://iasbh.tmgrup.com.tr/f4f728/1200/627/0/83/724/461?u=https://isbh.tmgrup.com.tr/sbh/2020/12/17/cografi-isaretli-antalya-piyazi-tarifi-nasil-yapilir-1608207865261.jpg"],
                // GERÇEK LINK EKLENDİ
                mapsUrl: "https://www.google.com/maps/search/Antalya+Piyazcı+Sami"
            },
            {
                id: "a6",
                name: "Şiş Köfte (Şişçi İbo)",
                type: "food",
                description: "Kömür ateşinde pişen efsane lezzet. Antalya'nın klasiği.",
                images: ["https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop"],
                mapsUrl: "https://www.google.com/maps/search/Antalya+Şişçi+İbo"
            },
            {
                id: "a9",
                name: "Rafting (Köprülü Kanyon)",
                type: "activity",
                description: "Köprülü Kanyon'da buz gibi suda heyecan dolu macera.",
                images: ["https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800&auto=format&fit=crop"],
                mapsUrl: "https://www.google.com/maps/place/Köprülü+Kanyon+Milli+Parkı"
            }
        ]
    },
    {
        id: "istanbul",
        name: "İstanbul",
        description: "Tarihin başkenti.",
        coverImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
        items: []
    },
    {
        id: "ankara",
        name: "Ankara",
        description: "Başkent.",
        coverImage: "https://images.unsplash.com/photo-1596423736735-9614275038f9",
        items: []
    }
];