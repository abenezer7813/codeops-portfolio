"use client";

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";

function SearchBox({onSearch}) {

  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-red-800 focus-within:ring-2 focus-within:ring-red-100">
        <IoSearch className="text-xl text-gray-400" />

        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search dishes..."
          className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>

     
    </div>
  );
}

export default SearchBox;