import React from "react";
import SearchArticles from "@/components/SearchArticles";
import { getCategories } from "@/lib/actions/categories.action";
import CategoryTable from "@/components/CategoryTable";
import { CategoryProps } from "@/lib/types";
import ButtonModalAddCategory from "@/components/ButtonModalAddCategory";
import { getUser } from "@/lib/actions/auth.action";
import ButtonPagination from "@/components/ButtonPagination";

const DashboardCategoryPage = async ({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) => {
  const { query, page } = await searchParams;

  const user = await getUser();

  const limit = 10;

  // Get total articles first to calculate totalPages
  const resForTotal = await getCategories(1, limit);
  const categoriesLength = resForTotal.totalData;
  const totalPages = Math.ceil(categoriesLength / limit);
  const currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages));

  const res = await getCategories(currentPage, limit);
  let categories: CategoryProps[] = res.data || [];

  if (query) {
    categories = categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase()));
  }

  // console.log({ query, categories }, "<---dashboardCategoryPage");

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
            <ButtonModalAddCategory user={user} />
          </div>
        </div>

        {/* Table */}
        <div className="b-rose-600">
          <CategoryTable categories={categories} user={user} />
        </div>

        {/* Pagination */}
        {categoriesLength > 10 && (
          <div className="bg-white border-2 border-slate-200 rounded-b-md h-[88px] flex items-center justify-center">
            <ButtonPagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardCategoryPage;
