"use client";

import React from "react";
import { CategoryProps } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDatee } from "@/lib/utils";

const CategoryTable = ({ categories }: { categories: CategoryProps[] }) => {
  console.log({ categories }, "<---CategoryTable");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[375px] text-center text-sm font-medium text-slate-900">Category</TableHead>

          <TableHead className="w-[375px] text-center text-sm font-medium text-slate-900">Created at</TableHead>

          <TableHead className="w-[375px] text-center text-sm font-medium text-slate-900">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {categories.map((category) => (
          <TableRow key={category.id} className="h-24">
            <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">{category.name}</TableCell>

            <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">{formatDatee(category.createdAt)}</TableCell>

            <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">
              <div className="flex items-center justify-center gap-3">
                <button className="text-blue-600 hover:underline transition-all duration-300">Edit</button>
                <button className="text-red-500 hover:underline transition-all duration-300">Delete</button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
