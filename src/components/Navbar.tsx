"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ru" : "en");
    };

    const NavLinks = () => (
        <>
            <Link href="/" className="hover:text-gold-DEFAULT transition-colors">
                {t.nav.home}
            </Link>
            <Link href="/gallery" className="hover:text-gold-DEFAULT transition-colors">
                {t.nav.gallery}
            </Link>
            <Link href="/contact" className="hover:text-gold-DEFAULT transition-colors">
                {t.nav.contact}
            </Link>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-lavender-light/95 backdrop-blur-sm border-b border-lavender-dark/20 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-3 font-serif text-2xl font-bold tracking-tight text-gray-900 hover:text-gold-dark transition-colors"
                >
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                    {t.nav.brand}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
                    <NavLinks />
                    <button
                        onClick={toggleLanguage}
                        className="ml-4 px-3 py-1 text-sm border border-gold-DEFAULT/50 rounded-full text-gold-dark hover:bg-gold-light/20 transition-all"
                    >
                        {language === "en" ? "RU" : "EN"}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center md:hidden gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="text-sm font-semibold text-gold-dark"
                    >
                        {language === "en" ? "RU" : "EN"}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1 text-gray-700 hover:text-gold-DEFAULT"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-lavender-light border-t border-lavender-dark/10 px-4 py-6 flex flex-col gap-6 text-center font-medium shadow-md">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-gold-DEFAULT"
                    >
                        {t.nav.home}
                    </Link>
                    <Link
                        href="/gallery"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-gold-DEFAULT"
                    >
                        {t.nav.gallery}
                    </Link>
                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-gold-DEFAULT"
                    >
                        {t.nav.contact}
                    </Link>
                </div>
            )}
        </nav>
    );
}
