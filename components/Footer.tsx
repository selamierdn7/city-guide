export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Kolon 1: Marka */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-4">GeziRehberi.com</h2>
                    <p className="text-slate-400 max-w-sm">
                        Türkiye'nin 81 ilini, lezzetlerini ve gizli kalmış cennetlerini keşfetmeniz için hazırlanan modern seyahat asistanınız.
                    </p>
                </div>

                {/* Kolon 2: Hızlı Linkler */}
                <div>
                    <h3 className="text-white font-bold mb-4">Keşfet</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">Gezilecek Yerler</a></li>
                        <li><a href="#" className="hover:text-white transition">Yöresel Lezzetler</a></li>
                        <li><a href="#" className="hover:text-white transition">Aktiviteler</a></li>
                        <li><a href="#" className="hover:text-white transition">Oteller</a></li>
                    </ul>
                </div>

                {/* Kolon 3: Sosyal */}
                <div>
                    <h3 className="text-white font-bold mb-4">Takip Et</h3>
                    <div className="flex gap-4">
                        {/* Sosyal Medya İkonları (Emoji olarak) */}
                        <span className="cursor-pointer hover:scale-110 transition">📸 Instagram</span>
                        <span className="cursor-pointer hover:scale-110 transition">🐦 Twitter</span>
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                        © 2024 Tüm hakları saklıdır.
                    </p>
                </div>

            </div>
        </footer>
    );
}