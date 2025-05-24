import React from "react";
import SearchArticles from "@/components/SearchArticles";
import { getCategories } from "@/lib/actions/categories.action";
import { Plus } from "lucide-react";
import CategoryTable from "@/components/CategoryTable";
import { CategoryProps } from "@/lib/types";

const DashboardCategoryPage = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await searchParams;

  const res = await getCategories();
  let categories: CategoryProps[] = res.data || [];

  const categoriesLength = res.data.length;

  if (query) {
    categories = categories.filter((article) => article.name.toLowerCase() === query.toLowerCase());
  }

  console.log({ query, categories }, "<---dashboardCategoryPage");

  return (
    <main className="b-fuchsia-500 min-h-screen pt-[100px] p-6">
      <div className="b-amber-500">
        {/* Top */}
        <div className="b-rose-500 rounded-t-md overflow-hidden">
          {/* Total Category */}
          <div className="bg-white p-6 border-b-2 border-slate-200">
            <span>Total Category: {categoriesLength}</span>
          </div>

          {/* Action Button */}
          <div className="bg-white p-6 flex items-center justify-between border-b-2 border-slate-200">
            {/* Search */}
            <div className="b-rose-600 flex items-center gap-2">
              <SearchArticles query={query} isAdmin={true} isCategory={true} action="/dashboard-category" placeholder="Search category..." />
            </div>

            {/* Button Create */}
            {/* <div className="bg-purple-600"> */}
            <button className="flex items-center gap-2 py-3 px-4 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300" type="submit">
              <Plus size={20} className="text-slate-50" />
              <span className="text-sm text-slate-50 font-medium">Add Category</span>
            </button>
            {/* </div> */}
          </div>
        </div>

        {/* Table */}
        <div className="b-rose-600">
          <CategoryTable categories={categories} />
        </div>
      </div>
    </main>
  );
};

export default DashboardCategoryPage;
