"use client";

import React from "react";
import { ArticleProps, CategoryProps } from "@/lib/types";
import FilterCategory from "./FilterCategory";
import SearchArticles from "./SearchArticles";
import { Plus } from "lucide-react";
import ArticlesTable from "./ArticlesTable";
import ButtonPagination from "./ButtonPagination";

const ArticleContent = ({
  categories,
  articles,
  articlesLength,
  query,
  currentPage = 1,
  totalPages = 1,
  isPagination = true,
  onAddArticle,
  onEditArticle,
}: {
  categories: CategoryProps[];
  articles: ArticleProps[];
  articlesLength: number;
  query?: string;
  currentPage?: number;
  totalPages?: number;
  isPagination?: boolean;
  onAddArticle: () => void;
  onEditArticle: (id: string) => void;
}) => {
  console.log(onAddArticle, "<---onAddArticle");

  const showPagination = isPagination && articlesLength > 10;

  return (
    <section className="b-amber-500">
      {/* Top */}
      <div className="b-rose-500 rounded-t-md overflow-hidden">
        {/* Total Articles */}
        <div className="bg-white p-6 border-b-2 border-slate-200">
          <span>Total Articles: {articlesLength}</span>
        </div>

        {/* Action Button */}
        <div className="bg-white p-6 flex items-center justify-between border-b-2 border-slate-200">
          {/* Filter & Search */}
          <div className="b-rose-600 flex items-center gap-2">
            <FilterCategory caategories={categories} isAdmin={true} />

            <SearchArticles query={query} action="/dashboard-articles" isAdmin={true} isArticle={true} />
          </div>

          {/* Button Create */}
          <button
            onClick={() => onAddArticle()}
            className="flex items-center gap-2 py-3 px-4 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300"
            type="submit"
          >
            <Plus size={20} className="text-slate-50" />
            <span className="text-sm text-slate-50 font-medium">Add Articles</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="b-sky-600">
        <ArticlesTable articles={articles} onEditArticle={onEditArticle} />
      </div>

      {/* Pagination */}
      <div className="bg-white border-2 border-slate-200 rounded-b-md h-[88px] flex items-center justify-center">{showPagination && <ButtonPagination currentPage={currentPage} totalPages={totalPages} />}</div>
    </section>
  );
};

export default ArticleContent;
