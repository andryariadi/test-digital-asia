"use client";

import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryProps } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const FilterCategory = ({ caategories }: { caategories: CategoryProps[] }) => {
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

  console.log({ caategories }, "<---filterCategory");

  return (
    <div className="w-full max-w-[180px]">
      <Select value={selectedCategory} onValueChange={handleChange}>
        <SelectTrigger className="w-full bg-white data-[size=default]:h-9">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
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
