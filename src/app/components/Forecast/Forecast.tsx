"use client";

import { ForecastData } from '@/app/types/forecast.types';
import { getHourlyForcast } from '@/app/utils/getHourlyForcast';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ForecastProps {
  lat: number;
  lon: number;
}

const Forecast = ({ lat, lon }: ForecastProps) => {

  const [forecastData, setForecastData] = useState<ForecastData>()

  useEffect(() => {
    getHourlyForcast(lat, lon).then((data) => setForecastData(data));
  }, [lat, lon]);

  // console.log(forecastData);

  const formatDate = (dateString: string) => {

    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[monthIndex].slice(0, 3); // Get the three-letter abbreviation of the month name

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const formattedDate = `${day} ${monthName} ${year}`;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return `${formattedDate}, ${formattedTime}`;

  };

  return (
    <>
      <div className="">
        <h1 className='mb-4'>Weather Forecast for <span className="font-medium">{forecastData?.city?.name}</span></h1>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
          {
            forecastData?.list?.map((data, index) => {
              return (
                <div key={index} className="p-3 rounded-xl border relative">
                  <p className='text-gray-600 text-sm'>
                    {formatDate(data?.dt_txt)}
                  </p>
                  <div className="absolute right-1 top-1">
                    <Image src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`} width={300} height={300} className='w-12 h-12' alt='weather-icon' />
                  </div>
                  <p className='capitalize text-sm'>
                    {data?.weather[0]?.description}
                  </p>
                  <p className='text-xl font-light'>
                    {data?.main?.temp}&deg; C
                  </p>
                  <p className='text-sm text-gray-400 font-normal'>
                    Feels like {data?.main?.feels_like}&deg; C
                  </p>
                  <p className='text-sm text-gray-400 font-normal'>
                    Humidity {data?.main?.humidity} %
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Forecast