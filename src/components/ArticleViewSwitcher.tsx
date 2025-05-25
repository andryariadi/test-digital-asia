"use client";

import React, { useState } from "react";
import ArticleContent from "./ArticleContent";
import ArticleForm from "./ArticleForm";
import { ArticleProps, CategoryProps, UserProps } from "@/lib/types";

const ArticleViewSwitcher = ({
  initialUser,
  initialCategoriesForSelect,
  initialArticles,
  initialArticlesLength,
  initialQuery,
  currentPage,
  totalPages,
}: {
  initialUser: UserProps;
  initialCategoriesForSelect: CategoryProps[];
  initialArticles: ArticleProps[];
  initialArticlesLength: number;
  initialQuery?: string;
  currentPage?: number;
  totalPages?: number;
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
          categories={initialCategoriesForSelect}
        />
      ) : (
        <ArticleContent
          articles={initialArticles}
          categories={initialCategoriesForSelect}
          articlesLength={initialArticlesLength}
          query={initialQuery}
          currentPage={currentPage}
          totalPages={totalPages}
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
