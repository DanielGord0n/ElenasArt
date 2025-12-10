"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Painting } from "@/types/painting";
import { PaintingCard } from "@/components/PaintingCard";

export function Featured({ paintings }: { paintings: Painting[] }) {
    const { t } = useLanguage();

    if (paintings.length === 0) return null;

    return (
        <section className="py-20 bg-white/50">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-gray-900 border-b-2 border-gold-light pb-2 inline-block">
                        {t.home.featuredTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
                    {paintings.map((painting) => (
                        <div key={painting.slug} className="aspect-[4/5]">
                            <PaintingCard painting={painting} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
