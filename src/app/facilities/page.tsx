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
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Header with Weather Alert */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 py-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px"
          }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Sports Facilities</h1>
              <p className="mt-2 text-lg text-white/80">
                Find and book sports facilities across Sri Lanka
              </p>
            </div>
            
            <div className="flex mt-4 md:mt-0">
              <button 
                onClick={() => setIsMapView(false)}
                className={`px-4 py-2 rounded-l-lg font-medium text-sm flex items-center ${!isMapView ? 'bg-white text-primary-700' : 'bg-primary-600 text-white hover:bg-primary-500'} transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                List
              </button>
              <button 
                onClick={() => setIsMapView(true)}
                className={`px-4 py-2 rounded-r-lg font-medium text-sm flex items-center ${isMapView ? 'bg-white text-primary-700' : 'bg-primary-600 text-white hover:bg-primary-500'} transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Alert Banner - New Component */}
      {weatherAlert && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-t border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-medium text-amber-800">
                  <span className="font-bold">Weather Alert:</span> Heavy rain forecasted for outdoor facilities in Colombo today. Consider indoor alternatives.
                </p>
              </div>
              <button 
                onClick={() => setWeatherAlert(false)}
                className="ml-auto flex-shrink-0 flex text-amber-500 hover:text-amber-700 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Filters and sorting */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filter Facilities</h2>
            
            <div className="flex space-x-2 mt-4 lg:mt-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => {
                  setSportType('');
                  setLocation('');
                  setSortBy('recommended');
                  setPriceRange([0, 10000]);
                  setSelectedAmenities([]);
                  setFacilityType('');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="sport-type" className="block text-sm font-medium text-gray-700 mb-1">
                Sport Type
              </label>
              <select
                id="sport-type"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
            
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort-by"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
            
            <div>
              <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-1">
                Facility Type
              </label>
              <div className="flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium rounded-l-md border ${
                    facilityType === '' 
                      ? 'bg-primary-50 border-primary-500 text-primary-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium border-t border-b ${
                    facilityType === 'indoor' 
                      ? 'bg-primary-50 border-primary-500 text-primary-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('indoor')}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  className={`w-1/3 py-2 px-4 text-sm font-medium rounded-r-md border ${
                    facilityType === 'outdoor' 
                      ? 'bg-primary-50 border-primary-500 text-primary-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } focus:z-10 focus:ring-2 focus:ring-primary-500 focus:text-primary-700`}
                  onClick={() => setFacilityType('outdoor')}
                >
                  Outdoor
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced filters - collapsible */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                  <div className="flex items-center">
                    <span className="mr-4 text-gray-600 text-sm">Rs. 0</span>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-4 text-gray-600 text-sm">Rs. {priceRange[1]}</span>
                  </div>
                  <div className="mt-2 text-right text-sm text-gray-600">
                    Max price: Rs. {priceRange[1]}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity.value} className="flex items-center">
                        <input
                          id={`amenity-${amenity.value}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={selectedAmenities.includes(amenity.value)}
                          onChange={() => toggleAmenity(amenity.value)}
                        />
                        <label htmlFor={`amenity-${amenity.value}`} className="ml-2 text-sm text-gray-700">
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
        
        {/* Results section with weather indicator */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredFacilities.length} facilities found
          </h2>
          
          {/* Weather indicator */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Current Weather: <span className="font-medium">Partly Cloudy, 28°C</span></span>
          </div>
        </div>
        
        {isMapView ? (
          // Map view placeholder (would be an actual map in production)
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px] relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">Map View Coming Soon</p>
                <p className="text-gray-400 mt-2">Interactive map with facility locations</p>
              </div>
            </div>
          </div>
        ) : (
          // List view
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFacilities.map((facility) => (
              <Link href={`/facilities/${facility.id}`} key={facility.id} className="group">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-md h-full flex flex-col">
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={facility.imageUrl}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Sport type tags */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {facility.sportTypes.map((sport, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {sport.name}
                        </span>
                      ))}
                    </div>
                    
                    {/* Weather suitability indicator */}
                    <div className="absolute top-2 right-2">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          facility.weatherScore >= 80 
                            ? 'bg-green-500' 
                            : facility.weatherScore >= 50 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        title={`Weather suitability: ${facility.weatherScore}%`}
                      >
                        {facility.indoor ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {facility.name}
                      </h3>
                      {facility.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-500 flex items-center">
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
                      <p className="ml-1 text-sm text-gray-500">
                        {facility.rating} ({facility.reviewCount})
                      </p>
                    </div>
                    
                    {/* Amenities preview */}
                    <div className="mt-3 flex flex-wrap gap-1 flex-grow">
                      {facility.amenities.slice(0, 3).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                        >
                          {amenity}
                        </span>
                      ))}
                      {facility.amenities.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                          +{facility.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        {facility.price}
                      </p>
                      <button className="inline-flex items-center justify-center rounded-full p-1 text-primary-600 hover:bg-primary-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Enhanced pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center">
            <button className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium bg-primary-50 text-primary-600 flex items-center justify-center">
              1
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 flex items-center justify-center">
              2
            </button>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 flex items-center justify-center">
              3
            </button>
            
            <span className="mx-1 w-10 h-10 flex items-center justify-center text-gray-500">...</span>
            
            <button className="mx-1 w-10 h-10 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 flex items-center justify-center">
              8
            </button>
            
            <button className="mx-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}