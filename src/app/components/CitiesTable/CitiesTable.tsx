"use client";

import { getCities } from '@/app/utils/getCities';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import SearchAutocomplete from '../SearchAutocomplete/SearchAutocomplete';

const CitiesTable = () => {

  const [loading, setLoading] = useState<Boolean>(true);
  const [cities, setCities] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const country = 'India';

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchCities();
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        }
      );

      observer.observe(document.getElementById('bottom-sentinel') as Element);

      return () => {
        observer.disconnect();
      };
    }
  }, [cities]);

  const fetchCities = async () => {
    try {
      const newCities = await getCities(country, offset, limit);
      setCities((prevCities) => {
        // Filter out duplicates based on city name
        const uniqueCities = newCities.filter((newCity: any) => {
          return !prevCities.some((prevCity) => prevCity.ascii_name.toLowerCase() === newCity.ascii_name.toLowerCase());
        });
        return [...prevCities, ...uniqueCities];
      })
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      {
        loading ? <span className='absolute inset-0 w-full h-full backdrop-blur-sm flex justify-center items-center'><LoadingSpinner /></span>
          :
          <div className="max-w-full lg:p-4 md:p-4 sm:p-2 p-2 mx-auto">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                    <div className="">
                      <SearchAutocomplete />
                    </div>

                    <div className="lg:max-h-[65dvh] md:max-h-[65dvh] sm:max-h-[70dvh] max-h-[70dvh] overflow-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="sticky top-0 bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="min-w-max text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Geoname id
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="min-w-max text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  City Name
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="lg:table-cell md:table-cell sm:hidden hidden px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Country Name
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="lg:table-cell md:table-cell sm:hidden hidden px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Country Code
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="lg:table-cell md:table-cell sm:hidden hidden px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Population
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="lg:table-cell md:table-cell sm:hidden hidden px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Timezone
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="lg:table-cell md:table-cell sm:hidden hidden px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                                  Coordinates
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {
                            cities.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <div className="text-sm">
                                        {data.geoname_id}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <Link
                                        target="_blank"
                                        className="min-w-max text-sm text-blue-600 decoration-2 hover:underline"
                                        href={{
                                          pathname: "/weather",
                                          query: {
                                            city: data.ascii_name.toLowerCase()
                                          }
                                        }}
                                      >
                                        {data.ascii_name}
                                      </Link>
                                    </div>
                                  </td>
                                  <td className="lg:table-cell md:table-cell sm:hidden hidden size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <span className="text-sm text-gray-600">
                                        {data.cou_name_en}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="lg:table-cell md:table-cell sm:hidden hidden size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <span className="text-sm text-gray-600">
                                        {data.country_code}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="lg:table-cell md:table-cell sm:hidden hidden size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-rose-100 text-rose-800 rounded-full">
                                        {data.population}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="lg:table-cell md:table-cell sm:hidden hidden size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <div className="flex items-center gap-x-2">
                                        <span className="text-sm text-gray-600">
                                          {data.timezone}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="lg:table-cell md:table-cell sm:hidden hidden size-px whitespace-nowrap">
                                    <div className="px-6 py-2">
                                      <div className="flex items-center gap-x-2">
                                        <span className="text-sm text-gray-600">
                                          {data.coordinates.lon}, {data.coordinates.lat}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                        <tfoot id="bottom-sentinel"></tfoot>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
      }

    </>
  );
};

export default CitiesTable;