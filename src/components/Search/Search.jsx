import React from 'react';
import { User, Calendar, MapPin, Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        {/* Doctor Search */}
        <div className="flex items-center w-full sm:w-auto sm:flex-1 p-2 group border-b sm:border-b-0 sm:border-r border-gray-200">
          <User className="w-5 h-5 text-sea-green-600 mr-2" />
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-500 font-medium">Doctors</label>
            <input 
              type="text" 
              placeholder="Dr. Brett Herman"
              className="outline-none text-sm text-gray-700 placeholder-gray-400 w-full bg-transparent"
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex items-center w-full sm:w-auto sm:flex-1 p-2 group border-b sm:border-b-0 sm:border-r border-gray-200">
          <Calendar className="w-5 h-5 text-sea-green-600 mr-2" />
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-500 font-medium">Date</label>
            <input 
              type="text" 
              placeholder="30 September 2024"
              className="outline-none text-sm text-gray-700 placeholder-gray-400 w-full bg-transparent"
            />
          </div>
        </div>

        {/* Location Search */}
        <div className="flex items-center w-full sm:w-auto sm:flex-1 p-2 group border-b sm:border-b-0 sm:border-r border-gray-200">
          <MapPin className="w-5 h-5 text-sea-green-600 mr-2" />
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-500 font-medium">Place</label>
            <input 
              type="text" 
              placeholder="Yogyakarta"
              className="outline-none text-sm text-gray-700 placeholder-gray-400 w-full bg-transparent"
            />
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 bg-sea-green-600 hover:bg-sea-green-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Search; 