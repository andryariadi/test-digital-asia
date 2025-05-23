import ArticleLists from "@/components/ArticleLists";
import HeroSection from "@/components/HeroSection";
import { getArticles } from "@/lib/actions/articles.action";

export default async function ArticlesHomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  const res = await getArticles();
  const articles = res.data;

  // console.log({ res, articles }, "<---homePage");

  return (
    <main className="b-amber-500 min-h-[calc(100vh-4.5rem)] space-y-10">
      <HeroSection query={query} />
      <ArticleLists articles={articles} />
    </main>
  );
}
