"use client";

import React from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { deleteArticle } from "@/lib/actions/articles.action";
const ButtonModalDeleteArticle = ({ articleId }: { articleId: string }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteArticle(articleId);

      if (res) {
        toast.success("Article deleted successfully", {
          style: toastStyle,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: toastStyle,
        });
      } else {
        toast.error("An unknown error occurred", {
          style: toastStyle,
        });
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-red-500 flex items-center gap-2 cursor-pointer p-2 rounded-md">
          <span className="text-red-500 hover:underline transition-all duration-300">Delete</span>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px] gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Article</AlertDialogTitle>

          <AlertDialogDescription>Deleting this article is permanent and cannot be undone. All related content will be removed.?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 h-10">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonModalDeleteArticle;
