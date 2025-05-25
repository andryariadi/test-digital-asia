import ArticleLists from "@/components/ArticleLists";
import HeroSection from "@/components/HeroSection";
import { getArticles } from "@/lib/actions/articles.action";
import { ArticleProps } from "@/lib/types";

export default async function ArticlesHomePage({ searchParams }: { searchParams: Promise<{ query?: string; category?: string }> }) {
  const { query, category } = await searchParams;

  const res = await getArticles();
  let articles: ArticleProps[] = res.data || [];

  const articlesLength = res.total;

  if (query) {
    articles = articles.filter(
      (article: ArticleProps) =>
        article.title.toLowerCase().includes(query.toLowerCase()) || (article.content && article.content.toLowerCase().includes(query.toLowerCase())) || article.category.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    articles = articles.filter((article) => article.category.name.toLowerCase() === category.toLowerCase());
  }

  // articles = articles.filter((article) => {
  //   const matchesQuery = query
  //     ? article.title.toLowerCase().includes(query.toLowerCase()) || (article.content && article.content.toLowerCase().includes(query.toLowerCase())) || article.category.name.toLowerCase().includes(query.toLowerCase())
  //     : true;

  //   const matchesCategory = category ? article.category.name.toLowerCase() === category.toLowerCase() : true;

  //   return matchesQuery && matchesCategory;
  // });

  // console.log({ res, articles }, "<---homePage");
  console.log({ query, category }, "<---homePage");

  return (
    <main className="b-amber-500 min-h-[calc(100vh-4.5rem)] space-y-10">
      <HeroSection query={query} />
      <ArticleLists articles={articles} articlesLength={articlesLength} />
    </main>
  );
}
