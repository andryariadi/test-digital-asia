"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CategoryProps } from "@/lib/types";
import { ArrowLeft, Loader, ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleFormValidation } from "@/lib/validations";
import InputField from "./InputField";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";

const ArticleForm = ({ onCancel, categories }: { onCancel: () => void; categories: CategoryProps[] }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<z.infer<typeof ArticleFormValidation>>({
    resolver: zodResolver(ArticleFormValidation),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      setValue("imageUrl", null);
      setPreviewImage(null);
      return;
    }

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setValue("imageUrl", null);
      setPreviewImage(null);
      return;
    }

    // Set preview gambar
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set value untuk form
    setValue("imageUrl", file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("imageUrl", null);
  };

  const handleSubmitArticle: SubmitHandler<z.infer<typeof ArticleFormValidation>> = async (data) => {
    console.log({ data }, "<---registerForm");
  };

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <div>
        {/* Header */}
        <div className="pb-8">
          <div className="flex items-center gap-2 text-base font-medium text-slate-900">
            <button onClick={onCancel}>
              <ArrowLeft size={20} />
            </button>
            <h1>Create Articles</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleSubmitArticle)} className="b-sky-700 space-y-7">
          {/* Image Upload Field */}
          <div className="relative flex flex-col gap-2">
            <span className="font-semibold text-gray-700">Thumbnails</span>

            <input type="file" id="image" className="sr-only" accept="image/jpeg, image/png" {...register("imageUrl")} onChange={handleImageChange} />

            <label
              htmlFor="image"
              className={`bg-white bg-opacity-50 h-[163px] w-[223px] rounded-lg border border-dashed ${
                errors.imageUrl ? "border-red-500" : "border-slate-300"
              } flex flex-col items-center justify-center gap-3 cursor-pointer text-gray-500 text-sm p-3 relative overflow-hidden`}
            >
              {previewImage ? (
                <>
                  <div className="absolute inset-0 w-full h-full">
                    <Image src={previewImage} alt="Preview" fill className="object-cover rounded-lg" unoptimized />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 z-10"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <ImagePlus size={20} />
                  <div className="flex flex-col items-center justify-center gap-1 text-xs font-normal text-slate-500">
                    <span>Click to select file</span>
                    <span>Support File Type: jpg or png</span>
                    <span>Max Size: 2MB</span>
                  </div>
                </>
              )}
            </label>

            {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message as string}</p>}
          </div>

          {/* Title Field */}
          <div className="relative">
            <InputField type="text" label="Title" placeholder="Title" name="title" propData={{ ...register("title") }} isArticleForm={true} />
            {errors.title && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.title.message as string}</p>}
          </div>

          {/* Category Field */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold text-gray-700">
              Category
            </label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.category && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.category.message as string}</p>}
          </div>

          {/* Content Field */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold text-gray-700">
              Content
            </label>

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  preview="edit"
                  height={575}
                  style={{ borderRadius: 12, overflow: "hidden", backgroundColor: "white", color: "#020617" }}
                  textareaProps={{
                    placeholder: "Write your content here...",
                  }}
                  previewOptions={{
                    disallowedElements: ["style"],
                  }}
                />
              )}
            />

            {errors.category && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.category.message as string}</p>}
          </div>

          <motion.button
            className="py-3 px-4 mt-3 w-full bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-70"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader className="animate-spin mx-auto" size={22} /> : "Create Article"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default ArticleForm;
