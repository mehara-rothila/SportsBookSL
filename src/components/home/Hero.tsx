'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [search, setSearch] = useState('');
  const [sportType, setSportType] = useState('');
  
  const sportTypes = [
    { id: 'cricket', name: 'Cricket' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'swimming', name: 'Swimming' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'badminton', name: 'Badminton' },
    { id: 'volleyball', name: 'Volleyball' },
    { id: 'athletics', name: 'Athletics' },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', { search, sportType });
  };
  
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-700 via-primary-800 to-primary-900 opacity-90" />
      
      {/* Dynamic pattern overlay */}
      <div className="absolute inset-0 bg-sports-pattern opacity-30" />
      
      {/* Main background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')", 
          backgroundBlendMode: "overlay",
          opacity: 0.5
        }}
      />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      {/* Sports equipment illustrations - subtle in background */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-6 border-2 border-white/20 rounded-full opacity-20"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-2 animate-fade-in-down">
            Book Sports Facilities Across Sri Lanka
          </h1>
          
          {/* Animated divider */}
          <div className="relative flex py-5 items-center justify-center">
            <div className="w-16 h-1 bg-secondary-500 rounded-full animate-pulse-slow"></div>
            <div className="w-3 h-3 mx-2 bg-secondary-400 rounded-full"></div>
            <div className="w-24 h-1 bg-secondary-500 rounded-full animate-pulse-slow animation-delay-200"></div>
            <div className="w-3 h-3 mx-2 bg-secondary-400 rounded-full"></div>
            <div className="w-16 h-1 bg-secondary-500 rounded-full animate-pulse-slow animation-delay-300"></div>
          </div>
          
          <p className="mt-6 text-lg leading-8 text-white opacity-90 animate-fade-in-up animation-delay-300">
            Find, book, and enjoy sports facilities, equipment, and trainers all in one place. 
            SportsBookSL connects you with the best sporting venues across the country.
          </p>
          
          {/* Search Form with enhanced styling */}
          <form onSubmit={handleSearch} className="mt-10 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                id="search-location"
                placeholder="Location (City, District)"
                className="w-full rounded-lg border-0 bg-white/10 pl-12 pr-4 py-3.5 text-white placeholder-white/60 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white transition-all hover:bg-white/15"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-auto relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <select
                id="sport-type"
                className="w-full rounded-lg border-0 bg-white/10 pl-12 pr-4 py-3.5 text-white placeholder-white/60 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white transition-all hover:bg-white/15"
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
              >
                <option value="">All Sports</option>
                {sportTypes.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto rounded-lg bg-secondary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Search</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </form>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/facilities"
              className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105"
            >
              Browse All Facilities
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-white group flex items-center transition-all duration-300">
              Learn more 
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {/* Added feature badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Real-time Booking
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Weather Integration
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Equipment Rental
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial Aid
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}