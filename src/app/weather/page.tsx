"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getWeather } from '../utils/getWeather';
import { WeatherData } from '../types/weather.types';
import Image from 'next/image';
import Forecast from '../components/Forecast/Forecast';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const WeatherPage = () => {

  const city: any = useSearchParams().get("city");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    getWeather(city).then((data) => setWeatherData(data));
    setLoading(false);
  }, []);

  return (
    <>
      {
        loading || !weatherData ?

          <span className='absolute inset-0 w-full h-full backdrop-blur-sm flex justify-center items-center'><LoadingSpinner /></span> :
          Number(weatherData?.cod) === 404 ?

            <>
              <div className="size-full overflow-x-hidden overflow-y-auto">
                <div className="ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                  <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden">
                    <div className="p-4 sm:p-10 overflow-y-auto">
                      <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col items-center gap-4 md:gap-7">
                        {/* Icon */}
                        <span className="flex-shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500">
                          <svg
                            className="flex-shrink-0 size-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                          </svg>
                        </span>
                        {/* End Icon */}
                        <div className="grow">
                          <h3 className="mb-2 text-xl md:text-left text-center font-light text-gray-800">
                            No data available for city: <span className="font-semibold">{city}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>


            :
            <div className="mx-auto w-11/12 grid lg:grid-cols-2 lg:gap-10 md:gap-8 sm:gap-6 gap-6 md:my-10 my-4">
              <div className="p-6 rounded-2xl shadow-xl bg-white h-fit">
                <div className="">
                  <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between">

                    <div className="flex flex-col gap-4">
                      <div className="">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {weatherData?.name}, {weatherData?.sys?.country}
                        </h1>
                        <span className='text-gray-500'>{new Date().toDateString()}</span>
                      </div>
                      <span className="flex flex-col text-6xl font-extralight mt-4">
                        <span className="text-sm italic font-light text-gray-400">Temperature</span>
                        {weatherData?.main?.temp}&deg; C
                      </span>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-6">
                          <span>max {weatherData?.main?.temp_max}&deg; C</span>
                          <span>min {weatherData?.main?.temp_min}&deg; C</span>
                        </div>
                        <div className="">
                          <p className='text-sm text-gray-600'>
                            Feels like {weatherData?.main?.feels_like}&deg; C
                          </p>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 mt-2">
                          <p className='flex flex-col text-sm text-gray-600'>
                            <span>Wind</span>
                            <span className="font-semibold">{weatherData?.wind?.speed} m/s</span>
                          </p>
                          <p className='flex flex-col text-sm text-gray-600'>
                            <span>Humidity</span>
                            <span className="font-semibold">{weatherData?.main?.humidity} %</span>
                          </p>
                          <p className='flex flex-col text-sm text-gray-600'>
                            <span>Pressure</span>
                            <span className="font-semibold">{weatherData?.main?.pressure} hPa</span>
                          </p>
                          <p className='flex flex-col text-sm text-gray-600'>
                            <span>Visibility</span>
                            <span className="font-semibold">{(weatherData?.visibility / 1000).toFixed(2)} Km</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex justify-center items-center rounded-3xl overflow-hidden shadow-xl">
                        <picture>
                          <Image priority src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`} width={800} height={800} className="w-40 h-40 select-none" alt='weather-desc-icon' />
                          <figcaption className="capitalize border-t p-2 text-center">
                            {weatherData?.weather[0]?.description}
                          </figcaption>
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl shadow-xl bg-white">
                <Forecast lat={weatherData?.coord?.lat!} lon={weatherData?.coord?.lon!} />
              </div>
            </div>
      }
    </>
  )
}

export default WeatherPage