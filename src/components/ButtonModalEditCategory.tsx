"use client";

import React, { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";
import InputField from "./InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValidation } from "@/lib/validations";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { updateCategory } from "@/lib/actions/categories.action";
import { CategoryProps, UserProps } from "@/lib/types";

const ButtonModalEditCategory = ({ user, category }: { user: UserProps; category: CategoryProps }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof CategoryFormValidation>>({
    resolver: zodResolver(CategoryFormValidation),
    defaultValues: {
      name: category ? category.name : "",
    },
    mode: "onChange",
  });

  const handleSubmitCategory: SubmitHandler<z.infer<typeof CategoryFormValidation>> = async (data) => {
    try {
      const newCategory = {
        name: data.name,
        userId: user.id,
      };
      const res = await updateCategory(category.id, newCategory);

      if (res) {
        toast.success("Category updated successfully", {
          style: toastStyle,
        });
        setOpen(false);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-blue-500 hover:underline transition-all duration-300">Edit</button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px] gap-10">
        <form onSubmit={handleSubmit(handleSubmitCategory)} className="space-y-12">
          <AlertDialogHeader className="gap-8">
            <AlertDialogTitle>Edit Category</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="relative">
                <InputField type="text" label="Category" placeholder="Category" name="name" propData={{ ...register("name") }} isArticleForm={true} />
                {errors.name && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.name.message as string}</p>}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              className="h-10"
            >
              Cancel
            </AlertDialogCancel>

            <motion.button
              type="submit"
              className="h-10 w-[116px] bg-gradient-to-r from-blue-500 to-sky-600 text-slate-50 text-sm font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-70"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className="animate-spin mx-auto" size={22} /> : "Save Changes"}
            </motion.button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonModalEditCategory;
