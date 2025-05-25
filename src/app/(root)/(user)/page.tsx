import ArticleLists from "@/components/ArticleLists";
import HeroSection from "@/components/HeroSection";
import { getArticles } from "@/lib/actions/articles.action";
import { ArticleProps } from "@/lib/types";

export default async function ArticlesHomePage({ searchParams }: { searchParams: Promise<{ query?: string; category?: string; page?: string }> }) {
  const { query, category, page } = await searchParams;

  const limit = 10;

  // Get total articles first to calculate totalPages
  const resForTotal = await getArticles(1, limit);
  const articlesLength = resForTotal.total;
  const totalPages = Math.ceil(articlesLength / limit);
  const currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages));

  const res = await getArticles(currentPage, limit);
  let articles: ArticleProps[] = res.data || [];

  if (query) {
    articles = articles.filter(
      (article: ArticleProps) =>
        article.title.toLowerCase().includes(query.toLowerCase()) || (article.content && article.content.toLowerCase().includes(query.toLowerCase())) || article.category.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    articles = articles.filter((article) => article.category.name.toLowerCase() === category.toLowerCase());
  }
  if (category === "all") {
    articles = res.data || [];
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] space-y-10">
      <HeroSection query={query} />
      <ArticleLists articles={articles} articlesLength={articlesLength} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
