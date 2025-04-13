'use client';

import { useState } from 'react';
import Link from 'next/link';

const facilities = [
  {
    id: 'facility-1',
    name: 'Sugathadasa Stadium',
    location: 'Colombo',
    rating: 4.8,
    reviews: 124,
    sportTypes: ['Athletics', 'Swimming', 'Basketball'],
    image: 'https://images.unsplash.com/photo-1534860741060-ee15f0438609',
    price: 'Rs. 5,000/hr',
    isNew: false,
    premium: true,
  },
  {
    id: 'facility-2',
    name: 'Premadasa Cricket Stadium',
    location: 'Colombo',
    rating: 4.9,
    reviews: 98,
    sportTypes: ['Cricket'],
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    price: 'Rs. 8,000/hr',
    isNew: false,
    premium: true,
  },
  {
    id: 'facility-3',
    name: 'Beddagana Wetland Park Tennis Courts',
    location: 'Sri Jayawardenepura Kotte',
    rating: 4.6,
    reviews: 74,
    sportTypes: ['Tennis'],
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    price: 'Rs. 2,500/hr',
    isNew: true,
    premium: false,
  },
  {
    id: 'facility-4',
    name: 'Kelaniya Badminton Courts',
    location: 'Kelaniya',
    rating: 4.5,
    reviews: 62,
    sportTypes: ['Badminton'],
    image: 'https://images.unsplash.com/photo-1613918944659-83721b7b8f22',
    price: 'Rs. 1,800/hr',
    isNew: false,
    premium: false,
  },
  {
    id: 'facility-5',
    name: 'Kurunegala Swimming Complex',
    location: 'Kurunegala',
    rating: 4.7,
    reviews: 89,
    sportTypes: ['Swimming'],
    image: 'https://images.unsplash.com/photo-1565104881139-c2fb373aa9e7',
    price: 'Rs. 3,200/hr',
    isNew: true,
    premium: false,
  },
  {
    id: 'facility-6',
    name: 'Galle Cricket Stadium',
    location: 'Galle',
    rating: 4.8,
    reviews: 156,
    sportTypes: ['Cricket'],
    image: 'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46',
    price: 'Rs. 7,500/hr',
    isNew: false,
    premium: true,
  },
  {
    id: 'facility-7',
    name: 'Kandy Tennis Club',
    location: 'Kandy',
    rating: 4.4,
    reviews: 53,
    sportTypes: ['Tennis'],
    image: 'https://images.unsplash.com/photo-1625402535207-900f8e91faba',
    price: 'Rs. 2,200/hr',
    isNew: false,
    premium: false,
  },
  {
    id: 'facility-8',
    name: 'Negombo Beach Volleyball Courts',
    location: 'Negombo',
    rating: 4.6,
    reviews: 78,
    sportTypes: ['Volleyball'],
    image: 'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46',
    price: 'Rs. 1,500/hr',
    isNew: true,
    premium: false,
  },
];

export default function FeaturedFacilities() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const filters = [
    { id: 'all', name: 'All Facilities' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'swimming', name: 'Swimming' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'new', name: 'Newly Added' },
    { id: 'premium', name: 'Premium' },
  ];
  
  const filteredFacilities = facilities.filter(facility => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return facility.isNew;
    if (activeFilter === 'premium') return facility.premium;
    return facility.sportTypes.some(sport => sport.toLowerCase() === activeFilter.toLowerCase());
  }).slice(0, 4); // Show only first 4 after filtering
  
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-sports-dots opacity-40"></div>
      
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 inline-block mb-4">TOP RATED</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Facilities
            </h2>
            <div className="mt-4 w-20 h-1 bg-primary-600 rounded"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Discover top-rated sports facilities across Sri Lanka
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-sm p-2 rounded-xl shadow-sm">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${activeFilter === filter.id 
                    ? 'bg-primary-100 text-primary-800 shadow-sm transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                `}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFacilities.map((facility) => (
            <Link
              key={facility.id}
              href={`/facilities/${facility.id}`}
              className="group flex flex-col h-full"
              onMouseEnter={() => setHoveredId(facility.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={`
                  relative overflow-hidden rounded-xl shadow-md transition-all duration-500 flex-grow
                  ${hoveredId === facility.id ? 'shadow-lg shadow-primary-200/50 scale-[1.03]' : ''}
                `}
              >
                {facility.isNew && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ring-2 ring-green-100/50 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      New
                    </span>
                  </div>
                )}
                
                {facility.premium && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ring-2 ring-amber-100/50 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 animate-pulse-slow" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                      Premium
                    </span>
                  </div>
                )}
                
                <div className="aspect-w-16 aspect-h-9 w-full shine-effect">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${facility.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white backdrop-blur-sm bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-1">{facility.name}</h3>
                  <div className="flex items-center text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 font-medium">{facility.rating}</span>
                    <span className="ml-1 text-white/70">({facility.reviews})</span>
                    
                    <span className="mx-2">•</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="ml-1">{facility.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {facility.sportTypes.map((sport) => (
                      <span key={sport} className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium ring-1 ring-white/10">
                        {sport}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium bg-primary-600/90 px-3 py-1 rounded-lg text-sm">{facility.price}</span>
                    
                    <span 
                      className={`
                        flex items-center text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg
                        transition-all duration-500 transform
                        ${hoveredId === facility.id ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                      `}
                    >
                      Book now
                      <svg 
                        className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
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
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/facilities"
            className="inline-flex items-center rounded-lg border border-primary-600 px-6 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10">View All Facilities</span>
            <svg 
              className="ml-2 -mr-0.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" 
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
            <span className="absolute inset-0 bg-primary-50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}