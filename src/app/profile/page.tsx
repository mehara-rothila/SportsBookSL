'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Mock user data
const userData = {
  id: 'user-1',
  name: 'Ashan Perera',
  email: 'ashan.perera@example.com',
  phone: '+94 77 123 4567',
  address: 'No. 45, Park Street, Colombo 05, Sri Lanka',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  joined: 'January 2025',
  sportPreferences: ['Cricket', 'Swimming', 'Tennis'],
};

// Mock booking data
const bookingData = [
  {
    id: 'booking-1',
    facilityName: 'Premadasa Cricket Stadium',
    facilityImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    date: '2025-04-15',
    time: '10:00-12:00',
    status: 'upcoming',
    sportType: 'Cricket',
    cost: 16000,
    equipmentRented: [
      { name: 'Cricket Bat', quantity: 2 },
      { name: 'Cricket Ball (Set of 6)', quantity: 1 }
    ]
  },
  {
    id: 'booking-2',
    facilityName: 'SSC Swimming Pool',
    facilityImage: 'https://images.unsplash.com/photo-1600965962323-6364f9754910',
    date: '2025-04-20',
    time: '14:00-16:00',
    status: 'upcoming',
    sportType: 'Swimming',
    cost: 4000,
    equipmentRented: []
  },
  {
    id: 'booking-3',
    facilityName: 'Sugathadasa Stadium',
    facilityImage: 'https://images.unsplash.com/photo-1534860741060-ee15f0438609',
    date: '2025-03-10',
    time: '16:00-18:00',
    status: 'completed',
    sportType: 'Athletics',
    cost: 10000,
    equipmentRented: []
  },
  {
    id: 'booking-4',
    facilityName: 'Beddagana Wetland Park Tennis Courts',
    facilityImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    date: '2025-03-05',
    time: '08:00-10:00',
    status: 'completed',
    sportType: 'Tennis',
    cost: 5000,
    equipmentRented: [
      { name: 'Tennis Racket', quantity: 2 },
      { name: 'Tennis Balls (Set of 4)', quantity: 1 }
    ]
  },
  {
    id: 'booking-5',
    facilityName: 'Kurunegala Swimming Complex',
    facilityImage: 'https://images.unsplash.com/photo-1565104881139-c2fb373aa9e7',
    date: '2025-02-28',
    time: '18:00-20:00',
    status: 'cancelled',
    sportType: 'Swimming',
    cost: 0, // Cancelled, so no cost
    equipmentRented: []
  }
];

// Mock financial aid applications
const financialAidData = [
  {
    id: 'application-1',
    date: '2025-03-15',
    sport: 'Cricket',
    status: 'approved',
    facilities: ['Premadasa Cricket Stadium'],
    approvedAmount: 50000,
    validUntil: '2025-09-15'
  },
  {
    id: 'application-2',
    date: '2025-02-10',
    sport: 'Swimming',
    status: 'pending',
    facilities: ['SSC Swimming Pool', 'Kurunegala Swimming Complex'],
    approvedAmount: null,
    validUntil: null
  }
];

