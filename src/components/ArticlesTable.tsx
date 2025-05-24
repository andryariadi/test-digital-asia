"use client";

import React from "react";
import { ArticleProps } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDatee } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ArticlesTable = ({ articles }: { articles: ArticleProps[] }) => {
  console.log({ articles }, "<---articlesTable");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[225px] text-center text-sm font-medium text-slate-900">Thumnails</TableHead>

          <TableHead className="w-[225px] text-center text-sm font-medium text-slate-900">Title</TableHead>

          <TableHead className="w-[225px] text-center text-sm font-medium text-slate-900">Category</TableHead>

          <TableHead className="w-[225px] text-center text-sm font-medium text-slate-900">Created at</TableHead>

          <TableHead className="w-[225px] text-center text-sm font-medium text-slate-900">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {articles.map((article) => (
          <TableRow key={article.id} className="h-24">
            <TableCell className="h-[96px] w-[225px] text-sm font-normal text-slate-600">
              <div className="flex items-center justify-center">
                <div className="relative size-16">
                  <Image src={article.imageUrl ?? "https://placehold.co/600x400/png"} alt={article.title} fill className="object-cover rounded-[6px]" />
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center w-[225px] text-sm font-normal text-slate-600 text-wrap">{article.title}</TableCell>

            <TableCell className="text-center w-[225px] text-sm font-normal text-slate-600">{article.category.name}</TableCell>

            <TableCell className="text-center w-[225px] text-sm font-normal text-slate-600">{formatDatee(article.createdAt)}</TableCell>

            <TableCell className="text-center w-[225px] text-sm font-normal text-slate-600">
              <div className="flex items-center justify-center gap-3">
                <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline transition-all duration-300">
                  Priview
                </Link>
                <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline transition-all duration-300">
                  Edit
                </Link>
                <Link href={`/articles/${article.id}`} className="text-red-500 hover:underline transition-all duration-300">
                  Delete
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ArticlesTable;
