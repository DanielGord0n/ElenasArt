import { getAllPaintings, getPaintingBySlug } from "@/lib/paintings";
import { PaintingDetail } from "@/components/gallery/PaintingDetail";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const painting = getPaintingBySlug(slug);
    if (!painting) return {};

    return {
        title: `${painting.title} | Elena Gordon's Art`,
        description: painting.description_en,
    };
}

export default async function PaintingPage({ params }: PageProps) {
    const { slug } = await params;
    const painting = getPaintingBySlug(slug);

    if (!painting) {
        notFound();
    }

    // Determine Prev/Next
    const allPaintings = getAllPaintings();
    const currentIndex = allPaintings.findIndex((p) => p.slug === slug);

    // "Newest first" order is default in getAllPaintings
    // Next means next in the list (older painting), Prev means previous (newer painting)
    // Or purely by index order

    const prevSlug = currentIndex > 0 ? allPaintings[currentIndex - 1].slug : null;
    const nextSlug = currentIndex < allPaintings.length - 1 ? allPaintings[currentIndex + 1].slug : null;

    return (
        <PaintingDetail
            painting={painting}
            prevSlug={prevSlug}
            nextSlug={nextSlug}
        />
    );
}

export async function generateStaticParams() {
    const paintings = getAllPaintings();
    return paintings.map((painting) => ({
        slug: painting.slug,
    }));
}
