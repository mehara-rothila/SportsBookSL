'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 'cricket',
    name: 'Cricket',
    href: '/facilities?sport=cricket',
    imageSrc: '/images/sports/photo-1531415074968-036ba1b575da.jpg',
    description: 'Find cricket grounds, practice nets, and indoor facilities',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    id: 'football',
    name: 'Football',
    href: '/facilities?sport=football',
    imageSrc: '/images/sports/photo-1575361204480-aadea25e6e68.jpg',
    description: 'Discover football grounds and futsal courts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8v7m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'swimming',
    name: 'Swimming',
    href: '/facilities?sport=swimming',
    imageSrc: '/images/sports/tilly-jensen-F20aPGvyhrQ-unsplash.jpg',
    description: 'Book swimming pools and training facilities',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'tennis',
    name: 'Tennis',
    href: '/facilities?sport=tennis',
    imageSrc: '/images/sports/photo-1595435934249-5df7ed86e1c0.jpg',
    description: 'Reserve tennis courts and practice areas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'badminton',
    name: 'Badminton',
    href: '/facilities?sport=badminton',
    imageSrc: '/images/sports/muktasim-azlan-rjWfNR_AC5g-unsplash.jpg',
    description: 'Find badminton courts and training facilities',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: 'basketball',
    name: 'Basketball',
    href: '/facilities?sport=basketball',
    imageSrc: '/images/sports/photo-1627627256672-027a4613d028.jpg',
    description: 'Book basketball courts and practice areas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
];

export default function SportCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 bg-field-lines opacity-40"></div>
      
      {/* Decorative elements - animated blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Sports equipment outline decorations */}
      <div className="absolute top-10 right-40 w-20 h-20 border-2 border-primary-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-40 w-16 h-16 border-2 border-primary-200 rounded-full opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-40 right-96 w-24 h-8 border-2 border-primary-200 rounded-full opacity-20 animate-float animation-delay-1000"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 inline-block mb-4 animate-pulse-slow">EXPLORE FACILITIES</span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl animate-fade-in-down">
            Browse by Sport Category
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-primary-600 rounded"></div>
          </div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
            Find the perfect facility for your favorite sport
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={`
                  overflow-hidden rounded-xl shadow-md transition-all duration-500 
                  ${hoveredId === category.id ? 'shadow-xl scale-[1.03] shadow-primary-200/50' : 'shadow-gray-200/60'}
                `}
              >
                <div className="aspect-h-2 aspect-w-3 h-64 relative shine-effect">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.imageSrc})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/50 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-end p-6 text-white">
                    <div className="w-full">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2.5 bg-primary-500/30 rounded-lg backdrop-blur-sm group-hover:bg-primary-500/50 transition-all duration-300 animate-bounce-subtle">
                          {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-sm text-white/90 max-w-xs mb-4">{category.description}</p>
                      
                      <div 
                        className={`
                          inline-flex items-center px-3 py-1.5 text-sm font-medium text-white
                          bg-white/10 backdrop-blur-sm rounded-lg
                          transition-all duration-300 transform
                          ${hoveredId === category.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        `}
                      >
                        Browse facilities
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/facilities"
            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105"
          >
            View All Sports
            <svg 
              className="ml-2 -mr-0.5 h-5 w-5 transition-transform group-hover:translate-x-1" 
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
    </section>
  );
}