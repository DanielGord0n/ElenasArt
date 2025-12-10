export interface Painting {
    slug: string;
    title: string;
    year: number;
    medium: string;
    subject: "nature" | "landscape" | "portrait" | "sketch";
    size: string;
    status: "for_sale" | "not_for_sale" | "sold";
    description_en: string;
    description_ru: string;
    featured: boolean;
    imageUrl?: string; // Derived field
    videoUrl?: string; // Optional field for "Make it come to life"
}
