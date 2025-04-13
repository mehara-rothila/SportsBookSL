'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FacilityCard from '../../components/facilities/FacilityCard';

// Mock data - This would come from an API in a real application
const facilities = [
  {
    id: 'facility-1',
    name: 'Sugathadasa Stadium',
    location: 'Colombo',
    rating: 4.8,
    reviewCount: 124,
    sportTypes: [{ name: 'Athletics' }, { name: 'Swimming' }, { name: 'Basketball' }],
    imageUrl: 'https://images.unsplash.com/photo-1534860741060-ee15f0438609',
    price: 'Rs. 5,000/hr',
    featured: true,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'Flood Lights'],
    indoor: false,
    weatherScore: 85
  },
  {
    id: 'facility-2',
    name: 'Premadasa Cricket Stadium',
    location: 'Colombo',
    rating: 4.9,
    reviewCount: 98,
    sportTypes: [{ name: 'Cricket' }],
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    price: 'Rs. 8,000/hr',
    featured: true,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'Flood Lights', 'Seating'],
    indoor: false,
    weatherScore: 70
  },
  {
    id: 'facility-3',
    name: 'Beddagana Wetland Park Tennis Courts',
    location: 'Sri Jayawardenepura Kotte',
    rating: 4.6,
    reviewCount: 74,
    sportTypes: [{ name: 'Tennis' }],
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    price: 'Rs. 2,500/hr',
    featured: false,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental'],
    indoor: false,
    weatherScore: 90
  },
  {
    id: 'facility-4',
    name: 'Kelaniya Badminton Courts',
    location: 'Kelaniya',
    rating: 4.5,
    reviewCount: 62,
    sportTypes: [{ name: 'Badminton' }],
    imageUrl: 'https://images.unsplash.com/photo-1613918944659-83721b7b8f22',
    price: 'Rs. 1,800/hr',
    featured: false,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'AC'],
    indoor: true,
    weatherScore: 100
  },
  {
    id: 'facility-5',
    name: 'Diyagama Indoor Basketball Court',
    location: 'Homagama',
    rating: 4.7,
    reviewCount: 53,
    sportTypes: [{ name: 'Basketball' }],
    imageUrl: 'https://images.unsplash.com/photo-1505666287802-931dc83a0dc4',
    price: 'Rs. 3,000/hr',
    featured: false,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'AC', 'Refreshments'],
    indoor: true,
    weatherScore: 100
  },
  {
    id: 'facility-6',
    name: 'Torrington Football Ground',
    location: 'Colombo',
    rating: 4.4,
    reviewCount: 89,
    sportTypes: [{ name: 'Football' }],
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68',
    price: 'Rs. 4,500/hr',
    featured: true,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'Flood Lights', 'Seating'],
    indoor: false,
    weatherScore: 65
  },
  {
    id: 'facility-7',
    name: 'SSC Swimming Pool',
    location: 'Colombo',
    rating: 4.8,
    reviewCount: 112,
    sportTypes: [{ name: 'Swimming' }],
    imageUrl: 'https://images.unsplash.com/photo-1600965962323-6364f9754910',
    price: 'Rs. 2,000/hr',
    featured: true,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental', 'Coaches', 'Refreshments'],
    indoor: true,
    weatherScore: 100
  },
  {
    id: 'facility-8',
    name: 'Kandy Tennis Club',
    location: 'Kandy',
    rating: 4.3,
    reviewCount: 42,
    sportTypes: [{ name: 'Tennis' }],
    imageUrl: 'https://images.unsplash.com/photo-1615733267024-26003c3587e9',
    price: 'Rs. 1,800/hr',
    featured: false,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental'],
    indoor: false,
    weatherScore: 80
  },
];

// Filter and sort options
const sportTypeOptions = [
  { value: '', label: 'All Sports' },
  { value: 'cricket', label: 'Cricket' },
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'badminton', label: 'Badminton' },
  { value: 'athletics', label: 'Athletics' },
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'weather', label: 'Best Weather Conditions' },
];

const locationOptions = [
  { value: '', label: 'All Locations' },
  { value: 'colombo', label: 'Colombo' },
  { value: 'kandy', label: 'Kandy' },
  { value: 'galle', label: 'Galle' },
  { value: 'jaffna', label: 'Jaffna' },
  { value: 'negombo', label: 'Negombo' },
];

const amenityOptions = [
  { value: 'parking', label: 'Parking' },
  { value: 'equipment', label: 'Equipment Rental' },
  { value: 'changing', label: 'Changing Rooms' },
  { value: 'floodlights', label: 'Flood Lights' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'refreshments', label: 'Refreshments' },
  { value: 'coaches', label: 'Coaches Available' },
  { value: 'seating', label: 'Spectator Seating' },
];

