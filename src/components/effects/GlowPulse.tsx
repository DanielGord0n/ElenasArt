"use client";

export function GlowPulse() {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        </div>
    );
}
