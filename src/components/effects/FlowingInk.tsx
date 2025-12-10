"use client";

import { useEffect, useRef } from "react";

export function FlowingInk() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        // We will use "metaball" like behavior with soft radial gradients
        // combined with a blur filter on the canvas to make it look like wet ink

        interface InkBlob {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            oscillationSpeed: number;
            oscillationOffset: number;
        }

        const blobs: InkBlob[] = [];
        const numBlobs = 15;

        // Create blobs concentrated in a few "cluster" spots to look like splatters
        for (let i = 0; i < 3; i++) {
            const centerX = Math.random() * width;
            const centerY = Math.random() * height;
            const clusterSize = Math.random() * 5 + 3;

            for (let j = 0; j < clusterSize; j++) {
                blobs.push({
                    x: centerX + (Math.random() - 0.5) * 100,
                    y: centerY + (Math.random() - 0.5) * 100,
                    radius: Math.random() * 40 + 20,
                    vx: (Math.random() - 0.5) * 0.2, // Very slow drift
                    vy: (Math.random() - 0.5) * 0.2,
                    oscillationSpeed: Math.random() * 0.02 + 0.01,
                    oscillationOffset: Math.random() * Math.PI * 2
                });
            }
        }

        let time = 0;

        function draw() {
            if (!ctx || !canvas) return;
            time += 1;
            ctx.clearRect(0, 0, width, height);

            // Apply blur for fluid merging
            // Note: ctx.filter is supported in most modern browsers. 
            // Fallback or explicit SVG filter could be used if needed, but this is simple.
            ctx.filter = 'blur(8px)';
            // ctx.globalCompositeOperation = 'multiply'; // Doesn't work well with dark backgrounds sometimes, standard is fine

            for (const blob of blobs) {
                // Morph radius
                const r = blob.radius + Math.sin(time * blob.oscillationSpeed + blob.oscillationOffset) * 5;

                // Move
                blob.x += blob.vx;
                blob.y += blob.vy;

                // Draw soft blob
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r);
                gradient.addColorStop(0, "rgba(20, 20, 25, 0.8)"); // Dark ink center
                gradient.addColorStop(0.7, "rgba(20, 20, 25, 0.4)");
                gradient.addColorStop(1, "rgba(20, 20, 25, 0)"); // Fade out edge

                ctx.fillStyle = gradient;
                ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();

        return () => {
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-multiply opacity-70"
            // Additional CSS blur to really soften any edges
            style={{ filter: 'blur(4px) contrast(1.2)' }}
        />
    );
}
