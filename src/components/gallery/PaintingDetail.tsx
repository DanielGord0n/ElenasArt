"use client";

import { useState } from "react";
import Link from "next/link";
import { Painting } from "@/types/painting";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

interface PaintingDetailProps {
    painting: Painting;
    prevSlug: string | null;
    nextSlug: string | null;
}

export function PaintingDetail({ painting, prevSlug, nextSlug }: PaintingDetailProps) {
    const { t, language } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);

    const description = language === "en" ? painting.description_en : painting.description_ru;

    // prompt: "Status (in words, e.g., “For sale”, “Not for sale”, “Sold” — use friendly labels, not raw enum values)"
    // We can use t.common[status]
    const statusLabel = t.common[painting.status];

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <Link href="/gallery" className="inline-flex items-center text-gray-500 hover:text-gold-DEFAULT mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                {t.gallery.backToGallery}
            </Link>

            <div className="flex flex-col items-center space-y-10">
                {/* Main Image Container */}
                <div className="relative w-full max-w-2xl bg-white p-4 border-[8px] border-double border-gold-DEFAULT shadow-2xl rounded-sm">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                        {/* Image */}
                        <img
                            src={painting.imageUrl}
                            alt={painting.title}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                        />

                        {/* Video Overlay (Mockup for actual video) */}
                        {isPlaying && painting.videoUrl && (
                            <div className="absolute inset-0 bg-black flex items-center justify-center">
                                {/* In real implementation, this would be a <video> tag */}
                                <div className="text-white">Playing Video... Not implemented in MVP</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Metadata & Info */}
                <div className="text-center space-y-6 max-w-2xl">
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            {painting.title}
                        </h1>
                        <p className="text-xl text-gray-500 font-serif italic">
                            {painting.year}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-widest text-gray-500 border-t border-b border-lavender-dark/20 py-4">
                        <span>{painting.medium}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT" />
                        <span>{painting.size}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT" />
                        <span className="capitalize">{painting.subject}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT" />
                        <span className="text-gold-dark font-semibold">{statusLabel}</span>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed font-light">
                        {description}
                    </p>

                    {/* AI Video Feature */}
                    <div className="pt-6">
                        <p className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                            {t.gallery.makeAlive}
                        </p>
                        {painting.videoUrl ? (
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-lavender-dark/20 hover:bg-gold-light/20 text-indigo-900 rounded-full transition-colors font-medium"
                            >
                                <PlayCircle size={20} />
                                {t.gallery.playVideo}
                            </button>
                        ) : (
                            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm italic">
                                {t.gallery.comingSoon}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="w-full flex justify-between pt-12 border-t border-gray-100">
                    {prevSlug ? (
                        <Link href={`/gallery/${prevSlug}`} className="group flex items-center gap-2 text-gray-600 hover:text-gold-dark">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">{t.gallery.previous}</span>
                        </Link>
                    ) : <div />} {/* Spacer */}

                    {nextSlug ? (
                        <Link href={`/gallery/${nextSlug}`} className="group flex items-center gap-2 text-gray-600 hover:text-gold-dark">
                            <span className="font-medium">{t.gallery.next}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
