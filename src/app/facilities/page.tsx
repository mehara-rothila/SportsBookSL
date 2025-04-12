'use client';

import { useState } from 'react';
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
];

export default function FacilitiesPage() {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary-700 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Sports Facilities</h1>
          <p className="mt-2 text-lg text-white/80">
            Find and book sports facilities across Sri Lanka
          </p>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and sorting */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="sport-type" className="block text-sm font-medium text-gray-700 mb-1">
                Sport Type
              </label>
              <select
                id="sport-type"
                className="input-field"
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
              <input
                type="text"
                id="location"
                className="input-field"
                placeholder="City or District"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort-by"
                className="input-field"
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
            
            <div className="flex items-end">
              <button className="btn-primary w-full">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              id={facility.id}
              name={facility.name}
              location={facility.location}
              rating={facility.rating}
              reviewCount={facility.reviewCount}
              sportTypes={facility.sportTypes}
              imageUrl={facility.imageUrl}
              price={facility.price}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center">
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              Previous
            </button>
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium bg-primary-50 text-primary-600">
              1
            </button>
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              2
            </button>
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              3
            </button>
            <span className="mx-1 px-3 py-2 text-gray-500">...</span>
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              8
            </button>
            <button className="mx-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}