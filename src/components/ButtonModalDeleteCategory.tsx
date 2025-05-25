"use client";

import React, { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { CategoryProps } from "@/lib/types";
import { deleteCategory } from "@/lib/actions/categories.action";

const ButtonModalDeleteCategory = ({ category }: { category: CategoryProps }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteCategory = async () => {
    const res = await deleteCategory(category.id);

    if (res) {
      setOpenModal(false);
      toast.success("Category deleted successfully", {
        style: toastStyle,
      });
    }
  };
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:underline transition-all duration-300">Delete</button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px] gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>

          <AlertDialogDescription>Delete category “{category.name}”? This will remove it from master data permanently.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCategory} className="bg-red-500">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonModalDeleteCategory;
