import HeroSection from "@/components/HeroSection";

export default async function ArticlesHomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  return (
    <main className="bg-amber-500 min-h-[calc(100vh-4.5rem)] pt20">
      <HeroSection query={query} />
    </main>
  );
}
