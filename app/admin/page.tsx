"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, arrayUnion, getDoc, getDocs } from 'firebase/firestore';
import { City, Item } from '@/data';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [status, setStatus] = useState("");

    // --- FORM STATE'LERİ ---

    // 1. Şehir Formu
    const [isEditingCity, setIsEditingCity] = useState(false); // Düzenleme modunda mı?
    const [cityIdToEdit, setCityIdToEdit] = useState(""); // Hangi şehir düzenleniyor?

    const [newCityName, setNewCityName] = useState("");
    const [newCityDesc, setNewCityDesc] = useState("");
    const [newCityImage, setNewCityImage] = useState("");

    // 2. İçerik Formu
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [itemOldId, setItemOldId] = useState(""); // Düzenlerken eskiyi silmek için lazım

    const [selectedCityId, setSelectedCityId] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemType, setItemType] = useState("place");
    const [itemDesc, setItemDesc] = useState("");
    const [itemMap, setItemMap] = useState("");

    // Resim Galerisi
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    const [addedImages, setAddedImages] = useState<string[]>([]);

    // Verileri Çek
    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        const querySnapshot = await getDocs(collection(db, "cities"));
        const cityList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as City[];
        // Şehirleri alfabetik sırala
        setCities(cityList.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const createId = (text: string) => {
        return text.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-');
    };

    // --- RESİM İŞLEMLERİ ---
    const handleAddImageToList = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!currentImageUrl) return;
        setAddedImages([...addedImages, currentImageUrl]);
        setCurrentImageUrl("");
    };

    const removeImageFromList = (index: number) => {
        setAddedImages(addedImages.filter((_, i) => i !== index));
    };

    // ==========================================================
    // 🏙️ ŞEHİR İŞLEMLERİ (KAYDET / GÜNCELLE / SİL)
    // ==========================================================

    const handleSaveCity = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const cityId = isEditingCity ? cityIdToEdit : createId(newCityName);
            const cityRef = doc(db, "cities", cityId);

            // Güncelleme yaparken mevcut items dizisini korumalıyız
            // Eğer yeni ekliyorsak items boş başlar
            let cityData: any = {
                name: newCityName,
                description: newCityDesc,
                coverImage: newCityImage,
            };

            if (!isEditingCity) {
                cityData.items = []; // Yeni şehir ise boş liste
            }

            // setDoc (merge: true) kullanarak varsa güncelle, yoksa oluştur
            await setDoc(cityRef, cityData, { merge: true });

            setStatus(`✅ Şehir başarıyla ${isEditingCity ? 'güncellendi' : 'eklendi'}!`);
            resetCityForm();
            fetchCities();
        } catch (error) {
            console.error(error);
            setStatus("❌ Hata oluştu.");
        }
        setLoading(false);
    };

    const handleDeleteCity = async (id: string) => {
        if (!window.confirm("Bu şehri ve içindeki TÜM MEKANLARI silmek istediğine emin misin?")) return;

        try {
            await deleteDoc(doc(db, "cities", id));
            setStatus("🗑️ Şehir silindi.");
            fetchCities();
        } catch (error) {
            console.error(error);
            setStatus("❌ Silinemedi.");
        }
    };

    const handleEditCityClick = (city: City) => {
        setIsEditingCity(true);
        setCityIdToEdit(city.id);
        setNewCityName(city.name);
        setNewCityDesc(city.description);
        setNewCityImage(city.coverImage);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfayı yukarı kaydır
    };

    const resetCityForm = () => {
        setIsEditingCity(false);
        setCityIdToEdit("");
        setNewCityName(""); setNewCityDesc(""); setNewCityImage("");
    };

    // ==========================================================
    // 🏛️ İÇERİK (MEKAN) İŞLEMLERİ (KAYDET / GÜNCELLE / SİL)
    // ==========================================================

    const handleSaveItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCityId) { setStatus("⚠️ Şehir seçmelisin."); return; }
        if (addedImages.length === 0) { setStatus("⚠️ En az 1 resim ekle."); return; }

        setLoading(true);

        try {
            const cityRef = doc(db, "cities", selectedCityId);
            const cityDoc = await getDoc(cityRef);
            if (!cityDoc.exists()) throw new Error("Şehir bulunamadı");

            const currentCityData = cityDoc.data() as City;
            let updatedItems = currentCityData.items || [];

            const newItemData: Item = {
                id: isEditingItem ? itemOldId : (createId(itemName) + "-" + Date.now()),
                name: itemName,
                type: itemType as any,
                description: itemDesc,
                images: addedImages,
                mapsUrl: itemMap
            };

            if (isEditingItem) {
                // Düzenleme: Eski item'ı bul ve yenisiyle değiştir
                updatedItems = updatedItems.map(item => item.id === itemOldId ? newItemData : item);
            } else {
                // Ekleme: Listeye yeni ekle
                updatedItems.push(newItemData);
            }

            // Tüm listeyi yeniden kaydet (Firestore array güncelleme mantığı)
            await updateDoc(cityRef, { items: updatedItems });

            setStatus(`✅ İçerik ${isEditingItem ? 'güncellendi' : 'eklendi'}!`);
            resetItemForm();
            fetchCities(); // Listeyi yenile ki aşağıda görelim
        } catch (error) {
            console.error(error);
            setStatus("❌ Hata oluştu.");
        }
        setLoading(false);
    };

    const handleDeleteItem = async (cityId: string, itemId: string) => {
        if (!window.confirm("Bu mekanı silmek istediğine emin misin?")) return;

        try {
            const cityRef = doc(db, "cities", cityId);
            const cityDoc = await getDoc(cityRef);
            const currentItems = (cityDoc.data() as City).items;

            // Silinecek olan hariç diğerlerini filtrele
            const newItems = currentItems.filter(i => i.id !== itemId);

            await updateDoc(cityRef, { items: newItems });
            setStatus("🗑️ Mekan silindi.");
            fetchCities();
        } catch (error) {
            console.error(error);
            setStatus("❌ Silinemedi.");
        }
    };

    const handleEditItemClick = (cityId: string, item: Item) => {
        setIsEditingItem(true);
        setItemOldId(item.id);
        setSelectedCityId(cityId);

        setItemName(item.name);
        setItemType(item.type);
        setItemDesc(item.description);
        setItemMap(item.mapsUrl || "");
        setAddedImages(item.images);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetItemForm = () => {
        setIsEditingItem(false);
        setItemOldId("");
        setItemName(""); setItemDesc(""); setItemMap(""); setAddedImages([]);
    };

    // ==========================================================
    // ARAYÜZ (UI)
    // ==========================================================

    return (
        <div className="min-h-screen bg-gray-100 p-8 pb-32">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Yönetim Paneli</h1>

            {/* DURUM MESAJI */}
            {status && (
                <div className={`p-4 mb-6 rounded text-center font-bold sticky top-4 z-50 shadow-lg ${status.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {status}
                </div>
            )}

            {/* --- FORMLAR --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">

                {/* SOL: ŞEHİR FORMU */}
                <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${isEditingCity ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                    <h2 className="text-xl font-bold mb-4 text-blue-600 flex justify-between items-center">
                        {isEditingCity ? '✏️ Şehri Düzenle' : '➕ Yeni Şehir Ekle'}
                        {isEditingCity && <button onClick={resetCityForm} className="text-xs text-gray-500 underline">İptal</button>}
                    </h2>
                    <form onSubmit={handleSaveCity} className="space-y-4">
                        <input required type="text" placeholder="Şehir Adı (Örn: Rize)" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="input-style" />
                        <input required type="url" placeholder="Kapak Resmi URL" value={newCityImage} onChange={(e) => setNewCityImage(e.target.value)} className="input-style" />
                        <textarea required rows={3} placeholder="Şehir Açıklaması..." value={newCityDesc} onChange={(e) => setNewCityDesc(e.target.value)} className="input-style" />

                        <button disabled={loading} type="submit" className={`w-full py-2 rounded text-white font-bold disabled:opacity-50 ${isEditingCity ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}>
                            {loading ? "İşleniyor..." : (isEditingCity ? "Değişiklikleri Kaydet" : "Şehri Oluştur")}
                        </button>
                    </form>
                </div>

                {/* SAĞ: İÇERİK FORMU */}
                <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${isEditingItem ? 'border-orange-600 ring-2 ring-orange-200' : 'border-orange-200'}`}>
                    <h2 className="text-xl font-bold mb-4 text-orange-600 flex justify-between items-center">
                        {isEditingItem ? '✏️ İçeriği Düzenle' : '➕ Şehre İçerik Ekle'}
                        {isEditingItem && <button onClick={resetItemForm} className="text-xs text-gray-500 underline">İptal</button>}
                    </h2>
                    <form onSubmit={handleSaveItem} className="space-y-4">
                        <select required value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)} className="input-style bg-white" disabled={isEditingItem}>
                            <option value="">-- Şehir Seçiniz --</option>
                            {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                        </select>

                        <div className="grid grid-cols-2 gap-4">
                            <input required type="text" placeholder="Mekan Adı" value={itemName} onChange={(e) => setItemName(e.target.value)} className="input-style" />
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="input-style bg-white">
                                <option value="place">Gezilecek Yer</option>
                                <option value="food">Lezzet</option>
                                <option value="activity">Aktivite</option>
                            </select>
                        </div>

                        <textarea required rows={2} placeholder="Açıklama..." value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} className="input-style" />

                        {/* Resim Galerisi */}
                        <div className="bg-orange-50 p-3 rounded border border-orange-100">
                            <label className="block text-xs font-bold text-orange-800 mb-1 uppercase">Galeri ({addedImages.length})</label>
                            <div className="flex gap-2 mb-2">
                                <input type="url" placeholder="Resim URL..." value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} className="flex-grow text-sm p-2 border rounded outline-none" />
                                <button onClick={handleAddImageToList} className="bg-green-600 text-white px-3 rounded font-bold hover:bg-green-700">+</button>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {addedImages.map((img, idx) => (
                                    <div key={idx} className="relative w-12 h-12 flex-shrink-0 group cursor-pointer border rounded overflow-hidden">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeImageFromList(idx)} className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold">Sil</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <input type="url" placeholder="Google Maps Linki" value={itemMap} onChange={(e) => setItemMap(e.target.value)} className="input-style" />

                        <button disabled={loading} type="submit" className={`w-full py-3 rounded text-white font-bold disabled:opacity-50 ${isEditingItem ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'}`}>
                            {loading ? "İşleniyor..." : (isEditingItem ? "İçeriği Güncelle" : "Listeye Ekle")}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- LİSTELEME ALANI (YENİ BÖLÜM) --- */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">📂 Mevcut İçerik Yönetimi</h2>

                <div className="grid grid-cols-1 gap-6">
                    {cities.map((city) => (
                        <div key={city.id} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
                            {/* Şehir Başlığı */}
                            <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                                <div className="flex items-center gap-4">
                                    <img src={city.coverImage} className="w-12 h-12 rounded object-cover shadow-sm" />
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{city.name}</h3>
                                        <p className="text-xs text-gray-500">{city.items?.length || 0} içerik var</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditCityClick(city)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-semibold">Düzenle</button>
                                    <button onClick={() => handleDeleteCity(city.id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm font-semibold">Sil</button>
                                </div>
                            </div>

                            {/* Mekan Listesi (Accordion içi) */}
                            <div className="p-4 bg-white">
                                {city.items && city.items.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {city.items.map((item) => (
                                            <div key={item.id} className="flex gap-3 border p-2 rounded hover:bg-gray-50 transition relative group">
                                                <img src={item.images[0]} className="w-16 h-16 rounded object-cover bg-gray-200" />
                                                <div className="flex-grow min-w-0">
                                                    <h4 className="font-bold text-sm text-gray-800 truncate">{item.name}</h4>
                                                    <span className="text-[10px] uppercase font-bold text-gray-400 border px-1 rounded">{item.type}</span>
                                                </div>

                                                {/* Mekan Butonları */}
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded">
                                                    <button onClick={() => handleEditItemClick(city.id, item)} title="Düzenle" className="p-1 text-blue-600 hover:text-blue-800">✏️</button>
                                                    <button onClick={() => handleDeleteItem(city.id, item.id)} title="Sil" className="p-1 text-red-600 hover:text-red-800">🗑️</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Henüz içerik eklenmemiş.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .input-style {
          width: 100%;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          padding: 0.75rem;
          border-radius: 0.5rem;
          color: #111827;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
        </div>
    );
}