export default function FacilitiesPage() {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [facilityType, setFacilityType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState(facilities);
  const [weatherAlert, setWeatherAlert] = useState(true);
  const [hoveredFacility, setHoveredFacility] = useState<string | null>(null);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...facilities];
    
    // Sport type filter
    if (sportType) {
      result = result.filter(facility => 
        facility.sportTypes.some(sport => sport.name.toLowerCase() === sportType.toLowerCase())
      );
    }
    
    // Location filter
    if (location) {
      result = result.filter(facility => 
        facility.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Price range filter
    result = result.filter(facility => {
      const price = parseInt(facility.price.replace(/[^0-9]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      result = result.filter(facility => 
        selectedAmenities.every(amenity => 
          facility.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    // Indoor/outdoor filter
    if (facilityType === 'indoor') {
      result = result.filter(facility => facility.indoor);
    } else if (facilityType === 'outdoor') {
      result = result.filter(facility => !facility.indoor);
    }
    
    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'weather') {
      result.sort((a, b) => b.weatherScore - a.weatherScore);
    } else {
      // Recommended - featured items first, then by rating
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    }
    
    setFilteredFacilities(result);
  }, [sportType, location, sortBy, priceRange, selectedAmenities, facilityType]);
  
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => [prev[0], value]);
  };
  
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
                FIND PERFECT VENUES
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Sports Facilities</h1>
              
              {/* Animated divider */}
              <div className="relative flex py-5 items-center justify-start">
                <div className="w-16 h-1 bg-secondary-500 rounded-full animate-pulse-slow"></div>
                <div className="w-3 h-3 mx-2 bg-secondary-400 rounded-full"></div>
                <div className="w-24 h-1 bg-secondary-500 rounded-full animate-pulse-slow animation-delay-200"></div>
              </div>
              
              <p className="mt-2 text-lg text-white/90 max-w-xl animate-fade-in-up animation-delay-300">
                Discover and book premium sports facilities across Sri Lanka for training, matches, and recreation.
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
                List View
              </button>
              <button 
                onClick={() => setIsMapView(true)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-300 ${isMapView ? 'bg-white text-primary-700 shadow-md' : 'bg-transparent text-white hover:bg-white/10'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map View
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
                    Weather Alert
                  </p>
                  <p className="text-sm text-amber-700">
                    Heavy rain forecasted for outdoor facilities in Colombo today. Consider indoor alternatives for your activities.
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
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Filters and sorting */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200/50 transform transition duration-500 hover:shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-3 animate-bounce-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Filter Facilities</h2>
            </div>
            
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all duration-300 group"
                onClick={() => {
                  setSportType('');
                  setLocation('');
                  setSortBy('recommended');
                  setPriceRange([0, 10000]);
                  setSelectedAmenities([]);
                  setFacilityType('');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            <div className="relative group">
              <label htmlFor="sport-type" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                Sport Type
              </label>
              <select
                id="sport-type"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
              >
                {sportTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                Location
              </label>
              <select
                id="location"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                Sort By
              </label>
              <select
                id="sort-by"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-300 group-hover:border-primary-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary-600 transition-colors">
                Facility Type
              </label>
              <div className="flex rounded-lg shadow-sm" role="group">
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium rounded-l-lg border transition-all duration-300 ${
                    facilityType === '' 
                      ? 'bg-primary-600 border-primary-600 text-white shadow-sm' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium border-t border-b transition-all duration-300 ${
                    facilityType === 'indoor' 
                      ? 'bg-primary-600 border-primary-600 text-white shadow-sm' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('indoor')}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium rounded-r-lg border transition-all duration-300 ${
                    facilityType === 'outdoor' 
                      ? 'bg-primary-600 border-primary-600 text-white shadow-sm' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('outdoor')}
                >
                  Outdoor
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced filters - collapsible with smooth animation */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price Range
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm font-medium">Rs. 0</span>
                    <span className="text-gray-800 text-sm font-medium">Rs. {priceRange[1]}</span>
                  </div>
                  <div className="flex items-center relative">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    {/* Price bubble indicator */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary-700 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      Rs. {priceRange[1]}
                      {/* Triangle */}
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-primary-700"></span>
                    </span>
                  </div>
                  <div className="mt-4 text-xs text-center text-gray-500">
                    Drag the slider to set your maximum price per hour
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity.value} className="flex items-center">
                        <input
                          id={`amenity-${amenity.value}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                          checked={selectedAmenities.includes(amenity.value)}
                          onChange={() => toggleAmenity(amenity.value)}
                        />
                        <label htmlFor={`amenity-${amenity.value}`} className="ml-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results section with enhanced weather indicator */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl p-5 shadow-md border border-gray-200/60">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {filteredFacilities.length} facilities found
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {facilityType ? facilityType === 'indoor' ? 'Indoor' : 'Outdoor' : 'All'} facilities {sportType ? `for ${sportType}` : ''}
              </p>
            </div>
          </div>
          
          {/* Enhanced Weather indicator */}
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-4 py-3 shadow-sm border border-blue-200/40 gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white animate-pulse-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-blue-700 font-medium block">Current Weather in Colombo</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-blue-900">Partly Cloudy, 28°C</span>
                <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  72% facility suitability
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isMapView ? (
          // Enhanced Map view placeholder
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] relative border border-gray-200/50">
            {/* Map background pattern */}
            <div className="absolute inset-0 bg-gray-50 z-10 border-4 border-white">
              <div className="absolute inset-0 bg-field-lines opacity-60"></div>
              
              {/* Grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                backgroundSize: "50px 50px"
              }}></div>
              
              {/* Sample location pins on the map */}
              {filteredFacilities.map((facility, index) => {
                // Generate random positions for demo
                const top = 20 + (index * 70) % 500;
                const left = 30 + (index * 110) % 1100;
                
                return (
                  <div 
                    key={facility.id}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-subtle"
                    style={{ top: `${top}px`, left: `${left}px` }}
                  >
                    <div className={`w-6 h-6 rounded-full ${facility.indoor ? 'bg-indigo-500' : 'bg-primary-500'} text-white flex items-center justify-center shadow-lg relative group`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs text-gray-800 whitespace-nowrap hidden group-hover:block border border-gray-200">
                        {facility.name}
                        {/* Triangle */}
                        <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center max-w-md p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-gray-600 mb-4">Our team is working on an interactive map to help you discover sports facilities near you.</p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors">
                    Switch to List View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Enhanced List view with animations and hover effects
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFacilities.map((facility) => (
              <Link 
                href={`/facilities/${facility.id}`} 
                key={facility.id} 
                className="group relative"
                onMouseEnter={() => setHoveredFacility(facility.id)}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col relative border border-gray-200/50">
                  {/* Weather suitability indicator - enhanced */}
                  <div className="absolute top-3 right-3 z-20">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md ${
                        facility.weatherScore >= 80 
                          ? 'bg-green-500' 
                          : facility.weatherScore >= 50 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                      title={`Weather suitability: ${facility.weatherScore}%`}
                    >
                      {facility.indoor ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                      <img
                        src={facility.imageUrl}
                        alt={facility.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Sport type tags - enhanced */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {facility.sportTypes.map((sport, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary-800 shadow-sm"
                        >
                          {sport.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                        {facility.name}
                      </h3>
                      {facility.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200/50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {facility.location}
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <svg
                            key={rating}
                            className={`w-4 h-4 ${
                              facility.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.585l-7.07 3.707 1.354-7.897L.567 6.697l7.92-1.15L10 0l3.513 5.547 7.92 1.15-5.717 5.698 1.354 7.897z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="ml-1 text-sm text-gray-600">
                        {facility.rating} <span className="text-gray-500">({facility.reviewCount})</span>
                      </p>
                    </div>
                    
                    {/* Amenities preview - enhanced with hover effect */}
                    <div className="mt-4 flex flex-wrap gap-1.5 flex-grow">
                      {facility.amenities.slice(0, 3).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50 hover:bg-gray-200 transition-colors duration-200"
                        >
                          {amenity}
                        </span>
                      ))}
                      {facility.amenities.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200/50 hover:bg-gray-200 transition-colors duration-200">
                          +{facility.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-lg font-bold text-primary-700">
                        {facility.price}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 rounded-full text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium hover:bg-primary-200 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* View overlay on hover */}
                  <div className={`absolute inset-0 bg-primary-900/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                    <span className="bg-white text-primary-700 font-bold px-4 py-2 rounded-full shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Facility
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Enhanced pagination with hover effects */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex items-center bg-white rounded-lg shadow-md p-1.5 border border-gray-200/60">
            <button className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium bg-primary-600 text-white flex items-center justify-center shadow-sm">
              1
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-colors duration-200">
              2
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-colors duration-200">
              3
            </button>
            
            <span className="mx-1 w-10 h-10 flex items-center justify-center text-gray-500">...</span>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-colors duration-200">
              8
            </button>
            
            <button className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200 group">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}