import { getAllPaintings } from "@/lib/paintings";
import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";

export default function Home() {
  const paintings = getAllPaintings();
  const featuredPaintings = paintings.filter(p => p.featured).slice(0, 3);

  return (
    <>
      <Hero />
      <Featured paintings={featuredPaintings} />
    </>
  );
}
