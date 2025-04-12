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
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600 to-primary-900 opacity-90" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')", 
          backgroundBlendMode: "overlay",
          opacity: 0.4
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Book Sports Facilities Across Sri Lanka
          </h1>
          <p className="mt-6 text-lg leading-8 text-white opacity-90">
            Find, book, and enjoy sports facilities, equipment, and trainers all in one place. 
            SportsBookSL connects you with the best sporting venues across the country.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-10 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <label htmlFor="search-location" className="sr-only">
                Location
              </label>
              <input
                type="text"
                id="search-location"
                placeholder="Location (City, District)"
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="sport-type" className="sr-only">
                Sport Type
              </label>
              <select
                id="sport-type"
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white"
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
              className="w-full md:w-auto rounded-lg bg-secondary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Search
            </button>
          </form>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/facilities"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse All Facilities
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}