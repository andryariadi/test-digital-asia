// app/components/ArticleViewSwitcher.tsx
"use client";

import React, { useState } from "react";
import ArticleContent from "./ArticleContent";
import ArticleForm from "./ArticleForm";
import { ArticleProps, CategoryProps, UserProps } from "@/lib/types";

const ArticleViewSwitcher = ({
  initialUser,
  initialCategories,
  initialArticles,
  initialArticlesLength,
  initialQuery,
}: {
  initialUser: UserProps;
  initialCategories: CategoryProps[];
  initialArticles: ArticleProps[];
  initialArticlesLength: number;
  initialQuery?: string;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);

  return (
    <>
      {showForm ? (
        <ArticleForm
          onCancel={() => {
            setShowForm(false);
            setArticleId(null);
          }}
          articleId={articleId}
          user={initialUser}
          categories={initialCategories}
        />
      ) : (
        <ArticleContent
          articles={initialArticles}
          categories={initialCategories}
          articlesLength={initialArticlesLength}
          query={initialQuery}
          onAddArticle={() => {
            setShowForm(true);
            setArticleId(null);
          }} // for button "Create Article"
          onEditArticle={(id) => {
            setShowForm(true);
            setArticleId(id);
          }} // for button "Edit Article"
        />
      )}
    </>
  );
};

export default ArticleViewSwitcher;
