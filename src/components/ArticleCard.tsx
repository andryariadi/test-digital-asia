import { ArticleProps } from "@/lib/types";
import { formatDate, stripHtmlTags } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ article }: { article: ArticleProps }) => {
  //   console.log({ article }, "<---articleCard");

  return (
    <figure className="group h-[423px] hover:bg-white hover:shadow-lg trassation-all duration-300 overflow-hidden rounded-[12px]">
      {/* Image */}
      <Link href={`/articles/${article.id}`}>
        <div className="b-sky-800 relative h-full max-h-[240px] w-full overflow-hidden rounded-[12px]">
          <Image src={article.imageUrl ?? "https://placehold.co/600x400/png"} fill alt={article.title} className="object-cover" />
        </div>
      </Link>

      <figcaption className="b-amber-600 mt-4 flex flex-col gap-2 group-hover:px-2 transition-all duration-300 text-slate-600">
        {/* Date */}
        <span className="text-sm font-normal">{formatDate(article.createdAt)}</span>

        {/* Title */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-lg text-slate-900 font-semibold line-clamp-1 capitalize">{article.title}</h2>
        </Link>

        {/* Description */}
        <p className="text-base font-normal line-clamp-2">{stripHtmlTags(article.content)}</p>

        {/* Category */}
        <div className="bg-blue-200 w-max px-3 py-1 rounded-full">
          <span className="text-blue-900 text-sm font-normal">{article.category.name}</span>
        </div>
      </figcaption>
    </figure>
  );
};

export default ArticleCard;
