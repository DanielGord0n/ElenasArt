import fs from "fs";
import path from "path";
import { Painting } from "@/types/painting";

const PAINTINGS_DIR = path.join(process.cwd(), "content/paintings");

export function getAllPaintings(): Painting[] {
    if (!fs.existsSync(PAINTINGS_DIR)) {
        return [];
    }

    const filenames = fs.readdirSync(PAINTINGS_DIR);
    const paintings = filenames
        .filter((name) => name.endsWith(".json"))
        .map((name) => {
            const filePath = path.join(PAINTINGS_DIR, name);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const data = JSON.parse(fileContent) as Painting;

            // Derive imageUrl from slug by checking file existence
            let imageUrl = "";
            const extensions = ["jpg", "png", "jpeg", "webp"];

            for (const ext of extensions) {
                const publicPath = path.join(process.cwd(), "public", "paintings", `${data.slug}.${ext}`);
                if (fs.existsSync(publicPath)) {
                    imageUrl = `/paintings/${data.slug}.${ext}`;
                    break;
                }
            }

            // Fallback if no image found
            if (!imageUrl) {
                imageUrl = `/paintings/${data.slug}.jpg`;
            }

            return {
                ...data,
                imageUrl,
            };
        });

    // Sort by year descending (Newest first) default
    return paintings.sort((a, b) => b.year - a.year);
}

export function getPaintingBySlug(slug: string): Painting | null {
    const all = getAllPaintings();
    return all.find((p) => p.slug === slug) || null;
}
