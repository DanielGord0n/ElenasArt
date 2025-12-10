import { getAllPaintings } from "@/lib/paintings";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = {
    title: "Gallery | Elena Gordon's Art",
    description: "Browse the collection of paintings by Elena Gordon.",
};

export default function GalleryPage() {
    const paintings = getAllPaintings();

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-8 border-b border-gold-DEFAULT/30 pb-4">
                Gallery
            </h1>
            <GalleryGrid paintings={paintings} />
        </div>
    );
}
