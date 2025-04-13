// src/app/donations/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DonationCard from '../../components/donations/DonationCard';

// Mock athlete data
const athletes = [
  {
    id: 'athlete-1',
    name: 'Dinesh Priyantha',
    age: 16,
    sport: 'Cricket',
    goal: 150000,
    raised: 75000,
    image: 'https://images.unsplash.com/photo-1531891570158-e71b35a485bc',
    achievements: ['District Champion', 'School Captain', 'Best Bowler 2024'],
    story: 'Young fast bowler from rural Kandy with exceptional talent. Needs support to access professional training facilities and equipment to pursue his cricket dream.',
    location: 'Kandy'
  },
  {
    id: 'athlete-2',
    name: 'Amali Fernando',
    age: 17,
    sport: 'Swimming',
    goal: 200000,
    raised: 140000,
    image: 'https://images.unsplash.com/photo-1560090995-01632a28895b',
    achievements: ['National Junior Champion', 'Record Holder', 'School Sports Star'],
    story: 'National level swimmer with Olympic potential. Seeking support for advanced training, international competition fees, and access to Olympic-standard pools.',
    location: 'Colombo'
  },
  {
    id: 'athlete-3',
    name: 'Malik Rahman',
    age: 15,
    sport: 'Athletics',
    goal: 120000,
    raised: 36000,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5',
    achievements: ['Junior Sprint Champion', 'Regional Gold Medalist'],
    story: 'Talented sprinter from underprivileged background shows exceptional promise. Needs financial support for professional coaching, proper running shoes, and competition fees.',
    location: 'Galle'
  },
  {
    id: 'athlete-4',
    name: 'Tharushi Dissanayake',
    age: 18,
    sport: 'Badminton',
    goal: 180000,
    raised: 126000,
    image: 'https://images.unsplash.com/photo-1521093470119-a3acdc43374a',
    achievements: ['National Champion', 'International Bronze Medalist', 'National Team Member'],
    story: 'National badminton player aspiring to compete internationally. Seeking support for training equipment, court fees, and international tournament expenses.',
    location: 'Colombo'
  },
  {
    id: 'athlete-5',
    name: 'Sanjaya Perera',
    age: 14,
    sport: 'Tennis',
    goal: 250000,
    raised: 50000,
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
    achievements: ['Junior Tournament Winner', 'Rising Star Award'],
    story: 'Young tennis prodigy with exceptional hand-eye coordination and technique. Needs support for professional coaching, court time, and proper equipment.',
    location: 'Negombo'
  },
  {
    id: 'athlete-6',
    name: 'Kavisha Bandara',
    age: 16,
    sport: 'Basketball',
    goal: 130000,
    raised: 78000,
    image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4',
    achievements: ['School Team Captain', 'Tournament MVP', 'All-Star Selection'],
    story: 'Tall and talented basketball player with natural leadership abilities. Seeking support for advanced training, proper basketball shoes, and nutrition supplements.',
    location: 'Kurunegala'
  },
  {
    id: 'athlete-7',
    name: 'Nishmi Jayasinghe',
    age: 15,
    sport: 'Gymnastics',
    goal: 300000,
    raised: 210000,
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1',
    achievements: ['Junior National Champion', 'International Competitor', 'Perfect 10 Award'],
    story: 'Artistic gymnast with extraordinary flexibility and balance. Requires support for specialized training, competition leotards, and international competition travel.',
    location: 'Colombo'
  },
  {
    id: 'athlete-8',
    name: 'Raveen Gunawardena',
    age: 17,
    sport: 'Football',
    goal: 160000,
    raised: 64000,
    image: 'https://images.unsplash.com/photo-1623595119708-26b1f7458247',
    achievements: ['School Team Captain', 'Best Striker Award'],
    story: 'Skilled striker with excellent ball control and speed. Needs support for professional training, football boots, and transportation to facilities.',
    location: 'Gampaha'
  }
];

// Filter options
const sportOptions = [
  { id: 'all', name: 'All Sports' },
  { id: 'cricket', name: 'Cricket' },
  { id: 'swimming', name: 'Swimming' },
  { id: 'athletics', name: 'Athletics' },
  { id: 'badminton', name: 'Badminton' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'gymnastics', name: 'Gymnastics' },
  { id: 'football', name: 'Football' }
];

const locationOptions = [
  { id: 'all', name: 'All Locations' },
  { id: 'colombo', name: 'Colombo' },
  { id: 'kandy', name: 'Kandy' },
  { id: 'galle', name: 'Galle' },
  { id: 'negombo', name: 'Negombo' },
  { id: 'kurunegala', name: 'Kurunegala' },
  { id: 'gampaha', name: 'Gampaha' }
];

