// src/components/weather/WeatherWidget.tsx

'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, SunIcon, CloudIcon, CloudRainIcon, WindIcon } from '@heroicons/react/24/outline';
import { Disclosure, Transition } from '@headlessui/react';

interface WeatherWidgetProps {
  facilityId: string;
  facilityName: string;
  isOutdoor: boolean;
  sportType: string;
  bookingDate?: string;
}

export default function WeatherWidget({ facilityId, facilityName, isOutdoor, sportType, bookingDate }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alternativeFacilities, setAlternativeFacilities] = useState<any[]>([]);
  const [suitabilityScore, setSuitabilityScore] = useState<number>(0);
  
  // In a real application, this would fetch from an API
  useEffect(() => {
    // Mock weather data
    setTimeout(() => {
      setWeatherData({
        currentConditions: {
          temperature: 28,
          humidity: 75,
          windSpeed: 12,
          precipitation: 0.2,
          weatherCode: 'partly-cloudy',
          description: 'Partly cloudy with a chance of rain'
        },
        forecast: [
          {
            datetime: '2025-04-13T12:00:00',
            temperature: 29,
            humidity: 70,
            windSpeed: 10,
            precipitation: 0.1,
            weatherCode: 'partly-cloudy',
            description: 'Partly cloudy'
          },
          {
            datetime: '2025-04-13T15:00:00',
            temperature: 30,
            humidity: 65,
            windSpeed: 8,
            precipitation: 0.4,
            weatherCode: 'rain',
            description: 'Light rain'
          },
          {
            datetime: '2025-04-13T18:00:00',
            temperature: 27,
            humidity: 80,
            windSpeed: 15,
            precipitation: 0.7,
            weatherCode: 'rain',
            description: 'Moderate rain'
          }
        ]
      });
      
      // Mock alternatives
      setAlternativeFacilities([
        {
          id: 'alt-1',
          name: 'Indoor Sports Center',
          distance: 2.5,
          suitabilityScore: 95,
          availabilityStatus: true,
          imageUrl: 'https://images.unsplash.com/photo-1505666287802-931dc83a0dc4',
          sportTypes: ['Basketball', 'Badminton', sportType],
          price: 'Rs. 3,000/hr'
        },
        {
          id: 'alt-2',
          name: 'City Sports Complex',
          distance: 4.8,
          suitabilityScore: 90,
          availabilityStatus: true,
          imageUrl: 'https://images.unsplash.com/photo-1534860741060-ee15f0438609',
          sportTypes: [sportType],
          price: 'Rs. 3,500/hr'
        }
      ]);
      
      // Set suitability score - would be calculated based on weather conditions
      setSuitabilityScore(isOutdoor ? 65 : 95);
      
      setIsLoading(false);
    }, 1000);
  }, [facilityId, isOutdoor, sportType]);
  
  const getWeatherIcon = (weatherCode: string) => {
    switch(weatherCode) {
      case 'sunny':
        return <SunIcon className="h-8 w-8 text-amber-500" />;
      case 'partly-cloudy':
        return <CloudIcon className="h-8 w-8 text-gray-400" />;
      case 'rain':
        return <CloudRainIcon className="h-8 w-8 text-blue-500" />;
      default:
        return <CloudIcon className="h-8 w-8 text-gray-400" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-50 rounded-lg p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  if (!isOutdoor) {
    return (
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-800">Indoor Facility</h3>
            <p className="text-sm text-green-600">This facility is not affected by weather conditions.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Weather Conditions</h3>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex items-center mb-3 md:mb-0">
            {getWeatherIcon(weatherData.currentConditions.weatherCode)}
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-800">{weatherData.currentConditions.temperature}°C</p>
              <p className="text-sm text-gray-600">{weatherData.currentConditions.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center bg-blue-50 rounded-full h-10 w-10 mx-auto mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">Precipitation</p>
              <p className="font-medium">{weatherData.currentConditions.precipitation} mm</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center bg-blue-50 rounded-full h-10 w-10 mx-auto mb-1">
                <WindIcon className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-medium">{weatherData.currentConditions.windSpeed} km/h</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center bg-blue-50 rounded-full h-10 w-10 mx-auto mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-medium">{weatherData.currentConditions.humidity}%</p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-lg p-4 mb-4 ${
          suitabilityScore >= 80 ? 'bg-green-50 border border-green-100' :
          suitabilityScore >= 50 ? 'bg-yellow-50 border border-yellow-100' :
          'bg-red-50 border border-red-100'
        }`}>
          <div className="flex items-center">
            <div className={`rounded-full h-12 w-12 flex items-center justify-center ${
              suitabilityScore >= 80 ? 'bg-green-100 text-green-600' :
              suitabilityScore >= 50 ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}>
              <span className="font-bold">{suitabilityScore}%</span>
            </div>
            <div className="ml-4">
              <h4 className={`font-medium ${
                suitabilityScore >= 80 ? 'text-green-800' :
                suitabilityScore >= 50 ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {suitabilityScore >= 80 ? 'Excellent Playing Conditions' :
                 suitabilityScore >= 50 ? 'Acceptable Playing Conditions' :
                 'Poor Playing Conditions'}
              </h4>
              <p className={`text-sm ${
                suitabilityScore >= 80 ? 'text-green-600' :
                suitabilityScore >= 50 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {suitabilityScore >= 80 ? 'Weather is perfect for playing ' + sportType :
                 suitabilityScore >= 50 ? 'Weather might affect gameplay, but still playable' :
                 'Weather conditions may significantly impact gameplay'}
              </p>
            </div>
          </div>
        </div>
        
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                <span>Weather Forecast</span>
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {weatherData.forecast.map((forecast: any, index: number) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-4 text-center"
                      >
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          {new Date(forecast.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        <div className="flex justify-center mb-2">
                          {getWeatherIcon(forecast.weatherCode)}
                        </div>
                        <p className="text-xl font-bold text-gray-800">{forecast.temperature}°C</p>
                        <p className="text-xs text-gray-500 mt-1">{forecast.description}</p>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>💧 {forecast.precipitation}mm</span>
                          <span>💨 {forecast.windSpeed}km/h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      
      {suitabilityScore < 70 && alternativeFacilities.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Indoor Alternatives</h3>
            <p className="text-sm text-gray-600 mb-4">
              Due to weather conditions, consider these indoor facilities for your {sportType} session:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternativeFacilities.map((facility) => (
                <div 
                  key={facility.id}
                  className="border border-gray-200 rounded-lg overflow-hidden flex hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-24 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${facility.imageUrl})` }}></div>
                  <div className="flex-1 p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{facility.name}</h4>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {facility.suitabilityScore}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{facility.distance} km away</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {facility.sportTypes.map((sport: string, i: number) => (
                          <span 
                            key={i}
                            className="inline-block bg-primary-50 text-primary-700 text-xs px-1.5 py-0.5 rounded"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium">{facility.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
              Browse All Indoor Alternatives
            </button>
          </div>
        </div>
      )}
    </div>
  );
}