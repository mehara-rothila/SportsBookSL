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
    profileImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f',
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
  {
    id: 'trainer-2',
    name: 'Kumar Sangakkara',
    specialization: 'Batting',
    sports: ['Cricket'],
    location: 'Kandy',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 5.0,
    reviewCount: 124,
    hourlyRate: 3000,
    experience: 20,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    certifications: ['Level 4 Cricket Coach', 'ICC Batting Coach'],
    bio: 'Former Sri Lankan captain and one of the most successful batsmen in Sri Lankan cricket history. I provide comprehensive batting coaching, focusing on technique, mental aspects, and match strategy.',
    languages: ['English', 'Sinhala'],
    facilities: ['Asgiriya Stadium', 'Pallekele International Cricket Stadium']
  },
  {
    id: 'trainer-3',
    name: 'Amali Fernando',
    specialization: 'Swimming',
    sports: ['Swimming'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.8,
    reviewCount: 56,
    hourlyRate: 2000,
    experience: 12,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    certifications: ['FINA Certified Coach', 'National Swimming Coach'],
    bio: 'National swimming coach with experience training athletes for international competitions. I specialize in all four strokes and offer training programs for competitive swimmers as well as beginners.',
    languages: ['English', 'Sinhala'],
    facilities: ['SSC Swimming Pool', 'Sugathadasa Swimming Complex']
  },
  {
    id: 'trainer-4',
    name: 'Sanath Jayasuriya',
    specialization: 'All-round Cricket',
    sports: ['Cricket'],
    location: 'Matara',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4.7,
    reviewCount: 93,
    hourlyRate: 2800,
    experience: 25,
    availability: ['Wednesday', 'Friday', 'Sunday'],
    certifications: ['Level 3 Cricket Coach', 'ICC Development Coach'],
    bio: 'Former international cricketer specializing in aggressive batting and left-arm spin bowling. I provide comprehensive cricket coaching for players of all ages, focusing on developing a complete skill set.',
    languages: ['English', 'Sinhala'],
    facilities: ['Matara Cricket Stadium', 'Galle International Stadium']
  },
  {
    id: 'trainer-5',
    name: 'Dinuka Karunaratne',
    specialization: 'Badminton',
    sports: ['Badminton'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4.6,
    reviewCount: 41,
    hourlyRate: 1800,
    experience: 10,
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    certifications: ['BWF Level 2 Coach', 'National Badminton Coach'],
    bio: 'Former national badminton player with experience in international tournaments. I focus on developing proper technique, footwork, and match strategy for players of all levels.',
    languages: ['English', 'Sinhala'],
    facilities: ['Sugathadasa Indoor Stadium', 'Royal College Sports Complex']
  },
  {
    id: 'trainer-6',
    name: 'Niluka Rajapaksa',
    specialization: 'Tennis',
    sports: ['Tennis'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    rating: 4.8,
    reviewCount: 37,
    hourlyRate: 2200,
    experience: 14,
    availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    certifications: ['ITF Level 2 Coach', 'PTR Professional'],
    bio: 'Professional tennis coach with experience training junior and adult players. I specialize in developing strong technical foundations and tactical understanding of the game.',
    languages: ['English', 'Sinhala', 'French'],
    facilities: ['Sri Lanka Tennis Association Courts', 'Colombo Gymkhana Club']
  },
  {
    id: 'trainer-7',
    name: 'Chamari Athapaththu',
    specialization: 'Women\'s Cricket',
    sports: ['Cricket'],
    location: 'Kurunegala',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    rating: 4.9,
    reviewCount: 28,
    hourlyRate: 2400,
    experience: 12,
    availability: ['Monday', 'Wednesday', 'Friday'],
    certifications: ['Level 2 Cricket Coach', 'Women\'s Cricket Specialist'],
    bio: 'Current Sri Lanka women\'s team captain specializing in batting and bowling techniques for female cricketers. I provide personalized coaching to develop well-rounded cricket skills.',
    languages: ['English', 'Sinhala'],
    facilities: ['Welagedara Stadium', 'Kurunegala Youth Cricket Club']
  },
  {
    id: 'trainer-8',
    name: 'Rohan Perera',
    specialization: 'Basketball',
    sports: ['Basketball'],
    location: 'Colombo',
    profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
    rating: 4.5,
    reviewCount: 32,
    hourlyRate: 1600,
    experience: 8,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    certifications: ['FIBA Certified Coach', 'School Basketball Coach'],
    bio: 'Former national basketball player with extensive coaching experience at school and club levels. I focus on fundamentals, team play, and developing basketball IQ.',
    languages: ['English', 'Sinhala'],
    facilities: ['Sugathadasa Indoor Stadium', 'Royal College Basketball Courts']
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
    if (filters.availability.includes(day)) {
      setFilters({
        ...filters,
        availability: filters.availability.filter(d => d !== day)
      });
    } else {
      setFilters({
        ...filters,
        availability: [...filters.availability, day]
      });
    }
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
          trainer.sports.some(sport => sport.toLowerCase().includes(query))
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
        trainer => filters.availability.some(day => trainer.availability.includes(day))
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
                : rating >= star - 0.5 
                  ? 'text-yellow-400' 
                  : 'text-gray-200'
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
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Background patterns and decorative elements */}
      <div className="absolute inset-0 bg-sports-pattern opacity-10 z-0"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 pb-32">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-40 animate-ken-burns"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900 to-primary-800 opacity-70" />
        </div>
        
        {/* Sports equipment outline decorations */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/10 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-white/10 rounded-full opacity-20"></div>
        <div className="absolute top-40 left-1/3 w-16 h-6 border-2 border-white/10 rounded-full opacity-20"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          
          {/* Featured sports icons */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-80">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>
            </div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float animation-delay-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-float animation-delay-1000">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative -mt-32 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 z-10">
        <div className="rounded-2xl bg-white shadow-xl">
          {/* Search and sort section */}
          <div className="px-6 py-6 sm:p-8">
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
                <div>
                  <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700">Sort by</label>
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300 shadow-sm"
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
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
            
            {/* Mobile filters (show/hide based on filter open state) */}
            <Transition
              show={isFilterOpen}
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="md:hidden"
            >
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Filters</h3>
                <div className="mt-4 grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="mobile-sport" className="block text-sm font-medium text-gray-700">Sport</label>
                    <select
                      id="mobile-sport"
                      name="mobile-sport"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300"
                      value={filters.sport}
                      onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                    >
                      {sportOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mobile-location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                      id="mobile-location"
                      name="mobile-location"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                      {locationOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mobile-rating" className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                      id="mobile-rating"
                      name="mobile-rating"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300"
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    >
                      {ratingOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mobile-price" className="block text-sm font-medium text-gray-700">Price Range</label>
                    <select
                      id="mobile-price"
                      name="mobile-price"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm transition-all duration-300"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                      {priceRangeOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75 transition-all duration-300">
                            <span>Availability</span>
                            {open ? (
                              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2">
                            <div className="space-y-2">
                              {daysOfWeek.map((day) => (
                                <div key={day} className="flex items-start">
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
                                    <label htmlFor={`mobile-day-${day}`} className="font-medium text-gray-700">
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
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-all duration-300"
                    onClick={resetFilters}
                  >
                    Reset all filters
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Desktop filters */}
            <div className="hidden md:block bg-gray-50 p-6 lg:w-64 lg:rounded-bl-2xl">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <div className="mt-6 space-y-8">
                <div>
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2">Sport</legend>
                    <div className="mt-2 space-y-3">
                      {sportOptions.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            id={`sport-${option.id}`}
                            name="sport"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.sport === option.id}
                            onChange={() => setFilters({ ...filters, sport: option.id })}
                          />
                          <label htmlFor={`sport-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                
                <div>
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2">Location</legend>
                    <div className="mt-2 space-y-3">
                      {locationOptions.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            id={`location-${option.id}`}
                            name="location"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.location === option.id}
                            onChange={() => setFilters({ ...filters, location: option.id })}
                          />
                          <label htmlFor={`location-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                
                <div>
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2">Rating</legend>
                    <div className="mt-2 space-y-3">
                      {ratingOptions.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            id={`rating-${option.id}`}
                            name="rating"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.rating === option.id}
                            onChange={() => setFilters({ ...filters, rating: option.id })}
                          />
                          <label htmlFor={`rating-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                
                <div>
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2">Price Range</legend>
                    <div className="mt-2 space-y-3">
                      {priceRangeOptions.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            id={`price-${option.id}`}
                            name="price"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                            checked={filters.priceRange === option.id}
                            onChange={() => setFilters({ ...filters, priceRange: option.id })}
                          />
                          <label htmlFor={`price-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                
                <div>
                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-gray-900 border-b pb-2">Availability</legend>
                    <div className="mt-2 space-y-3">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id={`day-${day}`}
                              name={`day-${day}`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                              checked={filters.availability.includes(day)}
                              onChange={() => toggleDaySelection(day)}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`day-${day}`} className="font-medium text-gray-700">
                              {day}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                    onClick={resetFilters}
                  >
                    Reset all filters
                  </button>
                  <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
                    {filteredTrainers.length} found
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trainer listings */}
            <div className="flex-1 p-6">
              <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-gray-900">Expert Trainers</h2>
                <p className="mt-2 text-sm font-medium px-3 py-1 bg-gray-100 rounded-full inline-flex items-center sm:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {filteredTrainers.length} trainers found
                </p>
              </div>
              
              {filteredTrainers.length === 0 ? (
                <div className="mt-16 text-center py-16 rounded-xl bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No trainers found</h3>
                  <p className="mt-2 text-gray-600 max-w-md mx-auto">Try adjusting your search or filter criteria to find trainers that match your requirements.</p>
                  <div className="mt-8">
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
                </div>
              ) : (
                <ul role="list" className="mt-8 space-y-6">
                  {filteredTrainers.map((trainer) => (
                    <li 
                      key={trainer.id} 
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                      onMouseEnter={() => setHoveredTrainer(trainer.id)}
                      onMouseLeave={() => setHoveredTrainer(null)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative aspect-square w-full md:w-64 flex-shrink-0 overflow-hidden">
                          <img
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            src={trainer.profileImage}
                            alt={trainer.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 md:opacity-100"></div>
                          <div className="absolute bottom-3 left-3 md:opacity-100 opacity-0">
                            <div className="flex flex-wrap gap-1.5">
                              {trainer.sports.map((sport) => (
                                <span
                                  key={sport}
                                  className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {sport}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Experience badge */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center rounded-full bg-primary-100 bg-opacity-90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-primary-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {trainer.experience} years
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{trainer.name}</h3>
                              <p className="text-lg font-bold text-primary-600">{formatCurrency(trainer.hourlyRate)}
                                <span className="text-sm text-gray-500">/hr</span>
                              </p>
                            </div>
                            
                            <div className="mt-1 flex items-center">
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-2">
                                {trainer.specialization}
                              </span>
                              <span className="flex items-center text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {trainer.location}
                              </span>
                            </div>
                            
                            <div className="mt-3 flex items-center">
                              {renderStars(trainer.rating)}
                              <p className="ml-2 text-sm font-medium text-gray-700">
                                {trainer.rating} ({trainer.reviewCount} reviews)
                              </p>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {trainer.certifications.slice(0, 2).map((cert, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  {cert}
                                </span>
                              ))}
                              {trainer.certifications.length > 2 && (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-800">
                                  +{trainer.certifications.length - 2} more
                                </span>
                              )}
                            </div>
                            
                            <p className="mt-4 text-sm text-gray-600 line-clamp-2">{trainer.bio}</p>
                            
                            {/* Facilities */}
                            <div className="mt-3 flex items-center text-sm text-gray-500 space-x-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="text-xs">Facilities: {trainer.facilities.join(', ')}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-700 mb-2">Available on: </span>
                              <div className="flex space-x-1.5">
                                {daysOfWeek.map((day) => (
                                  <span
                                    key={day}
                                    className={`inline-block w-8 text-center text-xs font-medium rounded-md px-1.5 py-1 ${
                                      trainer.availability.includes(day)
                                        ? 'bg-green-100 text-green-800 ring-1 ring-green-200'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                                  >
                                    {day.substring(0, 1)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Session
                              </button>
                              
                              <Link
                                href={`/trainers/${trainer.id}`}
                                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 group"
                              >
                                View Profile
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-xl relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-sports-pattern opacity-10"></div>
          
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob animation-delay-2000"></div>
          
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:py-20 relative">
            <div className="lg:w-0 lg:flex-1">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm mr-3 animate-bounce-subtle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Are you a sports trainer?</h2>
              </div>
              
              <div className="h-1 w-20 bg-secondary-500 rounded-full mb-6"></div>
              
              <p className="max-w-3xl text-lg text-primary-100">
                Join our platform to connect with athletes looking for your expertise. 
                List your services, manage bookings, and grow your coaching business.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center text-primary-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Increased visibility to potential clients</span>
                </div>
                <div className="flex items-center text-primary-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Simple booking and payment management</span>
                </div>
                <div className="flex items-center text-primary-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Build your professional reputation</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-300 transform hover:scale-105"
                >
                  Register as a Trainer
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-white bg-transparent px-5 py-3 text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}