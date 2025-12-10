"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);
    const email = "gordonel@gmail.com"; // Placeholder as requested

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-6 py-20 md:py-32">
            <div className="max-w-2xl mx-auto text-center space-y-12">
                <h1 className="font-serif text-4xl md:text-5xl text-gray-900">
                    {t.contact.title}
                </h1>

                <p className="text-xl text-gray-600 font-light leading-relaxed">
                    {t.contact.intro}
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-lavender-dark/20 space-y-6">
                    <Mail size={48} className="mx-auto text-gold-DEFAULT text-opacity-80" />

                    <a
                        href={`mailto:${email}`}
                        className="block text-2xl md:text-3xl font-medium text-gray-800 hover:text-gold-dark transition-colors"
                    >
                        {email}
                    </a>

                    <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gold-light/20 text-gray-600 hover:text-gold-dark rounded-full transition-all text-sm font-medium tracking-wide"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? t.contact.copied : t.contact.copyEmail}
                    </button>
                </div>
            </div>
        </div>
    );
}
