import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex-1 px-6 py-4">
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full outline-none text-[15px] text-gray-900 bg-transparent font-medium placeholder:text-gray-400 border-b border-gray-200 pb-1 focus:border-sea-green-600 transition-colors"
          />
        </div>
        <div className="p-4 flex-shrink-0">
          <button className="w-[46px] h-[46px] bg-sea-green-600 hover:bg-sea-green-700 text-white transition-colors duration-200 flex items-center justify-center rounded-xl">
            <SearchIcon className="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;