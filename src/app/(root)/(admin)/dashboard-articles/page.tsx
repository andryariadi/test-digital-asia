import React from "react";
import { getArticles } from "@/lib/actions/articles.action";
import { getCategories } from "@/lib/actions/categories.action";
import { ArticleProps } from "@/lib/types";
import ArticleViewSwitcher from "@/components/ArticleViewSwitcher";
import { getUser } from "@/lib/actions/auth.action";

const DashboardArticlesPage = async ({ searchParams }: { searchParams: Promise<{ query?: string; category?: string; page?: string }> }) => {
  const { query, category, page } = await searchParams;

  const user = await getUser();

  const { data: categories } = await getCategories();

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

  // console.log({ query, category, user, articles, categories }, "<---dashboardArticlesPage");

  return (
    <main className="b-fuchsia-500 min-h-screen pt-[100px] p-6">
      {/* Content */}
      <ArticleViewSwitcher initialUser={user} initialCategories={categories} initialArticles={articles} initialArticlesLength={articlesLength} initialQuery={query} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
};

export default DashboardArticlesPage;
