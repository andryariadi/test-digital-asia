import { ArticleProps } from "@/lib/types";
import React from "react";
import ArticleCard from "./ArticleCard";
import { cn } from "@/lib/utils";
import ArticlesPagination from "./ArticlesPagination";

const ArticleLists = ({ articles, articlesLength, isPagination = true, isLength = true }: { articles: ArticleProps[]; articlesLength?: number; isPagination?: boolean; isLength?: boolean }) => {
  // console.log({ articles }, "<---articleLists");

  return (
    <section className={cn(`b-green-600 ${isLength ? "px-4 md:px-10 lg:px-20 xl:px-32" : "px-0"} ${isPagination ? "pb-40" : "pb-32"} flex flex-col justify-start gap-5`)}>
      {/* Article length */}
      {isLength ? (
        <span className="text-slate-600 text-base font-normal">
          Showing: {articles.length} of {articlesLength} articles
        </span>
      ) : (
        <h5 className="text-xl font-semibold text-slate-900">Other Articles</h5>
      )}

      {/* Article Card Lists */}
      <div className="b-fuchsia-500 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {isPagination && <ArticlesPagination />}
    </section>
  );
};

export default ArticleLists;
