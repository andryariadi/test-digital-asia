import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchArticles = ({ query }: { query?: string }) => {
  console.log({ query }, "<---searchArticles");

  return (
    <Form action="/" scroll={false} className="b-amber-500 group relative search w-full flex items-center justify-center">
      <div className="b-violet-500 relative w-full max-w-2xl">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search articles..."
          className={`max-w-2xl w-full py-3 pl-11 bg-white rounded-[6px]
        outline-none text-slate-900 placeholder:text-sm placeholder-slate-400 placeholderopacity-50 transition-all duration-300`}
        />

        <div className="absolute top-[12.5px] right-3">{query && <SearchFormReset />}</div>

        <div className="absolute top-[12.5px] left-3">
          <button type="submit">
            <Search size={24} className="text-slate-400" />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchArticles;
