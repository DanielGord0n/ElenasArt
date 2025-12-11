"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="space-y-4">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                        {t.home.heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-gold-dark font-light tracking-wide">
                        {t.home.heroTagline}
                    </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0 font-light">
                    {language === 'en'
                        ? t.home.heroIntro
                        : "Елена Гордон — художница..." // Fallback or use what's in 't' 
                    }
                    {/* Note: t.home.heroIntro is already localized in context */}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start pt-4">
                    <Link
                        href="/gallery"
                        className="px-8 py-3 bg-gold-DEFAULT text-white rounded-full font-medium hover:bg-gold-dark transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        {t.home.viewGallery}
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 text-gray-600 hover:text-gold-DEFAULT transition-colors underline-offset-4 hover:underline"
                    >
                        <Mail size={18} />
                        {t.home.contactLink}
                    </Link>
                </div>
            </div>

            {/* Image / Portrait */}
            <div className="flex-1 w-full max-w-md md:max-w-lg relative">
                <div className="relative aspect-[3/4] rounded-t-full rounded-b-[100px] overflow-hidden border-8 border-white shadow-2xl">
                    <img
                        src="/elena-portrait.jpg"
                        alt="Elena Gordon"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 top-6 -right-4 md:top-10 md:-right-10 w-full h-full rounded-t-full rounded-b-[100px] border-2 border-gold-DEFAULT/30" />
            </div>
        </section>
    );
}
