import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition">
                        TR
                    </div>
                    <span className="font-bold text-xl text-gray-800 tracking-tight group-hover:text-blue-600 transition">
                        GeziRehberi
                    </span>
                </Link>

                {/* LİNKLER (Masaüstü) */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/" label="Ana Sayfa" />
                    <NavLink href="#" label="Popüler Rotalar" />
                    <NavLink href="#" label="Blog" />
                    <NavLink href="#" label="İletişim" />
                </div>

                {/* BUTON */}
                <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                    Giriş Yap
                </button>
            </div>
        </nav>
    );
}

// Linkler için ufak yardımcı bileşen
function NavLink({ href, label }: { href: string, label: string }) {
    return (
        <Link href={href} className="text-gray-600 hover:text-blue-600 font-medium text-sm transition">
            {label}
        </Link>
    );
}