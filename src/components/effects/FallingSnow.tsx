"use client";

import { useEffect, useRef } from "react";

export function FallingSnow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const snowflakes: { x: number; y: number; r: number; d: number }[] = [];
        const maxFlakes = 300; // Increased count

        for (let i = 0; i < maxFlakes; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 4 + 2, // Larger flakes (2-6px)
                d: Math.random() * maxFlakes // density
            });
        }

        function draw() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)"; // Higher opacity
            ctx.beginPath();
            for (let i = 0; i < maxFlakes; i++) {
                const p = snowflakes[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
            requestAnimationFrame(draw);
        }

        let angle = 0;
        function update() {
            angle += 0.01;
            for (let i = 0; i < maxFlakes; i++) {
                const p = snowflakes[i];
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;

                if (p.x > width + 5 || p.x < -5 || p.y > height) {
                    if (i % 3 > 0) { // 66% of the flakes
                        snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d };
                    } else {
                        // If the flake is exitting from the right
                        if (Math.sin(angle) > 0) {
                            snowflakes[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d };
                        } else {
                            snowflakes[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d };
                        }
                    }
                }
            }
        }

        draw();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        />
    );
}
