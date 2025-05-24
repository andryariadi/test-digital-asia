import React from "react";
import { getArticles } from "@/lib/actions/articles.action";
import { getCategories } from "@/lib/actions/categories.action";
import { ArticleProps } from "@/lib/types";
import ArticleViewSwitcher from "@/components/ArticleViewSwitcher";
import { getUser } from "@/lib/actions/auth.action";

const DashboardArticlesPage = async ({ searchParams }: { searchParams: Promise<{ query?: string; category?: string }> }) => {
  const { query, category } = await searchParams;

  const user = await getUser();

  const { data: categories } = await getCategories();

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

  // console.log({ query, category, user, articles, categories }, "<---dashboardArticlesPage");

  return (
    <main className="b-fuchsia-500 min-h-screen pt-[100px] p-6">
      {/* Content */}
      <ArticleViewSwitcher initialUser={user} initialCategories={categories} initialArticles={articles} initialArticlesLength={articlesLength} initialQuery={query} />
    </main>
  );
};

export default DashboardArticlesPage;
