
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Part 1: Header, Layout, and Weather Alert components

export default function FacilityPage() {
  // States for view mode, weather alert, and facility data
  const [isMapView, setIsMapView] = useState(false);
  const [weatherAlert, setWeatherAlert] = useState(true);
  const [facilityData, setFacilityData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch facility data when component mounts
  useEffect(() => {
    // This would be replaced with your actual API call
    const fetchFacilityData = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Mock data - replace with actual API response
          setFacilityData({
            id: 'facility-1',
            name: 'Premadasa Cricket Stadium',
            location: 'Colombo',
            description: 'One of Sri Lanka\'s premier cricket stadiums, offering world-class facilities for matches and practice sessions.',
            sportTypes: [{ name: 'Cricket' }],
            imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
            price: 'Rs. 15,000/hr',
            rating: 4.9,
            reviewCount: 128,
            amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'Flood Lights', 'Seating'],
            indoor: false,
            weatherScore: 75,
            availability: [
              { date: '2025-04-15', slots: ['09:00', '11:00', '13:00', '15:00'] },
              { date: '2025-04-16', slots: ['09:00', '11:00', '13:00', '15:00', '17:00'] },
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching facility data:', error);
        setLoading(false);
      }
    };

    fetchFacilityData();
  }, []);

  // --- START OF RETURN STATEMENT ---
  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-sports-pattern opacity-10 z-0"></div>

      {/* Decorative blobs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Enhanced Header with gradient and pattern */}
      <div className="relative bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 py-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-sports-pattern"></div>
        </div>

        {/* Sports equipment outline decorations */}
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-white/10 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-20 w-16 h-16 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-8 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-1000"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="animate-fade-in-down">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white inline-block mb-4 backdrop-blur-sm">
                FACILITY DETAILS
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {/* Use optional chaining and provide a fallback */}
                {loading ? 'Loading...' : facilityData?.name ?? 'Facility Name'}
              </h1>

              {/* Animated divider */}
              <div className="relative flex py-5 items-center justify-start">
                <div className="w-16 h-1 bg-secondary-500 rounded-full animate-pulse-slow"></div>
                <div className="w-3 h-3 mx-2 bg-secondary-400 rounded-full"></div>
                <div className="w-24 h-1 bg-secondary-500 rounded-full animate-pulse-slow animation-delay-200"></div>
              </div>

              <p className="mt-2 text-lg text-white/90 max-w-xl animate-fade-in-up animation-delay-300">
                 {/* Use optional chaining and provide a fallback */}
                {loading ? 'Loading facility details...' : facilityData?.description ?? 'Facility description loading...'}
              </p>
            </div>

            <div className="flex mt-6 md:mt-0 bg-white/10 p-1 rounded-xl backdrop-blur-sm shadow-lg">
              <button
                onClick={() => setIsMapView(false)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-300 ${!isMapView ? 'bg-white text-primary-700 shadow-md' : 'bg-transparent text-white hover:bg-white/10'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Facility Details
              </button>
              <button
                onClick={() => setIsMapView(true)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-300 ${isMapView ? 'bg-white text-primary-700 shadow-md' : 'bg-transparent text-white hover:bg-white/10'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Location
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Weather Alert Banner */}
      {weatherAlert && (
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 border-t border-b border-amber-200 shadow-inner">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 shadow-inner animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-amber-800">
                    Weather Notice for This Facility
                  </p>
                  <p className="text-sm text-amber-700">
                    Light rain is forecasted tomorrow for this venue. The facility has covered areas and drainage systems to minimize disruption.
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => setWeatherAlert(false)}
                  className="flex-shrink-0 flex text-amber-500 hover:text-amber-700 focus:outline-none p-1 rounded-full hover:bg-amber-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main container for the rest of the content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Loading state */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Facility Details</h2>
            <p className="text-gray-600">Please wait while we fetch the latest information...</p>
          </div>
        ) : (
          // *** CHANGE: Use Fragment to wrap multiple sections in the 'else' block ***
          <>
            {/* Check if facilityData exists before trying to render it */}
            {facilityData && (
              <>
                {/* *** CHANGE: Start Grid for Parts 2 & 3 *** */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                  {/* Part 2: Facility Overview and Gallery Section (Left Column) */}
                  {/* *** CHANGE: This is now lg:col-span-2 *** */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Image Gallery */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
                      <div className="relative">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                          <img
                            src={facilityData.imageUrl}
                            alt={facilityData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Overlay for sport type and weather */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                          {facilityData.sportTypes.map((sport, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-md border border-primary-100"
                            >
                              {sport.name}
                            </span>
                          ))}
                        </div>

                        {/* Weather suitability indicator */}
                        <div className="absolute top-4 right-4">
                          <div
                            className={`flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-100 space-x-1.5 ${
                              facilityData.weatherScore >= 80
                                ? 'text-green-700'
                                : facilityData.weatherScore >= 50
                                ? 'text-amber-700'
                                : 'text-red-700'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            <span className="text-xs font-medium">
                              {facilityData.weatherScore}% Suitable
                            </span>
                          </div>
                        </div>

                        {/* Bottom action bar */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:text-primary-600 transition-colors shadow-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:text-primary-600 transition-colors shadow-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex space-x-2">
                            <button className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-primary-700 hover:bg-primary-50 transition-colors shadow-md text-sm font-medium flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              View More Photos
                            </button>

                            <button className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-primary-700 hover:bg-primary-50 transition-colors shadow-md text-sm font-medium flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Virtual Tour
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Thumbnails row */}
                      <div className="grid grid-cols-5 gap-2 bg-gray-50 p-4 border-t border-gray-100">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div
                            key={item}
                            className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden border-2 border-white cursor-pointer hover:border-primary-400 transition-colors shadow-sm"
                          >
                            <img
                              src={facilityData.imageUrl}
                              alt={`Gallery thumbnail ${item}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details Tabs */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
                      <div className="border-b border-gray-200">
                        <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
                          <button className="py-4 px-6 border-b-2 border-primary-500 text-primary-600 font-medium text-sm whitespace-nowrap">
                            Overview
                          </button>
                          <button className="py-4 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                            Reviews
                          </button>
                          <button className="py-4 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                            Amenities
                          </button>
                          <button className="py-4 px-6 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                            Rules & Policies
                          </button>
                        </nav>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-gray-900">About This Facility</h2>
                              <p className="text-sm text-gray-500">All the essential information</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div className="flex mr-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="h-5 w-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">
                              <span className="font-bold">{facilityData.rating}</span>{" "}
                              <span className="text-gray-500">({facilityData.reviewCount} reviews)</span>
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Location</h3>
                                <p className="mt-1 text-sm text-gray-600">{facilityData.location}</p>
                                <a href="#" className="mt-1 text-sm text-primary-600 hover:text-primary-700 flex items-center">
                                  Get directions
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Hours</h3>
                                <p className="mt-1 text-sm text-gray-600">Open daily from 6:00 AM to 10:00 PM</p>
                                <p className="mt-1 text-sm text-green-600 font-medium">Open now</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Contact</h3>
                                <p className="mt-1 text-sm text-gray-600">+94 11 2334567</p>
                                <a href="mailto:info@premadasastadium.com" className="mt-1 text-sm text-primary-600 hover:text-primary-700">
                                  info@premadasastadium.com
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Pricing</h3>
                                <p className="mt-1 text-sm text-gray-600">Starting from {facilityData.price}</p>
                                <p className="mt-1 text-xs text-gray-500">Special rates for regular bookings</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Amenities</h3>
                                <div className="mt-1 flex flex-wrap gap-1.5">
                                  {facilityData.amenities.map((amenity, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                    >
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Facility Type</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                  {facilityData.indoor ? 'Indoor Facility' : 'Outdoor Facility'}
                                </p>
                                <div className="mt-2 flex space-x-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p className="text-xs text-gray-500">COVID-19 safety measures in place</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="text-base font-medium text-gray-900 mb-3">Description</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Welcome to Premadasa Cricket Stadium, one of Sri Lanka's premier cricket venues.
                            Our world-class facilities include professionally maintained cricket pitches,
                            practice nets, and state-of-the-art amenities for players and spectators alike.
                            Whether you're booking for a professional match, team practice, or individual
                            training sessions, our staff is dedicated to providing an exceptional experience.
                          </p>
                          <p className="text-gray-600 text-sm">
                            The stadium features floodlights for evening games, ample parking for visitors,
                            comfortable changing rooms, and equipment rental services. Our grounds are
                            maintained to international standards, ensuring the best playing conditions
                            for cricket enthusiasts at all levels.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> {/* End of Part 2 (Left Column) */}


                  {/* Part 3: Right Sidebar - Booking Form and Availability */}
                  {/* *** CHANGE: This is now lg:col-span-1 and INSIDE the grid *** */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Booking/Price Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 relative">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>

                      <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Book This Facility
                        </h3>

                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <span className="text-sm text-gray-500">Price</span>
                            <p className="text-2xl font-bold text-primary-700">{facilityData.price}</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium border border-green-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Available Today
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="relative group">
                            <label htmlFor="booking-date" className="block text-xs font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                              Date
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                id="booking-date"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                                defaultValue="2025-04-15"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <label htmlFor="booking-time" className="block text-xs font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                              Time Slot
                            </label>
                            <select
                              id="booking-time"
                              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                            >
                              <option value="09:00">09:00 - 10:00</option>
                              <option value="11:00">11:00 - 12:00</option>
                              <option value="13:00">13:00 - 14:00</option>
                              <option value="15:00">15:00 - 16:00</option>
                              <option value="17:00">17:00 - 18:00</option>
                            </select>
                          </div>
                        </div>

                        <div className="relative group mb-6">
                          <label htmlFor="booking-duration" className="block text-xs font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                            Duration
                          </label>
                          <select
                            id="booking-duration"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                          >
                            <option value="1">1 Hour (Rs. 15,000)</option>
                            <option value="2">2 Hours (Rs. 28,000)</option>
                            <option value="3">3 Hours (Rs. 40,000)</option>
                            <option value="4">4 Hours (Rs. 52,000)</option>
                          </select>
                        </div>

                        <div className="relative group mb-6">
                          <label htmlFor="booking-equipment" className="block text-xs font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                            Additional Equipment
                          </label>
                          <select
                            id="booking-equipment"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                          >
                            <option value="none">None</option>
                            <option value="basic">Basic Equipment (Rs. 2,000)</option>
                            <option value="premium">Premium Equipment (Rs. 5,000)</option>
                            <option value="professional">Professional Set (Rs. 8,000)</option>
                          </select>
                        </div>

                        <button className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-[1.01]">
                          Book Now
                        </button>
                      </div>

                      <div className="p-6 bg-gray-50">
                        <div className="flex items-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h4 className="text-sm font-medium text-gray-900">Important Information</h4>
                        </div>

                        <ul className="text-xs text-gray-600 space-y-2">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Free cancellation up to 24 hours before your booking</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Your booking includes access to changing rooms and parking</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Please arrive 15 minutes before your scheduled time</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Equipment rental is available at an additional cost</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Availability Calendar Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
                      <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Availability
                        </h3>

                        {/* Simplified Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-700">April 2025</h4>
                          <div className="flex space-x-2">
                            <button className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Days of week header */}
                        <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                            <div key={i} className="text-xs font-medium text-gray-500 py-1">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar days grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {/* Previous month days - grayed out */}
                          {[28, 29, 30, 31].map((day, i) => (
                            <div key={`prev-${i}`} className="text-xs text-gray-400 py-2 rounded">
                              {day}
                            </div>
                          ))}

                          {/* Current month days */}
                          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                            // Determine day status - available, partial, booked
                            let dayClass = "py-2 rounded text-xs font-medium cursor-pointer transition-colors";

                            if (day === 15) {
                              // Today
                              dayClass += " bg-primary-600 text-white hover:bg-primary-700";
                            } else if ([11, 18, 25].includes(day)) {
                              // Fully booked
                              dayClass += " bg-red-100 text-red-800 hover:bg-red-200";
                            } else if ([7, 14, 21, 28].includes(day)) {
                              // Partially available
                              dayClass += " bg-amber-100 text-amber-800 hover:bg-amber-200";
                            } else {
                              // Available
                              dayClass += " bg-green-100 text-green-800 hover:bg-green-200";
                            }

                            return (
                              <div key={`day-${day}`} className={dayClass}>
                                {day}
                              </div>
                            );
                          })}

                          {/* Next month days - grayed out */}
                          {[1, 2, 3, 4].map((day, i) => (
                            <div key={`next-${i}`} className="text-xs text-gray-400 py-2 rounded">
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Legend</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                            <span className="text-gray-600">Available</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-amber-100 rounded mr-2"></div>
                            <span className="text-gray-600">Partially Available</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
                            <span className="text-gray-600">Fully Booked</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-primary-600 rounded mr-2"></div>
                            <span className="text-gray-600">Selected Date</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weather Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
                      <div className="relative p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-sports-pattern"></div>
                        </div>

                        <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                          Weather Forecast
                        </h3>

                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                            <div>
                              <span className="text-3xl font-bold">28°C</span>
                              <p className="text-blue-100">Partly Cloudy</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">Today</p>
                            <p className="text-blue-100 text-sm">April 15</p>
                          </div>
                        </div>

                        <div className="relative z-10">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                            <div className="grid grid-cols-4 divide-x divide-blue-400/20">
                              <div className="text-center px-2">
                                <p className="text-xs text-blue-100">Wed</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                                <p className="text-xs font-bold">26°</p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-xs text-blue-100">Thu</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-xs font-bold">29°</p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-xs text-blue-100">Fri</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-xs font-bold">30°</p>
                              </div>
                              <div className="text-center px-2">
                                <p className="text-xs text-blue-100">Sat</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                                <p className="text-xs font-bold">27°</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm text-gray-700">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs">Weather for Colombo</span>
                          </div>
                          <a href="#" className="text-primary-600 hover:text-primary-700 text-xs font-medium">Forecast Details</a>
                        </div>
                      </div>
                    </div>
                  </div> {/* End of Part 3 (Right Column) */}

                </div> {/* *** CHANGE: End Grid for Parts 2 & 3 *** */}


                {/* Part 4: Similar Facilities, Reviews, FAQs, and CTA sections */}
                {/* *** CHANGE: Moved these sections INSIDE the main conditional's else block *** */}

                {/* Similar Facilities Section */}
                <section className="my-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50 z-0"></div>
                  <div className="absolute inset-0 bg-sports-pattern opacity-5 z-0"></div>

                  {/* Decorative blobs */}
                  <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                  <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="text-center mb-12">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500/10 to-blue-500/10 text-primary-700 backdrop-blur-sm animate-pulse-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        EXPLORE MORE
                      </span>

                      <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Similar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Facilities</span>
                      </h2>

                      {/* Animated bar */}
                      <div className="flex justify-center items-center my-4">
                        <div className="w-16 h-1 bg-primary-200 rounded-l-full"></div>
                        <div className="w-10 h-1 bg-primary-400 animate-pulse-slow"></div>
                        <div className="w-16 h-1 bg-primary-600 rounded-r-full"></div>
                      </div>

                      <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Discover other cricket facilities and sports venues you might enjoy
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Similar Facility Card 1 */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50 group">
                        <div className="relative">
                          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                            <img
                              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da"
                              alt="Cricket Stadium"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* Sport type tag */}
                          <div className="absolute bottom-3 left-3 flex space-x-2 z-10">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-sm">
                              Cricket
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              Sinhalese Sports Club Ground
                            </h3>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-sm font-medium text-gray-700">4.7</span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Colombo
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Flood Lights
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Parking
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Changing Rooms
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <p className="text-lg font-bold text-primary-700">
                              Rs. 12,000/hr
                            </p>
                            <button className="inline-flex items-center px-3 py-1.5 rounded-lg border border-primary-500 text-primary-600 text-sm font-medium hover:bg-primary-50 transition-colors duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Similar Facility Card 2 */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50 group">
                        <div className="relative">
                          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                            <img
                              src="https://images.unsplash.com/photo-1598901899232-5aab95192712"
                              alt="Cricket Stadium"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* Sport type tag */}
                          <div className="absolute bottom-3 left-3 flex space-x-2 z-10">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-sm">
                              Cricket
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              Pallekele International Stadium
                            </h3>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-sm font-medium text-gray-700">4.8</span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Kandy
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Flood Lights
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Equipment Rental
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Seating
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <p className="text-lg font-bold text-primary-700">
                              Rs. 14,000/hr
                            </p>
                            <button className="inline-flex items-center px-3 py-1.5 rounded-lg border border-primary-500 text-primary-600 text-sm font-medium hover:bg-primary-50 transition-colors duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Similar Facility Card 3 */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50 group">
                        <div className="relative">
                          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                            <img
                              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
                              alt="Cricket Stadium"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                          {/* Sport type tag */}
                          <div className="absolute bottom-3 left-3 flex space-x-2 z-10">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-sm">
                              Cricket
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-sm">
                              Indoor
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              Colombo Cricket Indoor Nets
                            </h3>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-sm font-medium text-gray-700">4.6</span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Colombo
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              AC
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Equipment Rental
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50">
                              Coaches
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <p className="text-lg font-bold text-primary-700">
                              Rs. 8,000/hr
                            </p>
                            <button className="inline-flex items-center px-3 py-1.5 rounded-lg border border-primary-500 text-primary-600 text-sm font-medium hover:bg-primary-50 transition-colors duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 text-center">
                      <a href="/facilities?sport=cricket" className="inline-flex items-center px-6 py-3 rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 font-medium transform transition-all duration-300 hover:scale-105">
                        View All Cricket Facilities
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </section>

                {/* Reviews Section */}
                <section className="my-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500/10 to-yellow-500/10 text-primary-700 backdrop-blur-sm animate-pulse-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        USER EXPERIENCES
                      </span>

                      <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Facility <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-yellow-600">Reviews</span>
                      </h2>

                      {/* Animated bar */}
                      <div className="flex justify-center items-center my-4">
                        <div className="w-16 h-1 bg-primary-200 rounded-l-full"></div>
                        <div className="w-10 h-1 bg-primary-400 animate-pulse-slow"></div>
                        <div className="w-16 h-1 bg-primary-600 rounded-r-full"></div>
                      </div>

                      <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        See what others are saying about their experience at this facility
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-xl shadow-lg border border-gray-200/50">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-20 h-20 flex items-center justify-center bg-primary-100 rounded-xl text-primary-700 text-3xl font-bold">
                              {facilityData.rating}
                            </div>
                          </div>
                          <div>
                            <div className="flex mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`h-5 w-5 ${star <= Math.round(facilityData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-700">
                              Based on <span className="font-bold">{facilityData.reviewCount}</span> reviews
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 w-16">5 stars</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-sm text-gray-600">85%</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 w-16">4 stars</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '10%' }}></div>
                              </div>
                              <span className="text-sm text-gray-600">10%</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 w-16">3 stars</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '3%' }}></div>
                              </div>
                              <span className="text-sm text-gray-600">3%</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 w-16">2 stars</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: '1%' }}></div>
                              </div>
                              <span className="text-sm text-gray-600">1%</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 w-16">1 star</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
                                <div className="bg-red-500 h-full rounded-full" style={{ width: '1%' }}></div>
                              </div>
                              <span className="text-sm text-gray-600">1%</span>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center mt-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Review Card 1 */}
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50 transform transition hover:shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold mr-4">
                              RS
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Ranil Silva</h4>
                              <p className="text-sm text-gray-500">April 10, 2025</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="h-5 w-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-2">Exceptional Cricket Facilities</h3>
                        <p className="text-gray-600 mb-3">
                          I've booked this stadium for team practice several times, and it never disappoints.
                          The pitch is always well-maintained, and the staff is helpful and accommodating.
                          The equipment rental service is a great addition, saving us the hassle of transporting
                          our gear. Highly recommended for both amateur and professional teams.
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Excellent Pitch
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Helpful Staff
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Good Equipment
                          </span>
                        </div>
                      </div>

                      {/* Review Card 2 */}
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50 transform transition hover:shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold mr-4">
                              MJ
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Malith Jayawardena</h4>
                              <p className="text-sm text-gray-500">April 8, 2025</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-5 w-5 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-2">Worth Every Rupee</h3>
                        <p className="text-gray-600 mb-3">
                          This is hands down the best cricket facility in Colombo. The floodlights make evening
                          practice sessions a dream, and the ground staff takes immaculate care of the field.
                          I appreciate the flexible booking system and the weather alerts that help us plan better.
                          The changing rooms are clean and well-maintained.
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Great Floodlights
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Clean Facilities
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-800">
                            Excellent Value
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-10">
                      <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                        Load More Reviews
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section className="my-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-indigo-50 z-0"></div>
                  <div className="absolute inset-0 bg-sports-pattern opacity-5 z-0"></div>

                  {/* Decorative blobs */}
                  <div className="absolute top-20 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                  <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="text-center mb-12">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500/10 to-indigo-500/10 text-primary-700 backdrop-blur-sm animate-pulse-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        FREQUENTLY ASKED
                      </span>

                      <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Questions</span>
                      </h2>

                      {/* Animated bar */}
                      <div className="flex justify-center items-center my-4">
                        <div className="w-16 h-1 bg-primary-200 rounded-l-full"></div>
                        <div className="w-10 h-1 bg-primary-400 animate-pulse-slow"></div>
                        <div className="w-16 h-1 bg-primary-600 rounded-r-full"></div>
                      </div>

                      <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Everything you need to know about booking this facility
                      </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                      {/* FAQ Item 1 */}
                      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50">
                        <button className="w-full flex justify-between items-center p-6 text-left">
                          <span className="text-lg font-medium text-gray-900">What is the cancellation policy?</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">
                            You can cancel your booking for a full refund up to 24 hours before your scheduled time.
                            For cancellations made within 24 hours, a 50% fee will be charged. No-shows will be charged
                            the full amount. In case of severe weather conditions that make the facility unusable,
                            we offer free rescheduling or a full refund.
                          </p>
                        </div>
                      </div>

                      {/* FAQ Item 2 */}
                      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50">
                        <button className="w-full flex justify-between items-center p-6 text-left">
                          <span className="text-lg font-medium text-gray-900">What equipment is available for rent?</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">
                            We offer a comprehensive range of cricket equipment for rent, including bats, balls, pads,
                            gloves, helmets, and stumps. You can choose from basic, premium, or professional equipment
                            sets depending on your needs. Equipment rental is available at an additional cost and should
                            be booked in advance to ensure availability.
                          </p>
                        </div>
                      </div>

                      {/* FAQ Item 3 */}
                      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50">
                        <button className="w-full flex justify-between items-center p-6 text-left">
                          <span className="text-lg font-medium text-gray-900">Is there parking available?</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">
                            Yes, we offer ample parking space for our customers. The parking is free for all facility
                            users. On match days or during special events, we recommend arriving early as the parking
                            area can get crowded. For large groups or team buses, please inform us in advance so we
                            can reserve appropriate parking space.
                          </p>
                        </div>
                      </div>

                      {/* FAQ Item 4 */}
                      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50">
                        <button className="w-full flex justify-between items-center p-6 text-left">
                          <span className="text-lg font-medium text-gray-900">Are coaches available for hire?</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">
                            Yes, we have certified cricket coaches available for individual or group sessions.
                            Our coaches range from former national players to certified professional trainers.
                            Coaching sessions can be booked along with your facility reservation or separately.
                            Rates vary depending on the coach's experience and session duration. Please book coaches
                            at least 48 hours in advance.
                          </p>
                        </div>
                      </div>

                      {/* FAQ Item 5 */}
                      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50">
                        <button className="w-full flex justify-between items-center p-6 text-left">
                          <span className="text-lg font-medium text-gray-900">How does the weather policy work?</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">
                            Our platform continuously monitors weather conditions and provides real-time updates.
                            If severe weather (heavy rain, lightning, etc.) makes the facility unusable, you will
                            receive a notification and be offered a free rescheduling or full refund. For light rain,
                            the facility may still be usable depending on the drainage systems. Our staff makes the
                            final call on facility usability based on safety considerations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 text-center">
                      <p className="text-gray-600 mb-4">Still have questions?</p>
                      <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Contact Support
                      </button>
                    </div>
                  </div>
                </section>

                {/* Call to Action */}
                <section className="relative py-16 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-sports-pattern"></div>
                  </div>

                  {/* Sports equipment outline decorations */}
                  <div className="absolute top-10 right-20 w-32 h-32 border-2 border-white/10 rounded-full opacity-20 animate-float"></div>
                  <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-500"></div>
                  <div className="absolute top-1/3 left-1/4 w-40 h-12 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-1000"></div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to Book Your Cricket Session?
                      </h2>
                      <p className="mt-4 text-lg text-blue-100">
                        Secure your preferred time slot before someone else does. Easy booking, flexible
                        scheduling, and top-quality facilities await you.
                      </p>
                      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-700 bg-white hover:bg-gray-50 transform transition-all duration-300 hover:scale-105">
                          Book Now
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md shadow-sm text-base font-medium text-white bg-transparent hover:bg-white/10 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share Facility
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
            {/* Add a fallback if facilityData is null/undefined after loading */}
            {!facilityData && !loading && (
                 <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Facility</h2>
                    <p className="text-gray-600">Could not load facility details. Please try again later.</p>
                 </div>
            )}
          </> // *** CHANGE: End Fragment for 'else' block ***
        )} {/* End of Conditional Rendering */}
      </div> {/* End of Main Content Container */}
    </div> // End of Root Div
  ); // --- END OF RETURN STATEMENT ---
}