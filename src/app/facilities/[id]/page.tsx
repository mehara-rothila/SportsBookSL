'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingCalendar from '@/components/bookings/BookingCalendar';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Mock data for a specific facility
const facilityData = {
  id: 'premadasa-cricket-stadium',
  name: 'Premadasa Cricket Stadium',
  location: 'Colombo, Sri Lanka',
  address: '223/1, Khettarama Road, Colombo 14, Sri Lanka',
  description: 'The R. Premadasa Stadium is a cricket stadium in Colombo, Sri Lanka. It is one of the main venues for international cricket matches in Sri Lanka, with a capacity of approximately 35,000 spectators. The stadium has excellent facilities for cricket practice and matches.',
  longDescription: `
    The R. Premadasa Stadium (RPS) is a cricket stadium located in Colombo, Sri Lanka. It was named after the late Sri Lankan president Ranasinghe Premadasa. The stadium is home to the Tamil Union Cricket and Athletic Club and is also used for international cricket matches.
    
    The stadium underwent a significant renovation ahead of the 2011 Cricket World Cup, increasing its capacity and modernizing its facilities. It now features state-of-the-art floodlights for night matches, excellent practice facilities, and comfortable seating for spectators.
    
    Located in the heart of Colombo, the stadium is easily accessible and is a popular venue for cricket enthusiasts. The pitch at RPS is known for being batting-friendly, especially in limited-overs cricket, providing a good balance between bat and ball.
    
    The ground has hosted numerous memorable cricket matches, including World Cup fixtures and high-profile bilateral series. Its world-class facilities make it an ideal venue for training and matches for both local and international teams.
  `,
  sportTypes: ['Cricket'],
  amenities: [
    'Practice nets', 
    'Changing rooms', 
    'Floodlights', 
    'Equipment rental', 
    'Parking',
    'Restrooms',
    'Refreshment stalls',
    'First aid facilities',
    'VIP boxes',
    'Media center',
    'Electronic scoreboard',
    'Public address system'
  ],
  pricePerHour: 8000,
  pricePerDay: 60000,
  rating: 4.9,
  reviewCount: 98,
  contactInfo: {
    phone: '+94 112 695 139',
    email: 'bookings@premadasastadium.lk',
    website: 'www.premadasastadium.lk'
  },
  images: [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    'https://images.unsplash.com/photo-1574436323347-41ccbfcceb7a',
    'https://images.unsplash.com/photo-1511809870860-4d2e84c591dc',
    'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46',
    'https://images.unsplash.com/photo-1529899115404-ce31efc90053'
  ],
  operatingHours: [
    { day: 'Monday', open: '06:00', close: '22:00' },
    { day: 'Tuesday', open: '06:00', close: '22:00' },
    { day: 'Wednesday', open: '06:00', close: '22:00' },
    { day: 'Thursday', open: '06:00', close: '22:00' },
    { day: 'Friday', open: '06:00', close: '22:00' },
    { day: 'Saturday', open: '06:00', close: '22:00' },
    { day: 'Sunday', open: '08:00', close: '20:00' },
  ],
  specialRates: [
    { name: 'Youth Teams', description: 'For registered school teams', rate: 5000, conditions: 'Valid student IDs required' },
    { name: 'Tournament Hire', description: 'Full day booking for tournaments', rate: 50000, conditions: 'Minimum 24 hour advance booking' },
    { name: 'Season Pass', description: 'Regular weekly booking for 3 months', rate: 7000, conditions: 'Same time slot each week' }
  ],
  equipmentForRent: [
    { name: 'Cricket Bat', pricePerHour: 500, available: 15 },
    { name: 'Cricket Ball (Set of 6)', pricePerHour: 800, available: 10 },
    { name: 'Helmet', pricePerHour: 300, available: 20 },
    { name: 'Batting Gloves', pricePerHour: 250, available: 25 },
    { name: 'Leg Guards', pricePerHour: 250, available: 25 },
    { name: 'Wicket Keeping Gloves', pricePerHour: 350, available: 8 },
    { name: 'Stumps (Set)', pricePerHour: 400, available: 5 }
  ],
  coaches: [
    { id: 'coach-1', name: 'Lasith Malinga', specialization: 'Fast Bowling', pricePerHour: 2500, rating: 4.9, image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f' },
    { id: 'coach-2', name: 'Kumar Sangakkara', specialization: 'Batting', pricePerHour: 3000, rating: 5.0, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
    { id: 'coach-3', name: 'Rangana Herath', specialization: 'Spin Bowling', pricePerHour: 2500, rating: 4.8, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
  ],
  availableDates: [
    { date: '2025-04-15', slots: [
      { time: '06:00-08:00', available: false },
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true },
      { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true },
      { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true },
      { time: '20:00-22:00', available: true }
    ]},
    { date: '2025-04-16', slots: [
      { time: '06:00-08:00', available: true },
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: false },
      { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true },
      { time: '16:00-18:00', available: true },
      { time: '18:00-20:00', available: true },
      { time: '20:00-22:00', available: true }
    ]},
    { date: '2025-04-17', slots: [
      { time: '06:00-08:00', available: true },
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true },
      { time: '12:00-14:00', available: true },
      { time: '14:00-16:00', available: false },
      { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true },
      { time: '20:00-22:00', available: true }
    ]}
  ],
  mapLocation: {
    lat: 6.9271,
    lng: 79.8612
  },
  reviews: [
    {
      id: 'review-1',
      user: {
        name: 'Kumar Sangakkara',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
      },
      rating: 5,
      date: '2025-03-15',
      content: 'Excellent facilities! The pitch was well-maintained and staff were very helpful. Will definitely be coming back.',
    },
    {
      id: 'review-2',
      user: {
        name: 'Mahela Jayawardene',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      rating: 5,
      date: '2025-02-28',
      content: 'Top-notch cricket stadium with great practice facilities. Perfect for our team training sessions.',
    },
    {
      id: 'review-3',
      user: {
        name: 'Lasith Malinga',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      },
      rating: 4,
      date: '2025-01-20',
      content: 'Very good stadium, though the equipment rental could be improved. Overall a great experience for our practice sessions.',
    },
  ],
};

export default function FacilityDetailPage({ params }: { params: { id: string } }) {
  const [mainImage, setMainImage] = useState(facilityData.images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [equipmentSelection, setEquipmentSelection] = useState<Record<string, number>>({});
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-LK')}`;
  };
  
  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  // Handle equipment selection
  const handleEquipmentChange = (name: string, quantity: number) => {
    setEquipmentSelection(prev => ({
      ...prev,
      [name]: quantity
    }));
  };
  
  // Calculate total booking cost
  const calculateTotal = () => {
    let total = facilityData.pricePerHour * 2; // Assuming each slot is 2 hours
    
    // Add equipment costs
    Object.entries(equipmentSelection).forEach(([name, quantity]) => {
      const equipment = facilityData.equipmentForRent.find(e => e.name === name);
      if (equipment && quantity > 0) {
        total += equipment.pricePerHour * quantity * 2; // 2 hours rental
      }
    });
    
    return total;
  };
  
  // Open lightbox
  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero section with main image and essential details */}
      <div className="relative">
        <div className="h-[60vh] w-full relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold text-white mb-2">{facilityData.name}</h1>
                <div className="flex items-center text-white mb-4">
                  <div className="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400 mr-1">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span>{facilityData.rating}</span>
                    <span className="ml-1 text-white/80">({facilityData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{facilityData.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {facilityData.sportTypes.map((sport) => (
                    <span key={sport} className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image gallery thumbnails */}
        <div className="bg-white shadow-md py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {facilityData.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 h-20 w-32 rounded-md overflow-hidden transition-all duration-200 ${mainImage === image ? 'ring-2 ring-primary-500' : 'hover:opacity-80'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${facilityData.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
              <button
                className="flex-shrink-0 h-20 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => openLightbox(facilityData.images[0])}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                View all
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Facility details */}
          <div className="lg:col-span-2">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-primary-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'
                    )
                  }
                >
                  Overview
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-primary-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'
                    )
                  }
                >
                  Amenities
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-primary-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'
                    )
                  }
                >
                  Equipment
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-primary-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'
                    )
                  }
                >
                  Coaches
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-primary-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'
                    )
                  }
                >
                  Reviews
                </Tab>
              </Tab.List>
              
              <Tab.Panels className="mt-6">
                {/* Overview Panel */}
                <Tab.Panel className="rounded-xl bg-white p-4">
                  <div className="prose max-w-none mb-8">
                    <h3 className="text-xl font-semibold mb-4">About this facility</h3>
                    <p className="whitespace-pre-line">{facilityData.longDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Location</h4>
                      <p className="text-gray-700 mb-2">{facilityData.address}</p>
                      <div className="mt-4 h-60 w-full bg-gray-200 rounded-lg overflow-hidden">
                        {/* Map placeholder - in a real app would be a real map */}
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 mx-auto mb-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            <p className="text-gray-500">Interactive map would be shown here</p>
                            <p className="text-sm text-gray-400">Coordinates: {facilityData.mapLocation.lat}, {facilityData.mapLocation.lng}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Contact Information</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-600 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          <span>{facilityData.contactInfo.phone}</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-600 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          <span>{facilityData.contactInfo.email}</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-600 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                          </svg>
                          <span>{facilityData.contactInfo.website}</span>
                        </li>
                      </ul>
                      
                      <h4 className="text-lg font-medium mt-8 mb-4">Operating Hours</h4>
                      <div className="grid grid-cols-1 gap-2 bg-gray-50 rounded-lg p-4">
                        {facilityData.operatingHours.map((hours) => (
                          <div key={hours.day} className="flex justify-between">
                            <span className="font-medium">{hours.day}</span>
                            <span>{hours.open} - {hours.close}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                
                {/* Amenities Panel */}
                <Tab.Panel className="rounded-xl bg-white p-4">
                  <h3 className="text-xl font-semibold mb-6">Facilities & Amenities</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {facilityData.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-12 mb-6">Special Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityData.specialRates.map((rate) => (
                      <div key={rate.name} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold">{rate.name}</h4>
                          <div className="bg-green-100 text-green-800 text-sm font-medium rounded-full px-3 py-1">
                            {formatCurrency(rate.rate)}/hr
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{rate.description}</p>
                        <div className="bg-amber-50 rounded-md p-3 text-sm text-amber-800">
                          <strong>Conditions:</strong> {rate.conditions}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
                
                {/* Equipment Panel */}
                <Tab.Panel className="rounded-xl bg-white p-4">
                  <h3 className="text-xl font-semibold mb-6">Equipment for Rent</h3>
                  
                  <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Equipment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rental Cost
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Availability
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {facilityData.equipmentForRent.map((equipment) => (
                          <tr key={equipment.name}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatCurrency(equipment.pricePerHour)}/hr</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${equipment.available > 5 ? 'bg-green-100 text-green-800' : equipment.available > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {equipment.available} available
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      Equipment Rental Information
                    </h4>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Equipment must be returned in the same condition as when rented.</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>A refundable security deposit may be required for certain equipment.</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>For equipment reservations, please add them during the booking process or contact the facility directly.</span>
                      </li>
                    </ul>
                  </div>
                </Tab.Panel>
                
                {/* Coaches Panel */}
                <Tab.Panel className="rounded-xl bg-white p-4">
                  <h3 className="text-xl font-semibold mb-6">Available Coaches</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityData.coaches.map((coach) => (
                      <div key={coach.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${coach.image})` }} />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold">{coach.name}</h4>
                              <div className="flex items-center text-amber-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <span>{coach.rating}</span>
                              </div>
                            </div>
                            <div className="text-gray-600 mb-3">Specialization: {coach.specialization}</div>
                            <div className="text-gray-900 font-medium mb-4">{formatCurrency(coach.pricePerHour)}/hr</div>
                            <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                              Book a Session
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link 
                      href="/trainers" 
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View all trainers
                      <svg 
                        className="ml-2 h-5 w-5" 
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
                </Tab.Panel>
                
                {/* Reviews Panel */}
                <Tab.Panel className="rounded-xl bg-white p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Reviews</h3>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {facilityData.reviews.map((review) => (
                      <div key={review.id} className="pb-8 border-b border-gray-200 last:border-0">
                        <div className="flex items-start">
                          <img
                            className="h-10 w-10 rounded-full mr-4"
                            src={review.user.avatar}
                            alt={review.user.name}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{review.user.name}</h4>
                              <time className="text-sm text-gray-500">{review.date}</time>
                            </div>
                            <div className="flex items-center mt-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`h-5 w-5 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-700">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      Load more reviews
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          
          {/* Right column: Booking widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Book this Facility</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Select a Date</h4>
                      <span className="text-gray-500 text-sm">Available Dates</span>
                    </div>
                    
                    {/* Calendar would go here in a real implementation */}
                    <div className="border border-gray-300 rounded-md p-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <span className="font-medium">April 2025</span>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Simple date selection (would use a real calendar component) */}
                      <div className="grid grid-cols-3 gap-2">
                        {facilityData.availableDates.map((dateObj) => (
                          <button
                            key={dateObj.date}
                            className={`text-center py-2 rounded-md text-sm ${
                              selectedDate === dateObj.date
                                ? 'bg-primary-100 text-primary-800 font-medium'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedDate(dateObj.date)}
                          >
                            {new Date(dateObj.date).getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <h4 className="font-medium mb-2">Available Time Slots</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facilityData.availableDates
                          .find(d => d.date === selectedDate)?.slots
                          .filter(slot => slot.available)
                          .map((slot) => (
                            <button
                              key={slot.time}
                              className={`py-2 px-3 rounded-md text-sm border ${
                                selectedTimeSlot === slot.time
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'border-gray-300 hover:border-primary-300'
                              }`}
                              onClick={() => handleTimeSlotSelect(slot.time)}
                            >
                              {slot.time}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedTimeSlot && (
                    <div>
                      <h4 className="font-medium mb-3">Equipment Selection (Optional)</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {facilityData.equipmentForRent.map((equipment) => (
                          <div key={equipment.name} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{equipment.name}</div>
                              <div className="text-gray-500 text-xs">{formatCurrency(equipment.pricePerHour)}/hr</div>
                            </div>
                            <select
                              className="rounded-md border-gray-300 text-sm"
                              value={equipmentSelection[equipment.name] || 0}
                              onChange={(e) => handleEquipmentChange(equipment.name, parseInt(e.target.value))}
                            >
                              {[...Array(equipment.available + 1).keys()].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Facility Fee</span>
                      <span>{formatCurrency(facilityData.pricePerHour * 2)}</span>
                    </div>
                    
                    {Object.entries(equipmentSelection).map(([name, quantity]) => {
                      if (quantity > 0) {
                        const equipment = facilityData.equipmentForRent.find(e => e.name === name);
                        if (equipment) {
                          return (
                            <div key={name} className="flex justify-between mb-2">
                              <span className="text-gray-600">{name} (x{quantity})</span>
                              <span>{formatCurrency(equipment.pricePerHour * quantity * 2)}</span>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                    
                    <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <button
                    className={`w-full py-3 rounded-md font-medium text-white ${
                      selectedDate && selectedTimeSlot
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                    disabled={!(selectedDate && selectedTimeSlot)}
                  >
                    Proceed to Booking
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    You won't be charged yet. Payment is required to confirm the booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar facilities section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Facilities You May Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={`https://images.unsplash.com/photo-${1540747913346 + item * 1000}-19e32dc3e97e`} 
                    alt="Facility" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">Cricket Stadium {item}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500 mr-1">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span>4.{7 + item} ({50 + item * 10})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Rs. {6000 + item * 1000}/hr</span>
                    <Link 
                      href={`/facilities/facility-${item}`}
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image lightbox (simplified, would use a proper lightbox component) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged view" 
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}