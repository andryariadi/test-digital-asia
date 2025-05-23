import { ArticleProps } from "@/lib/types";
import React from "react";
import ArticleCard from "./ArticleCard";
import { cn } from "@/lib/utils";

const ArticleLists = ({ articles, isPagination = true, isLength = true }: { articles: ArticleProps[]; isPagination?: boolean; isLength?: boolean }) => {
  console.log({ articles }, "<---articleLists");

  return (
    <section className={cn(`b-green-600 ${isLength ? "px-32" : "px-0"} ${isPagination ? "pb-40" : "pb-32"} flex flex-col justify-start gap-6`)}>
      {/* Article length */}
      {isLength ? (
        <span className="text-slate-600 text-base font-normal">
          Showing: {articles.length} of {articles.length} articles
        </span>
      ) : (
        <h5 className="text-xl font-semibold text-slate-900">Other Articles</h5>
      )}

      {/* Article Card Lists */}
      <div className="b-fuchsia-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {isPagination && <span className="text-slate-600 text-base font-normal text-center mt-10">Pagination</span>}
    </section>
  );
};

export default ArticleLists;
