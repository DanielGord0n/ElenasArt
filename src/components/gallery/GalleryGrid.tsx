"use client";

import { useState, useMemo } from "react";
import { Painting } from "@/types/painting";
import { PaintingCard } from "@/components/PaintingCard";
import { useLanguage } from "@/context/LanguageContext";
import { ListFilter } from "lucide-react";

export function GalleryGrid({ paintings }: { paintings: Painting[] }) {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<string>("all");
    const [sort, setSort] = useState<"newest">("newest"); // MVP: Only "newest" implemented per spec, but prepared for more

    // Get unique subjects
    const subjects = useMemo(() => {
        const s = new Set(paintings.map((p) => p.subject));
        return Array.from(s);
    }, [paintings]);

    const filteredPaintings = useMemo(() => {
        let result = [...paintings];

        if (filter !== "all") {
            result = result.filter((p) => p.subject === filter);
        }

        // Sort is always newest first by default in lib, but we enforce it here if sort option changes
        if (sort === "newest") {
            result.sort((a, b) => b.year - a.year);
        }

        return result;
    }, [paintings, filter, sort]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-lavender-dark/10">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <ListFilter size={20} className="text-gold-dark" />
                    <span className="font-medium text-gray-700">{t.gallery.filterSubject}:</span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="flex-1 sm:flex-none border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-DEFAULT/50 bg-transparent text-gray-700 capitalize"
                    >
                        <option value="all">{t.gallery.filterAll}</option>
                        {subjects.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{t.gallery.sortNewest}</span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPaintings.map((painting) => (
                    <div key={painting.slug} className="aspect-[4/5]">
                        <PaintingCard painting={painting} />
                    </div>
                ))}
            </div>

            {filteredPaintings.length === 0 && (
                <p className="text-center text-gray-500 py-12">No paintings found.</p>
            )}
        </div>
    );
}
