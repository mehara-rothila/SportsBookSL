// src/app/donations/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="relative bg-primary-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply opacity-20"
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
            alt="Athletes in training"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-700" aria-hidden="true"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Support Rising Athletes</h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            Help talented Sri Lankan athletes access quality training facilities and equipment. Your donation can transform potential into achievement.
          </p>
          
          <div className="mt-10 max-w-xl">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Why donate?</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-700">100% of your donation goes directly to the athletes</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Track how your donation is making a difference</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-700">Receive tax benefits for your charitable contribution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="md:max-w-lg w-full">
              <label htmlFor="search" className="sr-only">Search athletes</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search athletes by name, sport, or story"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Sport</label>
                <select
                  id="sport"
                  name="sport"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  {sportOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locationOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  id="sort"
                  name="sort"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="goal-high">Highest Goal</option>
                  <option value="goal-low">Lowest Goal</option>
                  <option value="progress">Most Progress</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Athletes Seeking Support</h2>
          <p className="text-sm text-gray-500">{filteredAthletes.length} results</p>
        </div>
        
        {/* Athletes grid */}
        {filteredAthletes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No athletes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSport('all');
                setSelectedLocation('all');
                setSortBy('recommended');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reset Filters
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
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Success Stories</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              See how your donations have transformed the careers of talented athletes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515523110800-9415d13b84a8"
                  alt="Swimmer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Lakshitha Perera</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">Swimming • National Champion</p>
                <p className="text-gray-600 text-sm">
                  "The financial support I received through SportsBookSL allowed me to train at Olympic-standard facilities. Now I'm proud to represent Sri Lanka internationally."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Total raised: <span className="font-medium text-gray-900">Rs. 320,000</span></p>
                  <p className="text-sm text-gray-500">Supporters: <span className="font-medium text-gray-900">58</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5"
                  alt="Athlete"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Dilini Fernando</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">Athletics • South Asian Gold Medalist</p>
                <p className="text-gray-600 text-sm">
                  "Coming from a rural village, I never thought I'd have access to professional training. Thanks to the donors who believed in me, I've achieved my dreams."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Total raised: <span className="font-medium text-gray-900">Rs. 275,000</span></p>
                  <p className="text-sm text-gray-500">Supporters: <span className="font-medium text-gray-900">43</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff"
                  alt="Cricket player"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Sandun Weerasinghe</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">Cricket • National Team Player</p>
                <p className="text-gray-600 text-sm">
                  "The equipment and coaching I received through donations helped me develop my bowling technique. I'm now proud to wear our national jersey."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Total raised: <span className="font-medium text-gray-900">Rs. 420,000</span></p>
                  <p className="text-sm text-gray-500">Supporters: <span className="font-medium text-gray-900">76</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/donations/success-stories"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              View all success stories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="bg-primary-700 rounded-3xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to make a difference?</span>
                  <span className="block">Become a sponsor today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Join our community of donors supporting the next generation of Sri Lankan athletes.
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    href="/donations/athletes"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-indigo-50"
                  >
                    Browse Athletes
                  </Link>
                  <Link
                    href="/donations/become-sponsor"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                  >
                    Become a Sponsor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}