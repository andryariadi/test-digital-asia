import React from "react";
import { getCategories } from "@/lib/actions/categories.action";
import FilterCategory from "./FilterCategory";
import SearchArticles from "./SearchArticles";

const HeroSection = async ({ query }: { query?: string }) => {
  const res = await getCategories();
  const categories = res.data;

  //   console.log({ res, categories }, "<---heroSection");

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url(/img-background.jpg)] bg-cover bg-center bg-no-repeat"></div>

      {/*Blue Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(37, 99, 235, 0.86)" }}></div>

      {/* Content */}
      <div className="b-pink-600 relative z-10 flex h-full items-center justify-center text-white">
        <div className="b-purple-600 h-[276px] w-full max-w-[730px] space-y-10">
          {/* Title */}
          <div className="b-green-500 flex flex-col items-center justify-center gap-4 text-center">
            <span className="text-base font-bold">Blog genzet</span>
            <h1 className="text-5xl font-medium">The Journal : Design Resources, Interviews, and Industry News</h1>
            <p className="text-2xl font-normal">Your daily dose of design insights!</p>
          </div>

          {/* Filler & Search */}
          <div className="bg-blue-500 py-2 px-3 rounded-[12px] h-[70px] flex items-center gap-[8px]">
            <FilterCategory caategories={categories} />

            {/* Search */}
            <SearchArticles query={query} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
