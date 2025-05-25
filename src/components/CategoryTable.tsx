"use client";

import React from "react";
import { CategoryProps, UserProps } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDatee } from "@/lib/utils";
import ButtonModalEditCategory from "./ButtonModalEditCategory";
import ButtonModalDeleteCategory from "./ButtonModalDeleteCategory";

const CategoryTable = ({ categories, user }: { categories: CategoryProps[]; user: UserProps }) => {
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
                {/* Modal Edit */}
                <ButtonModalEditCategory user={user} category={category} />

                {/* Modal Delete */}
                <ButtonModalDeleteCategory category={category} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
