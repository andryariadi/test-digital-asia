"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CategoryProps, UserProps } from "@/lib/types";
import { ArrowLeft, Loader, ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleFormValidation } from "@/lib/validations";
import InputField from "./InputField";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { createArticle, getArticle, updateArticle, uploadImg } from "@/lib/actions/articles.action";

const ArticleForm = ({ onCancel, user, categories, articleId }: { onCancel: () => void; user: UserProps; categories: CategoryProps[]; articleId?: string | null }) => {
  console.log({ articleId }, "<---articleForm");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    category: string;
    content: string;
    imageUrl: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    trigger,
    clearErrors,
    getValues,
  } = useForm<z.infer<typeof ArticleFormValidation>>({
    resolver: zodResolver(ArticleFormValidation),
    defaultValues: {
      imageUrl: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const article = await getArticle(articleId);

          console.log({ article }, "<---fetchArticle");

          if (article) {
            setValue("title", article.title);
            setValue("category", article.category.name);
            setValue("content", article.content);
            if (article.imageUrl) {
              setPreviewImage(article.imageUrl);
              setValue("imageUrl", article.imageUrl);
            }
            setIsEditing(true);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };
      fetchArticle();
    }
  }, [articleId, setValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
          setValue("imageUrl", reader.result, { shouldValidate: true });
          await trigger("imageUrl");
          clearErrors("imageUrl");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = async () => {
    setPreviewImage(null);
    setValue("imageUrl", "", { shouldValidate: true });
    await trigger("imageUrl");
  };

  const handlePreview = () => {
    const values = getValues();
    setPreviewData({
      title: values.title,
      category: values.category,
      content: values.content,
      imageUrl: previewImage || "",
    });
    setIsPreviewMode(true);
  };

  const exitPreviewMode = () => {
    setIsPreviewMode(false);
  };

  const handleSubmitArticle: SubmitHandler<z.infer<typeof ArticleFormValidation>> = async (data) => {
    try {
      let imgUrl = previewImage || "";
      // "!previewImage.startsWith('http')" checking is important to avoid errors when updating new data
      if (previewImage && !previewImage.startsWith("http")) {
        const base64Response = await fetch(previewImage);
        const blob = await base64Response.blob();
        const file = new File([blob], "article-image", { type: blob.type });
        const uploadResponse = await uploadImg(file);
        imgUrl = uploadResponse.imageUrl;
      }

      // Important don't forget to convert it to "id"
      const selectedCategory = categories.find((cat) => cat.name === data.category);
      if (!selectedCategory) {
        throw new Error("Selected category not found");
      }

      const articleData = {
        title: data.title,
        categoryId: selectedCategory.id, // Using the id of the selected category
        content: data.content,
        imageUrl: imgUrl,
        userId: user.id,
      };

      if (isEditing && articleId) {
        const res = await updateArticle(articleId, articleData);
        if (res) {
          toast.success("Article updated successfully", {
            style: toastStyle,
          });
        }
      } else {
        const res = await createArticle(articleData);
        if (res) {
          toast.success("Article created successfully", {
            style: toastStyle,
          });
        }
      }

      onCancel();
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
    <section className="bg-gray-50 p-6 rounded-lg shadow-lg">
      {isPreviewMode ? (
        /* PREVIEW MODE */
        <div className="space-y-6 b-rose-500">
          {/* Header */}
          <div className="flex items-center gap-2 text-base font-medium text-slate-900">
            <button onClick={exitPreviewMode}>
              <ArrowLeft size={20} />
            </button>
            <h1>Article Preview</h1>
          </div>

          {/* Title & Category */}
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold capitalize">{previewData?.title}</h1>
            <span className="text-sm text-gray-500">{previewData?.category}</span>
          </div>

          {/* Image */}
          {previewData?.imageUrl && (
            <div className="relative h-[350px] w-full rounded-lg overflow-hidden">
              <Image src={previewData.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
            </div>
          )}

          {/* Description */}
          <p>{previewData?.content}</p>

          {/* Preview Markdown Content */}
          <div className="prose max-w-none">
            <MDEditor.Markdown source={previewData?.content || ""} style={{ backgroundColor: "transparent", color: "#1f2937" }} />
          </div>
        </div>
      ) : (
        /* CREATE MODE */
        <div>
          <div className="pb-8">
            <div className="flex items-center gap-2 text-base font-medium text-slate-900">
              <button onClick={onCancel}>
                <ArrowLeft size={20} />
              </button>
              <h1>{isEditing ? "Edit Article" : "Create  Article"}</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleSubmitArticle)} className="b-sky-700 space-y-7">
            <div className="relative flex flex-col gap-2">
              <span className="font-semibold text-gray-700">Thumbnails</span>
              <input type="file" id="image" className="sr-only" accept="image/jpeg, image/png" onChange={handleImageChange} />
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
                      onClick={async (e) => {
                        e.stopPropagation();
                        await removeImage();
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
                      <span className="underline">Click to select file</span>
                      <span>Support File Type: jpg or png</span>
                    </div>
                  </>
                )}
              </label>
              {errors.imageUrl && <p className="text-red-500 text-sm animate-fadeIn">{errors.imageUrl.message as string}</p>}
            </div>

            <div className="relative">
              <InputField type="text" label="Title" placeholder="Title" name="title" propData={{ ...register("title") }} isArticleForm={true} />
              {errors.title && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.title.message as string}</p>}
            </div>

            <div className="relative flex flex-col gap-2">
              <label htmlFor="category" className="font-semibold text-gray-700">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
              {errors.category && (
                <p className="absolute -bottom-5 text-red-500 text-sm">
                  Category is <span className="lowercase">{errors.category.message as string}</span>
                </p>
              )}
            </div>

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
              {errors.content && (
                <p className="absolute -bottom-5 text-red-500 text-sm">
                  Content is <span className="lowercase">{errors.content.message as string}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <motion.button
                type="button"
                className="py-3 px-4 mt-3 w-max bg-white text-slate-900 text-sm font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
              >
                Cancel
              </motion.button>

              <motion.button
                type="button"
                className="py-3 px-4 mt-3 w-max bg-slate-200 text-slate-900 text-sm font-medium rounded-lg shadow-lg hover:bg-slate-300 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePreview}
                disabled={isSubmitting}
              >
                Preview
              </motion.button>

              <motion.button
                className="py-3 px-4 mt-3 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-slate-50 text-sm font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-70"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="animate-spin mx-auto" size={22} /> : "Upload"}
              </motion.button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default ArticleForm;
