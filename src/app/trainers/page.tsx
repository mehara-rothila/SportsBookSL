'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// Mock trainers data
const trainersData = [
  {
    id: 'trainer-1',
    name: 'Lasith Malinga',
    specialization: 'Fast Bowling',
    sports: ['Cricket'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f', // Replace with a relevant image if possible
    rating: 4.9,
    reviewCount: 87,
    hourlyRate: 2500,
    experience: 15,
    availability: ['Monday', 'Wednesday', 'Friday'],
    certifications: ['Level 3 Cricket Coach', 'National Fast Bowling Coach'],
    bio: 'Former Sri Lankan fast bowler with international experience, specializing in yorkers and slower balls. I offer personalized coaching for all skill levels, from beginners to advanced players looking to improve their bowling technique.',
    languages: ['English', 'Sinhala', 'Tamil'],
    facilities: ['Premadasa Cricket Stadium', 'Sugathadasa Stadium']
  },
  // Add more mock trainer data here if needed
  {
    id: 'trainer-2',
    name: 'Julian Bolling',
    specialization: 'Freestyle & Butterfly',
    sports: ['Swimming'],
    location: 'Kandy',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', // Replace with a relevant image
    rating: 4.7,
    reviewCount: 65,
    hourlyRate: 2200,
    experience: 20,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    certifications: ['ASCA Level 4', 'Olympic Coach Certification'],
    bio: 'Experienced swimming coach with a focus on competitive technique and endurance training. Coached multiple national-level swimmers.',
    languages: ['English', 'Sinhala'],
    facilities: ['Kandy Swimming Complex', 'Private Pool Access']
  },
  {
    id: 'trainer-3',
    name: 'Sania Mirza (Inspired)', // Example
    specialization: 'Doubles Strategy & Forehand',
    sports: ['Tennis'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', // Replace with a relevant image
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 3000,
    experience: 12,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    certifications: ['ITF Level 2 Coach', 'Professional Tennis Registry (PTR)'],
    bio: 'Internationally recognized player offering high-performance tennis coaching. Focus on match play tactics and powerful groundstrokes.',
    languages: ['English', 'Hindi'],
    facilities: ['Sri Lanka Tennis Association Courts', 'Private Club Courts']
  }
];

// Filter options
const sportOptions = [
  { id: 'all', name: 'All Sports' },
  { id: 'cricket', name: 'Cricket' },
  { id: 'swimming', name: 'Swimming' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'badminton', name: 'Badminton' },
  { id: 'basketball', name: 'Basketball' },
];

const locationOptions = [
  { id: 'all', name: 'All Locations' },
  { id: 'colombo', name: 'Colombo' },
  { id: 'kandy', name: 'Kandy' },
  { id: 'matara', name: 'Matara' },
  { id: 'kurunegala', name: 'Kurunegala' },
];

const ratingOptions = [
  { id: 'all', name: 'Any Rating' },
  { id: '4.5', name: '4.5+' },
  { id: '4.0', name: '4.0+' },
  { id: '3.5', name: '3.5+' },
];

const priceRangeOptions = [
  { id: 'all', name: 'Any Price' },
  { id: '1000-2000', name: 'Rs. 1,000 - 2,000' },
  { id: '2000-3000', name: 'Rs. 2,000 - 3,000' },
  { id: '3000-plus', name: 'Rs. 3,000+' },
];

export default function TrainersPage() {
  const [filters, setFilters] = useState({
    sport: 'all',
    location: 'all',
    rating: 'all',
    priceRange: 'all',
    availability: [] as string[]
  });

  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrainers, setFilteredTrainers] = useState(trainersData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredTrainer, setHoveredTrainer] = useState<string | null>(null);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-LK')}`;
  };

  // Toggle day selection in availability filter
  const toggleDaySelection = (day: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      availability: prevFilters.availability.includes(day)
        ? prevFilters.availability.filter(d => d !== day)
        : [...prevFilters.availability, day]
    }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...trainersData];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        trainer =>
          trainer.name.toLowerCase().includes(query) ||
          trainer.specialization.toLowerCase().includes(query) ||
          trainer.sports.some(sport => sport.toLowerCase().includes(query)) ||
          trainer.location.toLowerCase().includes(query)
      );
    }

    // Apply sport filter
    if (filters.sport !== 'all') {
      result = result.filter(
        trainer =>
          trainer.sports.some(sport => sport.toLowerCase() === filters.sport.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location !== 'all') {
      result = result.filter(
        trainer => trainer.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Apply rating filter
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      result = result.filter(trainer => trainer.rating >= minRating);
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === '1000-2000') {
        result = result.filter(trainer => trainer.hourlyRate >= 1000 && trainer.hourlyRate <= 2000);
      } else if (filters.priceRange === '2000-3000') {
        result = result.filter(trainer => trainer.hourlyRate > 2000 && trainer.hourlyRate <= 3000);
      } else if (filters.priceRange === '3000-plus') {
        result = result.filter(trainer => trainer.hourlyRate > 3000);
      }
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      result = result.filter(
        trainer => filters.availability.every(day => trainer.availability.includes(day)) // Changed to 'every' for stricter matching, use 'some' if any day match is okay
      );
    }

    // Apply sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_low') {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredTrainers(result);
  }, [filters, sortBy, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      sport: 'all',
      location: 'all',
      rating: 'all',
      priceRange: 'all',
      availability: []
    });
    setSearchQuery('');
    setSortBy('rating'); // Optionally reset sort order
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Renders stars for ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 flex-shrink-0 ${
              rating >= star
                ? 'text-yellow-400'
                : rating >= star - 0.5 // Handle half stars visually if needed, simple logic here
                  ? 'text-yellow-400' // Or use a half-star icon
                  : 'text-gray-300' // Changed for better contrast
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    // Added a closing div tag for the main container at the very end
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Background patterns and decorative elements */}
      {/* Consider replacing bg-sports-pattern with an actual CSS class or inline style */}
      <div className="absolute inset-0 bg-[url('/path-to-your/sports-pattern.svg')] opacity-10 z-0"></div>

      {/* Decorative blobs */}
      <div className="absolute -top-40 left-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -left-40 top-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Hero section with enhanced visuals */}
      <div className="relative bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-40 animate-ken-burns"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }} // Ensure this image URL is valid and accessible
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 to-primary-800/80" />
        </div>

        {/* Sports equipment outline decorations */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/10 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-500"></div>
        <div className="absolute top-40 left-1/3 w-16 h-6 border-2 border-white/10 rounded-full opacity-20 animate-float animation-delay-1000"></div>

        {/* Dynamic shapes */}
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-secondary-500/20 to-secondary-700/10 rounded-lg rotate-12 backdrop-blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-primary-300/20 to-blue-500/10 rounded-lg -rotate-12 backdrop-blur-xl opacity-30 animate-float animation-delay-700"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm border border-white/20 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              EXPERT TRAINERS
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">Find Expert Sports Trainers</h1>

            {/* Animated divider */}
            <div className="relative flex py-5 items-center">
              <div className="w-16 h-1 bg-secondary-500 rounded-full animate-pulse-slow"></div>
              <div className="w-3 h-3 mx-2 bg-secondary-400 rounded-full"></div>
              <div className="w-24 h-1 bg-secondary-500 rounded-full animate-pulse-slow animation-delay-200"></div>
            </div>

            <p className="mt-3 max-w-3xl text-xl text-primary-100 animate-fade-in-up animation-delay-300">
              Connect with professional coaches and trainers across Sri Lanka to enhance your skills and reach your athletic potential.
            </p>
          </div>

          {/* Enhanced search bar */}
          <div className="mt-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
            <div className="relative rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 border border-white/30"></div>
              <div className="relative">
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Search trainers by name, sport, or expertise..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full bg-transparent border-0 py-4 pl-5 pr-10 text-white placeholder-white/70 focus:ring-0 focus:outline-none text-lg"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    {/* Added type="button" to prevent potential form submission */}
                    <button type="button" className="h-full px-6 py-4 bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Featured sports icons section REMOVED --- */}

        </div>

        {/* Wave overlay for transition to next section */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block"> {/* Added block display */}
            <path fill="#F9FAFB" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main content with the trainer listings */}
      <div className="relative -mt-32 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 z-10">
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100">
          {/* Filter bar with enhanced styling */}
          <div className="px-6 py-6 sm:p-8 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="max-w-lg w-full">
                <label htmlFor="search" className="sr-only">Search trainers</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 transition-all duration-300 shadow-sm"
                    placeholder="Search by name, sport, or specialization"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">Sort by</label>
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="mt-1 block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 shadow-sm group-hover:border-primary-300"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="experience">Most Experienced</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-primary-300 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filters {isFilterOpen ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Mobile filters with enhanced transitions */}
            <Transition
              show={isFilterOpen}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="md:hidden" // Only show on mobile
            >
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Advanced Filters
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 bg-gray-50 p-5 rounded-xl shadow-inner">
                  {/* Mobile Sport Filter */}
                  <div className="relative group">
                    <label htmlFor="mobile-sport" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">Sport</label>
                    <select
                      id="mobile-sport"
                      name="mobile-sport"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300 shadow-sm"
                      value={filters.sport}
                      onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                    >
                      {sportOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Mobile Location Filter */}
                  <div className="relative group">
                    <label htmlFor="mobile-location" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">Location</label>
                    <select
                      id="mobile-location"
                      name="mobile-location"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300 shadow-sm"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                      {locationOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Mobile Rating Filter */}
                  <div className="relative group">
                    <label htmlFor="mobile-rating" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">Rating</label>
                    <select
                      id="mobile-rating"
                      name="mobile-rating"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300 shadow-sm"
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    >
                      {ratingOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Mobile Price Filter */}
                  <div className="relative group">
                    <label htmlFor="mobile-price" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">Price Range</label>
                    <select
                      id="mobile-price"
                      name="mobile-price"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300 shadow-sm"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                      {priceRangeOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Mobile Availability Filter */}
                  <div>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 border border-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75 transition-all duration-300 shadow-sm">
                            <span className="flex items-center text-primary-700">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Availability
                            </span>
                            {open ? (
                              <ChevronUpIcon className="h-5 w-5 text-primary-500" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-primary-500" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 bg-white mt-2 rounded-lg border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              {daysOfWeek.map((day) => (
                                <div key={`mobile-day-${day}`} className="flex items-start">
                                  <div className="flex h-5 items-center">
                                    <input
                                      id={`mobile-day-${day}`}
                                      name={`mobile-day-${day}`}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-all duration-300"
                                      checked={filters.availability.includes(day)}
                                      onChange={() => toggleDaySelection(day)}
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor={`mobile-day-${day}`} className="font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                                      {day}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-all duration-300 group"
                    onClick={resetFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset all filters
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsFilterOpen(false)} // Close filter panel on apply
                  >
                    Apply Filters
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Enhanced Desktop filters */}
            <div className="hidden md:block bg-gradient-to-b from-gray-50 to-white p-6 lg:w-72 xl:w-80 lg:rounded-bl-2xl border-r border-gray-100 shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
              <div className="mt-6 space-y-6"> {/* Reduced space-y */}
                {/* Desktop Sport Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <fieldset> {/* Removed space-y-4 */}
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                      </svg>
                      Sport Type
                    </legend>
                    <div className="mt-2 space-y-3">
                      {sportOptions.map((option) => (
                        <div key={`desktop-sport-${option.id}`} className="flex items-center">
                          <input
                            id={`desktop-sport-${option.id}`}
                            name="desktop-sport" // Unique name for desktop radio group
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.sport === option.id}
                            onChange={() => setFilters({ ...filters, sport: option.id })}
                          />
                          <label htmlFor={`desktop-sport-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {/* Desktop Location Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location
                    </legend>
                    <div className="mt-2 space-y-3">
                      {locationOptions.map((option) => (
                        <div key={`desktop-location-${option.id}`} className="flex items-center">
                          <input
                            id={`desktop-location-${option.id}`}
                            name="desktop-location"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.location === option.id}
                            onChange={() => setFilters({ ...filters, location: option.id })}
                          />
                          <label htmlFor={`desktop-location-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {/* Desktop Rating Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Rating
                    </legend>
                    <div className="mt-2 space-y-3">
                      {ratingOptions.map((option) => (
                        <div key={`desktop-rating-${option.id}`} className="flex items-center">
                          <input
                            id={`desktop-rating-${option.id}`}
                            name="desktop-rating"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.rating === option.id}
                            onChange={() => setFilters({ ...filters, rating: option.id })}
                          />
                          <label htmlFor={`desktop-rating-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {/* Desktop Price Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price Range
                    </legend>
                    <div className="mt-2 space-y-3">
                      {priceRangeOptions.map((option) => (
                        <div key={`desktop-price-${option.id}`} className="flex items-center">
                          <input
                            id={`desktop-price-${option.id}`}
                            name="desktop-price"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.priceRange === option.id}
                            onChange={() => setFilters({ ...filters, priceRange: option.id })}
                          />
                          <label htmlFor={`desktop-price-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {/* Desktop Availability Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Availability
                    </legend>
                    <div className="mt-2 space-y-3"> {/* Adjusted space */}
                      <div className="grid grid-cols-3 gap-2"> {/* Adjusted grid columns */}
                        {daysOfWeek.map((day) => (
                          <div key={`desktop-day-${day}`} className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id={`desktop-day-${day}`}
                                name={`desktop-day-${day}`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                                checked={filters.availability.includes(day)}
                                onChange={() => toggleDaySelection(day)}
                              />
                            </div>
                            <div className="ml-2 text-sm"> {/* Adjusted margin */}
                              <label htmlFor={`desktop-day-${day}`} className="font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer">
                                {day.substring(0, 3)} {/* Shortened day name */}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 group"
                    onClick={resetFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium ring-1 ring-primary-200">
                    {filteredTrainers.length} found
                  </span>
                </div>
              </div>
            </div>

            {/* Trainer listings */}
            <div className="flex-1 p-6 lg:p-8"> {/* Added lg padding */}
              <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-8"> {/* Added margin-bottom */}
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Expert Trainers
                </h2>
                <p className="mt-2 inline-flex items-center px-3.5 py-1.5 bg-gradient-to-r from-primary-50 to-blue-50 rounded-full text-sm font-medium text-primary-700 border border-primary-100 shadow-sm sm:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {filteredTrainers.length} {filteredTrainers.length === 1 ? 'trainer' : 'trainers'} found
                </p>
              </div>

              {/* Enhanced empty state */}
              {filteredTrainers.length === 0 ? (
                <div className="mt-12 text-center py-12 rounded-xl bg-gray-50 border border-gray-100 shadow-inner">
                  <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No trainers match your filters</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    Try adjusting your search or filter criteria to find trainers that match your requirements.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-transparent bg-primary-600 px-5 py-3 text-base font-medium text-white shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                    onClick={resetFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset all filters
                  </button>
                </div>
              ) : (
                // Changed ul to div as li elements are direct children now
                <div role="list" className="space-y-8">
                  {filteredTrainers.map((trainer) => (
                    // Changed li to div, added group class for hover effects
                    <div
                      key={trainer.id}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                      onMouseEnter={() => setHoveredTrainer(trainer.id)}
                      onMouseLeave={() => setHoveredTrainer(null)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative aspect-square w-full md:w-64 lg:w-72 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" // Use group-hover
                            src={trainer.profileImage}
                            alt={trainer.name}
                          />
                          {/* Overlay adjusted for better visibility on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Sports tags visibility adjusted */}
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-wrap gap-1.5">
                              {trainer.sports.map((sport) => (
                                <span
                                  key={sport}
                                  className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-800 border border-white/50 shadow-sm"
                                >
                                  {sport}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Experience badge with enhanced styling */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center rounded-full bg-primary-100 bg-opacity-90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary-800 border border-primary-200 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {trainer.experience} yrs exp
                            </span>
                          </div>

                          {/* Rating badge */}
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-800 border border-yellow-200 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {trainer.rating.toFixed(1)} {/* Ensure one decimal place */}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between"> {/* Align items start */}
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{trainer.name}</h3>
                                <div className="mt-1 flex items-center">
                                  {renderStars(trainer.rating)}
                                  <span className="ml-2 text-sm text-gray-500">({trainer.reviewCount} reviews)</span>
                                </div>
                              </div>
                              <p className="text-lg font-bold text-primary-600 flex-shrink-0 ml-4">{formatCurrency(trainer.hourlyRate)}
                                <span className="text-sm text-gray-500 font-normal">/hr</span> {/* Made /hr normal weight */}
                              </p>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1"> {/* Adjusted gap */}
                              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {trainer.specialization}
                              </span>
                              <span className="flex items-center text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {trainer.location}
                              </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {trainer.certifications.slice(0, 2).map((cert, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 border border-green-200 shadow-sm"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  {cert}
                                </span>
                              ))}
                              {trainer.certifications.length > 2 && (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200 shadow-sm">
                                  +{trainer.certifications.length - 2} more
                                </span>
                              )}
                            </div>

                            <p className="mt-4 text-sm text-gray-600 line-clamp-2">{trainer.bio}</p>

                            {/* Facilities with enhanced styling */}
                            {trainer.facilities && trainer.facilities.length > 0 && (
                              <div className="mt-3 flex items-center text-sm text-gray-500 space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-xs">Facilities: <span className="text-primary-600 font-medium">{trainer.facilities.join(', ')}</span></span>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-6 border-t border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-700 mb-2">Available on: </span> {/* Adjusted margin */}
                              <div className="flex flex-wrap gap-1.5">
                                {daysOfWeek.map((day) => (
                                  <span
                                    key={`${trainer.id}-${day}`}
                                    className={`inline-block w-8 text-center text-xs font-medium rounded-md px-1.5 py-1 transition-colors ${trainer.availability.includes(day)
                                        ? 'bg-green-100 text-green-800 ring-1 ring-green-200 shadow-sm'
                                        : 'bg-gray-100 text-gray-400'
                                      }`}
                                    title={day} // Add tooltip for full day name
                                  >
                                    {day.substring(0, 1)}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex space-x-3 flex-shrink-0"> {/* Added flex-shrink-0 */}
                              <button type="button" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-primary-300 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book
                              </button>

                              <Link
                                href={`/trainers/${trainer.id}`} // Make sure this route exists
                                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 group"
                              >
                                Profile
                                <svg
                                  className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Enhanced pagination with animations (Placeholder - implement actual logic) */}
              {filteredTrainers.length > 5 && ( // Only show pagination if there are enough items
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex items-center bg-white rounded-lg shadow-md p-1.5 border border-gray-200">
                    <button type="button" className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200 group disabled:opacity-50 disabled:pointer-events-none" disabled> {/* Example: Disable previous */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <button type="button" className="mx-1 w-10 h-10 rounded-md text-sm font-medium bg-primary-600 text-white flex items-center justify-center shadow-sm transform transition hover:scale-105">
                      1
                    </button>

                    <button type="button" className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-colors duration-200">
                      2
                    </button>

                    {/* Add more page numbers or ellipsis as needed */}

                    <button type="button" className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200 group">
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA section with more visual elements */}
      {/* Added mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 for consistent padding */}
      <div className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 z-0"></div>

          {/* Background pattern */}
          {/* Ensure bg-sports-pattern is defined */}
          <div className="absolute inset-0 bg-[url('/path-to-your/sports-pattern.svg')] opacity-10 z-0"></div>

          {/* Decorative blobs and animations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

          {/* Sports equipment decorative icons */}
          <div className="absolute top-10 left-10 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>

          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:py-20 relative z-10">
            <div className="lg:w-0 lg:flex-1">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm mr-3 animate-bounce-subtle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Are you a sports trainer?</h2>
              </div>

              <div className="h-1.5 w-28 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full mb-6"></div>

              <p className="max-w-3xl text-lg text-primary-100">
                Join our platform to connect with athletes looking for your expertise.
                List your services, manage bookings, and grow your coaching business.
              </p>

              <div className="mt-8 flex flex-wrap gap-4"> {/* Adjusted gap */}
                <div className="flex items-center text-primary-100 bg-white/5 rounded-lg px-4 py-2 backdrop-blur-sm text-sm"> {/* Added text-sm */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Increased visibility to potential clients</span>
                </div>
                <div className="flex items-center text-primary-100 bg-white/5 rounded-lg px-4 py-2 backdrop-blur-sm text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Simple booking & payment management</span>
                </div>
                <div className="flex items-center text-primary-100 bg-white/5 rounded-lg px-4 py-2 backdrop-blur-sm text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Build your professional reputation</span>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* FIXED: Added opening <a> tag */}
                <a
                  href="#" // Replace with actual registration link
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-300 transform hover:scale-105"
                >
                  Register as a Trainer
                </a>
                {/* FIXED: Added opening <a> tag */}
                <a
                  href="#" // Replace with actual learn more link
                  className="inline-flex items-center justify-center rounded-lg border border-white bg-transparent px-5 py-3 text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Added badge for credibility */}
              <div className="mt-8 text-center lg:text-right">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-secondary-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trusted by 1000+ trainers across Sri Lanka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Added padding-bottom to the main container */}
      <div className="pb-16"></div>
    </div> // Closing tag for the main container div
  );
}