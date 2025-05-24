import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";
import { cn } from "@/lib/utils";

const SearchArticles = ({ query, isAdmin = false }: { query?: string; isAdmin?: boolean }) => {
  console.log({ query }, "<---searchArticles");

  return (
    <Form action="/" scroll={false} className="b-amber-500 group relative search w-full flex items-center justify-center">
      <div className="b-violet-500 relative w-full max-w-2xl">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search articles..."
          className={cn("max-w-2xl w-full py-3 pl-11 bg-white  rounded-[6px] outline-none text-slate-900 placeholder:text-sm placeholder-slate-400 placeholderopacity-50 transition-all duration-300", {
            "py-[6px] w-[240px] pl-10 ": isAdmin,
          })}
        />

        <div className={cn("absolute top-[12.5px] right-3", { "top-[8px]": isAdmin })}>{query && <SearchFormReset isAdmin={isAdmin} />}</div>

        <div className={cn("absolute top-[12.5px] left-3", { "top-[10px]": isAdmin })}>
          <button type="submit">
            <Search className={cn("text-slate-400 size-[24px]", { "size-[18px]": isAdmin })} />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchArticles;
