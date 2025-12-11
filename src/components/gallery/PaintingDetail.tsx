"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Painting } from "@/types/painting";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, PlayCircle, PauseCircle, Maximize2, X, Image as ImageIcon } from "lucide-react";
import { FallingSnow } from "@/components/effects/FallingSnow";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { GlowPulse } from "@/components/effects/GlowPulse";
import { FlowingInk } from "@/components/effects/FlowingInk";

interface PaintingDetailProps {
    painting: Painting;
    prevSlug: string | null;
    nextSlug: string | null;
}

export function PaintingDetail({ painting, prevSlug, nextSlug }: PaintingDetailProps) {
    const { t, language } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);

    // Fullscreen logic
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showFullscreenVideo, setShowFullscreenVideo] = useState(false);

    const description = language === "en" ? painting.description_en : painting.description_ru;
    const statusLabel = t.common[painting.status];

    // Auto-play video immediately after mounting (if available), then stop on end
    useEffect(() => {
        if (painting.videoUrl) {
            setIsPlaying(true);
        }
    }, [painting.videoUrl]); // Run once when videoUrl is available

    // Determine which animation to show based on slug
    const renderBackgroundEffects = () => {
        switch (painting.slug) {
            case "winter-bridge":
                return <FallingSnow />;
            case "surreal-ink-tree":
                return <FlowingInk />;
            case "moonlit-sakura":
                return (
                    <>
                        <FloatingParticles color="255, 183, 197" count={40} />
                        <FloatingParticles color="255, 255, 255" count={20} />
                    </>
                );
            case "lotus-sunrise":
                return (
                    <>
                        <GlowPulse />
                        <FloatingParticles color="255, 223, 0" count={30} />
                    </>
                );
            default:
                return null;
        }
    };

    const isWinterScene = painting.slug === "winter-bridge";

    return (
        <div className="relative min-h-screen">
            {/* Fullscreen Overlay */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                        {showFullscreenVideo && painting.videoUrl ? (
                            <video
                                src={painting.videoUrl}
                                autoPlay
                                muted
                                playsInline
                                onEnded={() => setShowFullscreenVideo(false)}
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <img
                                src={painting.imageUrl}
                                alt={painting.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        )}

                        {/* Toggle Control in Fullscreen */}
                        {painting.videoUrl && (
                            <button
                                onClick={() => setShowFullscreenVideo(!showFullscreenVideo)}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm flex items-center gap-2 transition-all"
                            >
                                {showFullscreenVideo ? <ImageIcon size={20} /> : <PlayCircle size={20} />}
                                {showFullscreenVideo ? "Show Image" : "Play Video"}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* 1. Dynamic Background Color Layer */}
            <div
                className="absolute inset-0 transition-colors duration-1000 ease-in-out"
                style={{
                    backgroundColor: isWinterScene ? '#3D3B63' : '#FDFBF7'
                }}
            />

            {/* 2. Animation Effects Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {renderBackgroundEffects()}
            </div>

            {/* 3. Main Content Layer */}
            <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
                <Link href="/gallery" className="inline-flex items-center text-gray-500 hover:text-gold-DEFAULT mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    {t.gallery.backToGallery}
                </Link>

                <div className="flex flex-col items-center space-y-10">
                    {/* Main Image Container with Frame */}
                    <div className="relative w-full max-w-2xl bg-white p-4 border-[8px] border-double border-gold-DEFAULT shadow-2xl rounded-sm group">

                        {/* Fullscreen Trigger */}
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="absolute top-6 right-6 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                        >
                            <Maximize2 size={20} />
                        </button>

                        {/* Replay Button (Bottom Right) */}
                        {!isPlaying && painting.videoUrl && (
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="absolute bottom-6 right-6 z-30 p-2 bg-white/80 hover:bg-white text-gold-dark rounded-full shadow-lg transition-all hover:scale-105"
                                title="Replay Animation"
                            >
                                <PlayCircle size={24} />
                            </button>
                        )}

                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                            {/* Image */}
                            <img
                                src={painting.imageUrl}
                                alt={painting.title}
                                className={`w-full h-full object-cover transition-opacity duration-1000 ${isPlaying && painting.videoUrl ? 'opacity-0' : 'opacity-100'}`}
                            />

                            {/* Video Overlay (In-page) */}
                            {isPlaying && painting.videoUrl && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                                    <video
                                        src={painting.videoUrl}
                                        autoPlay
                                        muted
                                        playsInline
                                        onEnded={() => setIsPlaying(false)}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata & Info */}
                    <div className="text-center space-y-6 max-w-2xl">
                        <div>
                            <h1 className={`font-serif text-4xl md:text-5xl font-bold mb-2 transition-colors duration-1000 ${isWinterScene ? 'text-white' : 'text-gray-900'}`}>
                                {painting.title}
                            </h1>
                            <p className={`text-xl font-serif italic transition-colors duration-1000 ${isWinterScene ? 'text-gray-300' : 'text-gray-500'}`}>
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

                        <p className={`text-lg leading-relaxed font-light transition-colors duration-1000 ${isWinterScene ? 'text-gray-200' : 'text-gray-700'}`}>
                            {description}
                        </p>
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
        </div>
    );
}
