// app/components/ArticleViewSwitcher.tsx
"use client";

import React, { useState } from "react";
import ArticleContent from "./ArticleContent";
import ArticleForm from "./ArticleForm"; // Anda perlu membuat komponen ini
import { ArticleProps, CategoryProps } from "@/lib/types";

const ArticleViewSwitcher = ({ initialCategories, initialArticles, initialArticlesLength, initialQuery }: { initialCategories: CategoryProps[]; initialArticles: ArticleProps[]; initialArticlesLength: number; initialQuery?: string }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <ArticleForm onCancel={() => setShowForm(false)} categories={initialCategories} />
      ) : (
        <ArticleContent categories={initialCategories} articles={initialArticles} articlesLength={initialArticlesLength} query={initialQuery} onAddArticle={() => setShowForm(true)} />
      )}
    </>
  );
};

export default ArticleViewSwitcher;
