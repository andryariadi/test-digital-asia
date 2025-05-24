import React from "react";
import FilterCategory from "@/components/FilterCategory";
import SearchArticles from "@/components/SearchArticles";
import { getArticles } from "@/lib/actions/articles.action";
import { getCategories } from "@/lib/actions/categories.action";
import { Plus } from "lucide-react";
import ArticlesTable from "@/components/ArticlesTable";

const DashboardArticlesPage = async ({ searchParams }: { searchParams: Promise<{ query?: string; category?: string }> }) => {
  const { query, category } = await searchParams;

  const { data: articles, total } = await getArticles();
  const { data: categories } = await getCategories();

  console.log({ query, category, articles, categories }, "<---dashboardArticlesPage");

  return (
    <main className="b-fuchsia-500 min-h-screen pt-[100px] p-6">
      <div className="b-amber-500">
        {/* Top */}
        <div className="b-rose-500 rounded-t-md overflow-hidden">
          {/* Total Articles */}
          <div className="bg-white p-6 border-b-2 border-slate-200">
            <span>Total Articles: {total}</span>
          </div>

          {/* Action Button */}
          <div className="bg-white p-6 flex items-center justify-between border-b-2 border-slate-200">
            {/* Filter & Search */}
            <div className="b-rose-600 flex items-center gap-2">
              <FilterCategory caategories={categories} />

              <SearchArticles query={query} isAdmin={true} />
            </div>

            {/* Button Create */}
            {/* <div className="bg-purple-600"> */}
            <button className="flex items-center gap-2 py-3 px-4 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300" type="submit">
              <Plus size={20} className="text-slate-50" />
              <span className="text-sm text-slate-50 font-medium">Add Articles</span>
            </button>
            {/* </div> */}
          </div>
        </div>

        {/* Table */}
        <div className="b-rose-600">
          <ArticlesTable articles={articles} />
        </div>
      </div>
    </main>
  );
};

export default DashboardArticlesPage;
