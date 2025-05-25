"use client";

import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryProps } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FilterCategory = ({ caategories, isAdmin = false }: { caategories: CategoryProps[]; isAdmin?: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full md:max-w-[180px]">
      <Select value={selectedCategory} onValueChange={handleChange}>
        <SelectTrigger className={cn("w-full bg-white", { "data-[size=default]:h-9": isAdmin })}>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>{" "}
            <SelectItem key="all" value="all">
              All
            </SelectItem>
            {caategories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterCategory;
