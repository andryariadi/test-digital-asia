import ArticleLists from "@/components/ArticleLists";
import MarkdownArticle from "@/components/MarkdownArticle";
import { getArticle, getArticles } from "@/lib/actions/articles.action";
import { ArticleProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ArticleDetails = async ({ params }: { params: Promise<{ id?: string }> }) => {
  const { id } = await params;
  const { data: articles } = await getArticles();
  const article = await getArticle(id);

  const sameCategoryArticles = articles
    .filter((item: ArticleProps) => item.id !== article.id && item.categoryId === article.categoryId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <main className="b-green-500 pt-20 space-y-15 min-h-[calc(100vh-4.5rem)]">
      {/* Article Details */}
      <article className="b-amber-500 w-full max-w-[400px] md:max-w-[650px] lg:max-w-[980px] 2xl:max-w-[1120px] mx-auto pt-10 min-h-[1500px] md:min-h-[1000px]">
        <figure className="b-rose-500 w-full 2xl:w-[1120px] space-y-10">
          {/* Top */}
          <div className="b-emerald-500 flex flex-col items-center justify-center gap-3">
            {/* Date Author */}
            <div className="b-green-500 flex items-center justify-center gap-3 text-slate-600 text-sm font-medium">
              <span>{formatDate(article.createdAt)}</span>
              <div className="b-slate-600 w-[2px] h-[2px] rounded-full"></div>
              <span className="capitalize">{article.user.username}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-slate-900 capitalize text-center px-4">{article.title}</h1>
          </div>

          {/* Image */}
          <div className="b-sky-800 relative h-[300px] md:h-[480px] w-full">
            <Image src={article.imageUrl ?? "https://placehold.co/600x400/png"} fill alt={article.title} className="object-cover rounded-[12px]" priority />
          </div>

          {/* Description */}
          <figcaption className="b-cyan-600 pb-20">
            <MarkdownArticle content={article.content} />
          </figcaption>
        </figure>
      </article>

      {/* Other Article */}
      <section className="b-cyan-500 px-4 md:px-16 lg:px-20 xl:px-36 2xl:px-48 pb-20">
        <ArticleLists articles={sameCategoryArticles} isPagination={false} isLength={false} />
      </section>
    </main>
  );
};

export default ArticleDetails;