export default function DonationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter and sort athletes
  const filteredAthletes = athletes.filter(athlete => {
    // Apply sport filter
    if (selectedSport !== 'all' && athlete.sport.toLowerCase() !== selectedSport.toLowerCase()) {
      return false;
    }
    
    // Apply location filter
    if (selectedLocation !== 'all' && athlete.location.toLowerCase() !== selectedLocation.toLowerCase()) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        athlete.name.toLowerCase().includes(query) ||
        athlete.sport.toLowerCase().includes(query) ||
        athlete.story.toLowerCase().includes(query)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === 'goal-high') {
      return b.goal - a.goal;
    } else if (sortBy === 'goal-low') {
      return a.goal - b.goal;
    } else if (sortBy === 'progress') {
      return (b.raised / b.goal) - (a.raised / a.goal);
    }
    
    // Default: recommended
    return 0;
  });

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero-background');
      const heroContent = document.getElementById('hero-content');
      
      if (heroSection && heroContent) {
        heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroContent.style.opacity = Math.max(1 - scrollY * 0.002, 0.2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 min-h-screen relative">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-equipment-pattern opacity-10 pointer-events-none"></div>
      
      {/* Hero section with parallax effect */}
      <div className="relative h-[100vh] overflow-hidden flex items-center" id="hero-section">
        <div 
          id="hero-background" 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211')",
            transform: "translateY(0px)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90"></div>
          
          {/* Animated decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-indigo-500/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-32 border-2 border-purple-500/20 rounded-full animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute top-2/3 right-1/3 w-16 h-16 border-2 border-pink-500/20 rounded-full animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div 
          id="hero-content"
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" 
          style={{ transform: "translateY(0px)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-bounce-subtle mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ATHLETE SUPPORT PROGRAM
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-6 drop-shadow-lg animate-fade-in-down">
              Support Rising Athletes
            </h1>
            
            <p className="mt-6 text-xl sm:text-2xl text-indigo-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              Help talented Sri Lankan athletes access quality training facilities and equipment. Your donation can transform potential into achievement.
            </p>
            
            <div className="mt-10 max-w-xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up animation-delay-500">
                <div className="p-8">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Why Donate?
                  </h2>
                  <ul className="space-y-5">
                    <li className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-600/30 rounded-xl flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">100% Direct Impact</h3>
                        <p className="text-indigo-200 text-sm">Your entire donation goes directly to the athletes, funding their facilities and equipment</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600/30 rounded-xl flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Track Your Impact</h3>
                        <p className="text-indigo-200 text-sm">Follow athletes' progress and see how your contribution makes a real difference</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-600/30 rounded-xl flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Tax Benefits</h3>
                        <p className="text-indigo-200 text-sm">Receive tax benefits for your charitable contribution to Sri Lankan sports development</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-700">
              <a 
                href="#browse-athletes" 
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Athletes
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How It Works
              </a>
            </div>
            
            <div className="absolute bottom-10 left-0 right-0 animate-bounce">
              <a href="#browse-athletes" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div id="how-it-works" className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 mb-4">
              THE PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How the Support Program Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've made it simple to connect talented athletes with generous sponsors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-bl-[100px]"></div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all duration-300">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Athletes Apply for Support</h3>
              <p className="text-gray-600 mb-4">Talented athletes submit applications detailing their achievements, goals, and specific needs for training support.</p>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center text-indigo-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Verified sports achievements</span>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-bl-[100px]"></div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Donors Browse & Contribute</h3>
              <p className="text-gray-600 mb-4">Donors can explore athlete profiles, learn about their stories, and make contributions towards their specific goals.</p>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center text-purple-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Secure payment process</span>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-bl-[100px]"></div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center mb-6 shadow-lg group-hover:bg-gradient-to-br group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Athletes Achieve Goals</h3>
              <p className="text-gray-600 mb-4">Athletes receive the support, train at quality facilities, and share their progress and achievements with sponsors.</p>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center text-pink-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Real-time progress updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and search section */}
      <div id="browse-athletes" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section title */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 mb-4">
            ATHLETES DIRECTORY
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Rising Stars</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our talented athletes and help them achieve their sporting dreams
          </p>
        </div>
        
        {/* Advanced filters card */}
        <div className="bg-white rounded-2xl shadow-xl mb-12 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Find Athletes
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium rounded-lg transition-colors"
              >
                {showFilters ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Hide Filters
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Show Filters
                  </>
                )}
              </button>
            </div>
            
            {/* Search Box */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                name="search"
                className="block w-full pl-14 pr-4 py-4 border border-indigo-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Search athletes by name, sport, or story..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Advanced Filters (conditionally shown) */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${showFilters ? 'block animate-fade-in' : 'hidden'}`}>
              <div className="space-y-2">
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sport Type
                </label>
                <div className="relative">
                  <select
                    id="sport"
                    name="sport"
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    {sportOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location"
                    name="location"
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    {locationOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Sort By
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    name="sort"
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="goal-high">Highest Goal</option>
                    <option value="goal-low">Lowest Goal</option>
                    <option value="progress">Most Progress</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Filter actions (only when filters are visible) */}
            {showFilters && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  {filteredAthletes.length} athletes matching your criteria
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSport('all');
                    setSelectedLocation('all');
                    setSortBy('recommended');
                  }}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Athletes Seeking Support</h3>
          <div className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">
            {filteredAthletes.length} results
          </div>
        </div>
        
        {/* Athletes grid */}
        {filteredAthletes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No athletes found</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any athletes matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSport('all');
                setSelectedLocation('all');
                setSortBy('recommended');
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-bold transition-all duration-300 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAthletes.map((athlete) => (
              <DonationCard
                key={athlete.id}
                athleteId={athlete.id}
                name={athlete.name}
                age={athlete.age}
                sport={athlete.sport}
                goal={athlete.goal}
                raised={athlete.raised}
                image={athlete.image}
                achievements={athlete.achievements}
                story={athlete.story}
                location={athlete.location}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Success stories section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-24 relative">
        <div className="absolute inset-0 bg-equipment-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 mb-4">
              IMPACT STORIES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how your donations have transformed the careers of talented athletes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515523110800-9415d13b84a8"
                  alt="Swimmer"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">Lakshitha Perera</h3>
                    <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Swimming
                    </p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">
                    National Champion
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  "The financial support I received through SportsBookSL allowed me to train at Olympic-standard facilities. Now I'm proud to represent Sri Lanka internationally."
                </p>
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Total raised:</p>
                    <p className="font-bold text-indigo-700">Rs. 320,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supporters:</p>
                    <p className="font-bold text-indigo-700">58</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5"
                  alt="Athlete"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">Dilini Fernando</h3>
                    <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Athletics
                    </p>
                  </div>
                  <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                    Gold Medalist
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  "Coming from a rural village, I never thought I'd have access to professional training. Thanks to the donors who believed in me, I've achieved my dreams."
                </p>
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Total raised:</p>
                    <p className="font-bold text-purple-700">Rs. 275,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supporters:</p>
                    <p className="font-bold text-purple-700">43</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group transform hover:scale-105 transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff"
                  alt="Cricket player"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">Sandun Weerasinghe</h3>
                    <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Cricket
                    </p>
                  </div>
                  <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    National Team
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  "The equipment and coaching I received through donations helped me develop my bowling technique. I'm now proud to wear our national jersey."
                </p>
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Total raised:</p>
                    <p className="font-bold text-green-700">Rs. 420,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supporters:</p>
                    <p className="font-bold text-green-700">76</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/donations/success-stories"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              View All Success Stories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900">
          <div className="absolute inset-0 bg-equipment-pattern opacity-10"></div>
        </div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/20 mix-blend-multiply filter blur-3xl animate-blob"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to make a difference?
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-4 mb-6"></div>
                <p className="mt-4 max-w-3xl text-lg text-indigo-100">
                  Join our community of donors supporting the next generation of Sri Lankan athletes. Your contribution, no matter how small, can help transform potential into achievement.
                </p>
                
                <div className="mt-8 flex space-y-4 flex-col sm:flex-row sm:space-y-0 sm:space-x-5">
                  <Link
                    href="/donations/athletes"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-8 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                  >
                    Browse Athletes
                  </Link>
                  <Link
                    href="/donations/become-sponsor"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 md:py-4 md:text-lg md:px-8 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                  >
                    Become a Sponsor
                  </Link>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:ml-12 lg:w-1/3 lg:flex-shrink-0 relative">
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden transform rotate-3 shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1526763025849-26a4d2dea110"
                    alt="Athletes celebrating"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                      Support Their Journey
                    </span>
                  </div>
                </div>
                
                {/* Stats bubbles */}
                <div className="absolute -top-10 -left-10 bg-indigo-600 text-white rounded-full h-24 w-24 flex flex-col items-center justify-center shadow-lg transform -rotate-12 p-2">
                  <div className="text-2xl font-bold">96%</div>
                  <div className="text-xs text-center">Success Rate</div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white rounded-full h-20 w-20 flex flex-col items-center justify-center shadow-lg p-2">
                  <div className="text-xl font-bold">450+</div>
                  <div className="text-xs">Athletes</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-white">Verified Athletes</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-white">Secure Donations</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm text-white">Regular Updates</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-white">Community Support</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}