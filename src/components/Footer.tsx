"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-lavender-dark/10 mt-20 py-8 border-t border-lavender-dark/20 text-center text-gray-600">
            <p className="font-serif text-lg mb-2">
                &copy; {year} {t.footer.rights}
            </p>
            <p className="text-sm text-gray-500 italic font-light">
                {t.footer.tagline}
            </p>
        </footer>
    );
}
