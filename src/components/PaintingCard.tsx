"use client";

import Link from "next/link";
import { Painting } from "@/types/painting";
import { useLanguage } from "@/context/LanguageContext";

interface PaintingCardProps {
    painting: Painting;
}

export function PaintingCard({ painting }: PaintingCardProps) {
    const { language } = useLanguage();

    // Choose the title based on language if you had ru title, but here we only have one title field 
    // + an i18n description. 
    // Prompt says: "title: painting title (English; Russian title can be... derived)".
    // We'll just use painting.title for now.

    return (
        <Link href={`/gallery/${painting.slug}`} className="group block h-full">
            <div className="relative h-full flex flex-col items-center">
                {/* Frame Container */}
                <div className="relative p-3 bg-white border-[6px] border-double border-gold-DEFAULT shadow-lg rounded-sm transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                    {/* Image */}
                    {/* Using simple img tag for MVP local images, can upgrade to Next/Image later */}
                    <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 w-full min-w-[200px]">
                        <img
                            src={painting.imageUrl}
                            alt={`${painting.title} - ${painting.subject}`}
                            className="object-cover w-full h-full"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <span className="text-white font-serif text-lg tracking-wide px-4 text-center">
                                {painting.title}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