// Mock favorite facilities
const favoriteFacilities = [
  {
    id: 'facility-1',
    name: 'Premadasa Cricket Stadium',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    location: 'Colombo',
    sportType: 'Cricket',
    rating: 4.9
  },
  {
    id: 'facility-2',
    name: 'SSC Swimming Pool',
    image: 'https://images.unsplash.com/photo-1600965962323-6364f9754910',
    location: 'Colombo',
    sportType: 'Swimming',
    rating: 4.8
  },
  {
    id: 'facility-3',
    name: 'Beddagana Wetland Park Tennis Courts',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    location: 'Sri Jayawardenepura Kotte',
    sportType: 'Tennis',
    rating: 4.6
  }
];

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-LK')}`;
  };
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Save profile changes
  const handleSaveProfile = () => {
    // In a real app, this would send data to the server
    console.log('Saving profile:', profileData);
    setIsEditingProfile(false);
  };
  
  // Cancel profile editing
  const handleCancelEdit = () => {
    setProfileData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
    setIsEditingProfile(false);
  };
  
  // State for storing the selected tab index
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Sports Background with Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100"></div>
        <div className="absolute inset-0 bg-sports-pattern opacity-30"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden shine-effect">
            {/* User header with enhanced gradient */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 px-6 py-16 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-sports-dots opacity-10"></div>
              
              {/* Animated decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob animation-delay-2000"></div>
              
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center relative z-10">
                <div className="rounded-full overflow-hidden h-32 w-32 border-4 border-white shadow-lg mb-6 md:mb-0 md:mr-10 transform transition-transform duration-500 hover:scale-105">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                  <p className="text-primary-100 mb-4">Member since {userData.joined}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {userData.sportPreferences.map((sport) => (
                      <span key={sport} className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white shadow-md transition-transform duration-300 hover:scale-105">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-6">
              <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl mb-8 shadow-md">
                  {["My Bookings", "Favorites", "Financial Aid", "Account Settings"].map((category, idx) => (
                    <Tab
                      key={idx}
                      className={({ selected }) =>
                        classNames(
                          'w-full py-3 text-sm font-medium rounded-lg transition-all duration-200',
                          'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-400 ring-primary-400',
                          selected
                            ? 'bg-white shadow-md text-primary-700 transform scale-[1.03]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                
                <Tab.Panels className="mt-2">
                  {/* Bookings Tab Panel */}
                  <Tab.Panel className="rounded-xl bg-white p-3 animate-fade-in">
                    <div className="mb-6 flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                      <Link
                        href="/facilities"
                        className="inline-flex items-center px-4 py-2 rounded-md shadow-md text-sm font-medium bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                      >
                        Book New Facility
                      </Link>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        Upcoming Bookings
                      </h3>
                      {bookingData.filter(booking => booking.status === 'upcoming').length > 0 ? (
                        <div className="space-y-6">
                          {bookingData.filter(booking => booking.status === 'upcoming').map((booking) => (
                            <div key={booking.id} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                              <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 h-48 md:h-auto relative overflow-hidden">
                                  <img
                                    src={booking.facilityImage}
                                    alt={booking.facilityName}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 md:w-3/4 flex flex-col">
                                  <div className="flex justify-between mb-2">
                                    <h4 className="text-xl font-semibold text-primary-700">{booking.facilityName}</h4>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      Upcoming
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Date & Time</p>
                                      <p className="font-medium text-gray-800">{formatDate(booking.date)}, {booking.time}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Sport Type</p>
                                      <p className="font-medium text-gray-800">{booking.sportType}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Booking ID</p>
                                      <p className="font-medium text-gray-800">{booking.id}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Cost</p>
                                      <p className="font-medium text-gray-800">{formatCurrency(booking.cost)}</p>
                                    </div>
                                  </div>
                                  
                                  {booking.equipmentRented.length > 0 && (
                                    <div className="mb-4">
                                      <p className="text-sm text-gray-500 mb-1">Equipment Rented</p>
                                      <div className="flex flex-wrap gap-2">
                                        {booking.equipmentRented.map((equipment, idx) => (
                                          <span 
                                            key={idx} 
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {equipment.name} × {equipment.quantity}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="mt-auto flex justify-end space-x-3">
                                    <button className="inline-flex items-center px-3 py-2 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                      </svg>
                                      Reschedule
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      Cancel Booking
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl shadow-inner">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse-slow">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                          <Link
                            href="/facilities"
                            className="inline-flex items-center px-4 py-2 rounded-md shadow-md text-sm font-medium bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                          >
                            Browse facilities to book
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div><div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        Booking History
                      </h3>
                      <div className="bg-white shadow-md overflow-hidden rounded-xl">
                        <ul role="list" className="divide-y divide-gray-200">
                          {bookingData.filter(booking => booking.status !== 'upcoming').map((booking) => (
                            <li key={booking.id}>
                              <div className="block hover:bg-gray-50 transition-colors duration-150">
                                <div className="px-4 py-4 sm:px-6">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden shadow-sm">
                                        <img 
                                          src={booking.facilityImage} 
                                          alt={booking.facilityName}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-sm font-medium text-primary-600 truncate">{booking.facilityName}</p>
                                        <p className="flex items-center text-sm text-gray-500">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                          </svg>
                                          {formatDate(booking.date)}, {booking.time}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <p className={`px-2.5 py-0.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full 
                                        ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                      >
                                        {booking.status === 'completed' ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        ) : (
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        )}
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                      </p>
                                      <p className="ml-4 text-sm font-medium text-gray-900">{formatCurrency(booking.cost)}</p>
                                      <button className="ml-6 text-sm text-primary-600 hover:text-primary-900 transition-colors duration-200 flex items-center">
                                        View details
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  {/* Favorites Tab Panel */}
                  <Tab.Panel className="rounded-xl bg-white p-3 animate-fade-in">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        Favorite Facilities
                      </h2>
                      <p className="text-gray-600 mt-1 pl-9">Quickly access your favorite sports facilities</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteFacilities.map((facility) => (
                        <Link
                          key={facility.id}
                          href={`/facilities/${facility.id}`}
                          className="group rounded-xl bg-white shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <div className="h-48 w-full relative overflow-hidden">
                            <img 
                              src={facility.image} 
                              alt={facility.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-3 right-3">
                              <button className="p-1.5 bg-white rounded-full shadow-md transition-transform duration-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 text-gray-800 group-hover:text-primary-700 transition-colors duration-200">{facility.name}</h3>
                            <div className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500 mr-1">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-gray-600">{facility.rating}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-gray-600 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                {facility.location}
                              </div>
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {facility.sportType}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                      
                      {/* Add more favorites card */}
                      <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center h-80 transition-all duration-300 hover:border-primary-300 hover:bg-primary-50/30 group">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 group-hover:text-primary-600 transition-colors duration-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1 group-hover:text-primary-700 transition-colors duration-300">Add more favorites</h3>
                        <p className="text-gray-500 text-sm mb-6">Browse facilities and save your favorites for quick access</p>
                        <Link
                          href="/facilities"
                          className="inline-flex items-center px-4 py-2 rounded-md shadow-md text-sm font-medium bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                        >
                          Browse Facilities
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  {/* Financial Aid Tab Panel */}
                  <Tab.Panel className="rounded-xl bg-white p-3 animate-fade-in">
                    <div className="mb-6 flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-primary-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                          Financial Aid Applications
                        </h2>
                        <p className="text-gray-600 mt-1 pl-9">Track and manage your financial assistance requests</p>
                      </div>
                      <Link
                        href="/financial-aid/apply"
                        className="inline-flex items-center px-4 py-2 rounded-md shadow-md text-sm font-medium bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                      >
                        New Application
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </Link>
                    </div>
                    
                    {financialAidData.length > 0 ? (
                      <div className="bg-white shadow-md overflow-hidden rounded-xl divide-y divide-gray-200">
                        {financialAidData.map((application) => (
                          <div key={application.id} className="px-6 py-5 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center mb-1">
                                  <h3 className="text-lg font-medium text-gray-900 mr-4">{application.sport} Application</h3>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                    ${application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'}`}
                                  >
                                    {application.status === 'approved' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    ) : application.status === 'pending' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.01M12 12h.01M12 19a7 7 0 100-14 7 7 0 000 14z" />
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    )}
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                  </svg>
                                  Submitted on {formatDate(application.date)}
                                </p>
                              </div>
                              
                              <button className="text-primary-600 hover:text-primary-900 text-sm font-medium flex items-center transition-colors duration-200">
                                View Details
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Requested Facilities</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {application.facilities.map((facility, idx) => (
                                    <span 
                                      key={idx}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                      </svg>
                                      {facility}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {application.status === 'approved' && (
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Approved Amount</h4>
                                  <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(application.approvedAmount || 0)}</p>
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Valid until {formatDate(application.validUntil || '')}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            {application.status === 'approved' && (
                              <div className="mt-4 flex justify-end">
                                <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                  </svg>
                                  Book Using Aid
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl shadow-inner">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-6">You haven't submitted any financial aid applications yet.</p>
                        <Link
                          href="/financial-aid/apply"
                          className="inline-flex items-center px-4 py-2 rounded-md shadow-md text-sm font-medium bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                        >
                          Apply for Financial Aid
                        </Link>
                      </div>
                    )}
                  </Tab.Panel>
                  
                  {/* Account Settings Tab Panel */}
                  <Tab.Panel className="rounded-xl bg-white p-3 animate-fade-in">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </h2>
                      <p className="text-gray-600 mt-1 pl-9">Manage your personal information and preferences</p>
                    </div>
                    
                    <div className="bg-white shadow-md overflow-hidden rounded-xl">
                      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          Personal Information
                        </h3>
                        {!isEditingProfile && (
                          <button
                            onClick={() => setIsEditingProfile(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </button>
                        )}
                      </div>
                      
                      <div className="px-4 py-5 sm:p-6">
                        {isEditingProfile ? (
                          <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                  Full Name
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                  Email Address
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                  Phone Number
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                  Address
                                </label>
                                <div className="mt-1">
                                  <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    value={profileData.address}
                                    onChange={handleProfileChange}
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={handleSaveProfile}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                              <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                              <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                              <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                              <p className="mt-1 text-sm text-gray-900">{userData.joined}</p>
                            </div>
                            
                            <div className="sm:col-span-6">
                              <h4 className="text-sm font-medium text-gray-500">Address</h4>
                              <p className="mt-1 text-sm text-gray-900">{userData.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white shadow-md overflow-hidden rounded-xl mt-8">
                      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          Account Security
                        </h3>
                      </div>
                      
                      <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-primary-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                              </svg>
                              Password
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure</p>
                            <button
                              className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                              Change Password
                            </button>
                          </div>
                          
                          <div className="pt-5 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-primary-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                              </svg>
                              Two-Factor Authentication
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account</p>
                            <button
                              className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                              </svg>
                              Enable Two-Factor Authentication
                            </button>
                          </div>
                          
                          <div className="pt-5 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-red-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                              </svg>
                              Danger Zone
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">Permanently remove your account and all associated data</p>
                            <button
                              className="mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}