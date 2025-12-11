// src/lib/db.ts
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query } from 'firebase/firestore';
import { City } from '@/data'; // Tip tanımını yine buradan alabiliriz

// Tüm şehirleri getir (Ana Sayfa İçin)
export async function getCities(): Promise<City[]> {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(query(citiesCol));

    // Firebase'den gelen veriyi bizim formatımıza çeviriyoruz
    const cityList = citySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as City[];

    return cityList;
}

// Tek bir şehri getir (Detay Sayfası İçin)
export async function getCity(id: string): Promise<City | null> {
    const docRef = doc(db, "cities", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        } as City;
    } else {
        return null;
    }
}