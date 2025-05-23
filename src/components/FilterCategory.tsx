"use client";

import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryProps } from "@/lib/types";

const FilterCategory = ({ caategories }: { caategories: CategoryProps[] }) => {
  console.log({ caategories }, "<---filterCategory");

  return (
    <div className="w-full max-w-[180px]">
      <Select>
        <SelectTrigger className="w-full bg-white">
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
