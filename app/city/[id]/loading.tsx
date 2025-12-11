export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 animate-pulse">
            {/* Hero (Kapak Resmi) Skeleton */}
            <div className="h-[60vh] w-full bg-gray-300 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* Başlık İçin Gri Kutu */}
                    <div className="h-16 w-3/4 md:w-1/2 bg-gray-400 rounded-lg mb-4 opacity-50"></div>
                    {/* Açıklama İçin Gri Kutu */}
                    <div className="h-6 w-full md:w-2/3 bg-gray-400 rounded opacity-50"></div>
                </div>
            </div>

            {/* İçerik Alanı Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">

                {/* Sekmeler (Tabs) */}
                <div className="flex justify-center gap-4 mb-10">
                    <div className="h-10 w-24 bg-gray-300 rounded-full border-4 border-white"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded-full border-4 border-white"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded-full border-4 border-white"></div>
                </div>

                {/* Kartlar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm h-[400px] border border-gray-100">
                            <div className="h-64 bg-gray-200"></div>
                            <div className="p-5">
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}