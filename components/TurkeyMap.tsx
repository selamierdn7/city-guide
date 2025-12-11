"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { City } from '@/data';
import { turkeyMapData } from '@/data/mapData';

interface TurkeyMapProps {
    contentCities: City[];
}

export default function TurkeyMap({ contentCities }: TurkeyMapProps) {
    const router = useRouter();
    const [hoveredCity, setHoveredCity] = useState<{ name: string, status: string } | null>(null);

    // İçeriği olan şehirlerin ID listesi
    const activeCityIds = contentCities.map(c => c.id);

    return (
        <div className="w-full relative">
            {/* Tooltip */}
            {hoveredCity && (
                <div
                    className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-4 py-2 rounded-lg shadow-xl text-sm font-bold transition-all duration-150 whitespace-nowrap"
                    style={{
                        left: '50%',
                        top: '-10px',
                        backgroundColor: hoveredCity.status === 'active' ? '#2563EB' : '#374151',
                        color: 'white'
                    }}
                >
                    {hoveredCity.name}
                    {hoveredCity.status === 'passive' && (
                        <span className="block text-[10px] font-normal text-gray-400 opacity-80">
                            Yakında
                        </span>
                    )}
                </div>
            )}

            {/* SVG Harita */}
            <svg
                viewBox="0 0 1050 450"
                className="w-full h-auto filter drop-shadow-xl"
            >
                {turkeyMapData.map((city) => {
                    const isActive = activeCityIds.includes(city.id);

                    return (
                        <path
                            key={city.id}
                            id={city.id}
                            d={city.path}
                            onClick={() => isActive && router.push(`/city/${city.id}`)}
                            onMouseEnter={() => setHoveredCity({
                                name: city.name,
                                status: isActive ? 'active' : 'passive'
                            })}
                            onMouseLeave={() => setHoveredCity(null)}
                            className={`
                transition-all duration-300 ease-in-out stroke-white stroke-[0.5]
                ${isActive
                                    ? 'fill-blue-600 hover:fill-orange-500 hover:-translate-y-1 hover:stroke-2 cursor-pointer z-10 relative'
                                    : 'fill-gray-200 hover:fill-gray-300 cursor-default'
                                }
              `}
                            style={{ vectorEffect: 'non-scaling-stroke' }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}