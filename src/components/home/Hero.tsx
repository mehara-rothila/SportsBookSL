'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [search, setSearch] = useState('');
  const [sportType, setSportType] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
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
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1574271143515-5cddf8da19be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
  ];
  
  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { search, sportType });
    // Would navigate to search results in a real application
  };
  
  return (
    <div className="relative isolate overflow-hidden bg-primary-950 min-h-[90vh]">
      {/* Background images with enhanced crossfade effect */}
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${
            index === currentImageIndex ? 'animate-ken-burns' : ''
          }`}
          style={{ 
            backgroundImage: `url('${image}')`,
            opacity: index === currentImageIndex ? 0.18 : 0,
            zIndex: index === currentImageIndex ? 0 : -10
          }}
        />
      ))}
      
      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/75 to-primary-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" />
      
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-1 w-1 bg-white rounded-full opacity-60 top-1/4 left-1/3 animate-pulse-slow"></div>
        <div className="absolute h-2 w-2 bg-white rounded-full opacity-40 top-1/3 left-1/4 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute h-1 w-1 bg-white rounded-full opacity-50 top-1/2 left-1/6 animate-pulse-slow animation-delay-500"></div>
        <div className="absolute h-1 w-1 bg-white rounded-full opacity-70 top-2/3 left-3/4 animate-pulse-slow animation-delay-700"></div>
        <div className="absolute h-2 w-2 bg-white rounded-full opacity-40 top-1/5 left-4/5 animate-pulse-slow animation-delay-300"></div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-secondary-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-gradient-x" 
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Enhanced heading with gradient and text shadow */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-down" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <span className="block">Book Sports Facilities</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">Across Sri Lanka</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/90 animate-fade-in-down animation-delay-200">
            Find, book, and enjoy sports facilities, equipment, and trainers all in one place. 
            SportsBookSL connects you with the best sporting venues across the country.
          </p>
          
          {/* Enhanced Stats - New Element */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in-up animation-delay-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/60">Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15K+</div>
              <div className="text-sm text-white/60">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">8</div>
              <div className="text-sm text-white/60">Sports</div>
            </div>
          </div>
          
          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="mt-10 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative animate-fade-in-up animation-delay-500">
            {/* Animated decorative element */}
            <div className="absolute -top-8 -right-8 bg-secondary-500 rounded-full w-16 h-16 opacity-30 blur-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -left-8 bg-primary-300 rounded-full w-12 h-12 opacity-30 blur-lg animate-pulse-slow animation-delay-1000"></div>
            
            <div className={`flex-1 relative group transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-secondary-400' : 'text-white/50'}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search-location"
                placeholder="Location (City, District)"
                className="w-full rounded-lg border-0 bg-white/10 pl-10 pr-4 py-3.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary-400 focus:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            
            <div className="w-full md:w-auto group">
              <select
                id="sport-type"
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary-400 focus:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer group-hover:ring-white/20"
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
                style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem'}}
              >
                <option value="">All Sports</option>
                {sportTypes.map((sport) => (
                  <option key={sport.id} value={sport.id} className="text-gray-900">
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto rounded-lg bg-secondary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105 flex items-center justify-center group"
            >
              <span>Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up animation-delay-700">
            <Link
              href="/facilities"
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Browse All Facilities
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-semibold leading-6 text-white flex items-center group relative overflow-hidden"
            >
              <span className="relative z-10">Learn more</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-400 group-hover:w-full transition-all duration-300"></span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#FFFFFF" 
            fillOpacity="1" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}