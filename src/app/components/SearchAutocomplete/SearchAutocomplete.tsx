"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CitiesJsonData } from '@/app/constants/cities';

const SearchAutocomplete = () => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);

  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = searchQuery.trim() === "" ? [] : CitiesJsonData.filter((city: any) => city.toLowerCase().includes(searchQuery.toLowerCase()));


  const handleOutsideClick = (e: MouseEvent) => {
    if (autoCompleteRef.current
      && inputRef.current
      && !autoCompleteRef.current.contains(e.target as Node)
      && !inputRef.current.contains(e.target as Node)) {
      setShowAutoComplete(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <>
      <div className="w-full relative p-3">

        <div className="relative lg:w-fit md:w-80">
          <label
            htmlFor="hs-as-table-product-review-search"
            className="sr-only"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              ref={inputRef}
              id="search"
              name="search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowAutoComplete(true) }}
              className="py-2 px-3 w-full outline-none border-2 ps-11 block border-gray-200 rounded-lg text-sm focus:border-slate-500 focus:ring-slate-500 disabled:opacity-50 disabled:pointer-events-none relative"
              placeholder="Search city"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
              <svg
                className="flex-shrink-0 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <AnimatePresence>
            {showAutoComplete && searchQuery !== "" && (
              <motion.div
                ref={autoCompleteRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full max-h-40 overflow-auto bg-gray-50  rounded-lg shadow-lg z-10 p-2 mt-2"
              >

                {
                  filteredCities.length > 0 ? (
                    <ul className='flex flex-col gap-1'>
                      {filteredCities.map((city: any, index: number) => {
                        return (
                          <Link href={`/weather/${city?.toLowerCase()}`} key={index} className='px-2 py-1 text-gray-800 hover:bg-gray-300 rounded-md'>
                            {city}
                          </Link>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className="p-1 italic text-gray-600">No city found</p>
                  )
                }
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default SearchAutocomplete