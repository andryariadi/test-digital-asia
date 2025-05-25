"use client";

import React, { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import InputField from "./InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValidation } from "@/lib/validations";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { createCategory } from "@/lib/actions/categories.action";
import { UserProps } from "@/lib/types";

const ButtonModalAddCategory = ({ user }: { user: UserProps }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof CategoryFormValidation>>({
    resolver: zodResolver(CategoryFormValidation),
    mode: "onChange",
  });

  const handleSubmitCategory: SubmitHandler<z.infer<typeof CategoryFormValidation>> = async (data) => {
    console.log({ data }, "<---handleSubmitCategory");

    try {
      const newCategory = {
        name: data.name,
        userId: user.id,
      };
      const res = await createCategory(newCategory);

      console.log({ res }, "<---createCategory");
      if (res) {
        reset();

        setOpen(false);

        toast.success("Category created successfully", {
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 py-3 px-4 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300" type="button">
          <Plus size={20} className="text-slate-50" />
          <span className="text-sm text-slate-50 font-medium">Add Category</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit(handleSubmitCategory)} className="b-purple-500 space-y-12">
          <AlertDialogHeader className="b-amber-500 gap-8">
            <AlertDialogTitle>Add Category</AlertDialogTitle>

            <AlertDialogDescription>
              {/* Input */}
              <div className="relative">
                <InputField type="text" label="Category" placeholder="Category" name="name" propData={{ ...register("name") }} isArticleForm={true} />
                {errors.name && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.name.message as string}</p>}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => reset()} className="h-10">
              Cancel
            </AlertDialogCancel>

            <motion.button
              type="submit" // ← Ini submit button yang sebenarnya
              className="h-10 w-[50px] bg-gradient-to-r from-blue-500 to-sky-600 text-slate-50 text-sm font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-70"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className="animate-spin mx-auto" size={22} /> : "Add"}
            </motion.button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonModalAddCategory;
