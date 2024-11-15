import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { countries } from './countriesData';

const CountrySelector = ({ selectedCountry, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 
          dark:hover:bg-gray-800 transition-colors"
      >
        <img
          src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
          alt={selectedCountry.name}
          className="w-5 h-auto"
        />
        <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-72 bg-white dark:bg-gray-900 rounded-md shadow-lg 
          border dark:border-gray-700 max-h-96 overflow-hidden">
          <div className="p-2 border-b dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-72">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 
                  dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-5 h-auto"
                />
                <span className="text-sm">{country.name}</span>
                <span className="text-sm text-gray-500 ml-auto">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector; 