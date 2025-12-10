"use client";

import { useEffect, useRef } from "react";

interface ParticleProps {
    color?: string; // color of particles
    count?: number;
}

export function FloatingParticles({ color = "255, 192, 203", count = 50 }: ParticleProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const particles: { x: number; y: number; s: number; speed: number; opacity: number }[] = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                s: Math.random() * 5 + 2, // size
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function draw() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < count; i++) {
                const p = particles[i];
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
            }
            update();
            requestAnimationFrame(draw);
        }

        function update() {
            for (let i = 0; i < count; i++) {
                const p = particles[i];
                p.y -= p.speed; // move up
                p.x += Math.sin(p.y * 0.01) * 0.5; // gentle sway

                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                }
            }
        }

        draw();
    }, [color, count]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    );
}
