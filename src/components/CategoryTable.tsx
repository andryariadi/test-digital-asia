"use client";

import React, { Suspense } from "react";
import { CategoryProps, UserProps } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDatee } from "@/lib/utils";
import ButtonModalEditCategory from "./ButtonModalEditCategory";
import ButtonModalDeleteCategory from "./ButtonModalDeleteCategory";

const CategoryTable = ({ categories, user }: { categories: CategoryProps[]; user: UserProps }) => {
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
        <Suspense fallback={<h1 className="text-xl font-semibold text-sky-500">Loading...</h1>}>
          {categories.map((category) => (
            <TableRow key={category.id} className="h-24">
              <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">{category.name}</TableCell>

              <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">{formatDatee(category.createdAt)}</TableCell>

              <TableCell className="text-center w-[375px] text-sm font-normal text-slate-600">
                <div className="flex items-center justify-center gap-3">
                  {/* Modal Edit */}
                  <ButtonModalEditCategory user={user} category={category} />

                  {/* Modal Delete */}
                  <ButtonModalDeleteCategory category={category} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Suspense>
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
