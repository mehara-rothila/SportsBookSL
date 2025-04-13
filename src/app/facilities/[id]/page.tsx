// src/app/facilities/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation';

// Helper function for class names (often used with Headless UI)
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// --- Mock Data (Replace with API fetch in real app) ---
const facilityData = {
  id: 'premadasa-cricket-stadium', // This should ideally match the [id] param
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
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da', // Main cricket image
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', // Stadium seating
    'https://images.unsplash.com/photo-1574436323347-41ccbfcceb7a', // Practice nets
    'https://images.unsplash.com/photo-1511809870860-4d2e84c591dc', // Floodlights
    'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46', // Another stadium view
    'https://images.unsplash.com/photo-1529899115404-ce31efc90053'  // Close up pitch/grass
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
  availableDates: [ // Example available dates and slots
    { date: '2025-04-15', slots: [
      { time: '06:00-08:00', available: false }, { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true }, { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true }, { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true }, { time: '20:00-22:00', available: true }
    ]},
    { date: '2025-04-16', slots: [
      { time: '06:00-08:00', available: true }, { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: false }, { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true }, { time: '16:00-18:00', available: true },
      { time: '18:00-20:00', available: true }, { time: '20:00-22:00', available: true }
    ]},
    { date: '2025-04-17', slots: [
      { time: '06:00-08:00', available: true }, { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true }, { time: '12:00-14:00', available: true },
      { time: '14:00-16:00', available: false }, { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true }, { time: '20:00-22:00', available: true }
    ]},
     { date: '2025-04-18', slots: [ // Added another date for example
      { time: '06:00-08:00', available: true }, { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true }, { time: '12:00-14:00', available: true },
      { time: '14:00-16:00', available: true }, { time: '16:00-18:00', available: true },
      { time: '18:00-20:00', available: true }, { time: '20:00-22:00', available: true }
    ]}
  ],
  mapLocation: {
    lat: 6.9271,
    lng: 79.8612
  },
  reviews: [
    {
      id: 'review-1',
      user: { name: 'Kumar Sangakkara', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5' },
      rating: 5, date: '2025-03-15', content: 'Excellent facilities! The pitch was well-maintained and staff were very helpful. Will definitely be coming back.',
    },
    {
      id: 'review-2',
      user: { name: 'Mahela Jayawardene', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
      rating: 5, date: '2025-02-28', content: 'Top-notch cricket stadium with great practice facilities. Perfect for our team training sessions.',
    },
    {
      id: 'review-3',
      user: { name: 'Lasith Malinga', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
      rating: 4, date: '2025-01-20', content: 'Very good stadium, though the equipment rental could be improved. Overall a great experience for our practice sessions.',
    },
  ],
};
// --- End Mock Data ---


export default function FacilityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // Get the facility ID from params

  // TODO: In a real app, fetch facilityData based on the `id` param using useEffect
  // For now, we use the static mock data.

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

  // Calculate total booking cost estimate
  const calculateTotal = () => {
    // Base fee for the selected time slot (assuming 2 hours per slot)
    let total = selectedTimeSlot ? facilityData.pricePerHour * 2 : 0;

    // Add equipment costs for the duration (2 hours)
    Object.entries(equipmentSelection).forEach(([name, quantity]) => {
      const equipment = facilityData.equipmentForRent.find(e => e.name === name);
      if (equipment && quantity > 0) {
        total += equipment.pricePerHour * quantity * 2; // Assuming 2 hours rental per slot
      }
    });

    return total;
  };

  // Open lightbox
  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  // Handle Proceed to Booking click
  const handleProceedToBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      const bookingUrl = `/facilities/${id}/book`;
      const queryParams: Record<string, string> = {
        date: selectedDate,
        time: selectedTimeSlot,
      };

      const selectedEquipment = Object.entries(equipmentSelection)
        .filter(([_, quantity]) => quantity > 0)
        .reduce((acc, [name, quantity]) => {
          acc[name] = quantity;
          return acc;
        }, {} as Record<string, number>);

      if (Object.keys(selectedEquipment).length > 0) {
        queryParams.equipment = JSON.stringify(selectedEquipment);
      }

      const urlWithParams = `${bookingUrl}?${new URLSearchParams(queryParams).toString()}`;
      router.push(urlWithParams);

    } else {
      console.error("Cannot proceed: Date and/or Time Slot not selected.");
      alert("Please select a date and time slot first.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-equipment-pattern opacity-10 pointer-events-none"></div>
      
      {/* Hero section */}
      <div className="relative">
        <div className="h-[70vh] w-full relative group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-110 animate-ken-burns"
            style={{ backgroundImage: `url(${mainImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Animated decorative elements */}
          <div className="absolute right-10 top-20 text-white/10 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
          
          <div className="absolute left-1/4 bottom-40 text-white/10 animate-pulse-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-10">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{facilityData.name}</h1>
                <div className="flex flex-wrap items-center text-white text-sm md:text-base mb-6 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-yellow-400 rounded-full shadow-lg animate-pulse-slow mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">{facilityData.rating}</span>
                    <span className="ml-1 text-white/80">({facilityData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="p-1.5 bg-indigo-500 rounded-full shadow-lg animate-pulse-slow mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <span>{facilityData.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 animate-fade-in-up animation-delay-300">
                  {facilityData.sportTypes.map((sport) => (
                    <span key={sport} className="relative overflow-hidden inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white group">
                      <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 shadow-lg"></span>
                      <span className="relative">{sport}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery thumbnails */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg py-4 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
              {facilityData.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 h-20 w-32 md:h-24 md:w-40 rounded-lg overflow-hidden transition-all duration-300 transform ${mainImage === image ? 'border-4 border-primary-500 scale-110 shadow-2xl' : 'border-2 border-transparent hover:border-primary-400 hover:scale-105'}`}
                  onClick={() => setMainImage(image)}
                >
                  <div className="h-full w-full overflow-hidden">
                    <img
                      src={image}
                      alt={`${facilityData.name} ${index + 1}`}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
              <button
                className="flex-shrink-0 h-20 w-32 md:h-24 md:w-40 bg-gradient-to-br from-primary-50 to-indigo-100 rounded-lg flex flex-col items-center justify-center text-primary-700 hover:text-primary-800 transition-colors duration-300 hover:shadow-xl border-2 border-primary-200/50 transform hover:scale-105"
                onClick={() => openLightbox(facilityData.images[0])}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-sm font-medium">View Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column: Facility details */}
          <div className="lg:col-span-2">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-2xl bg-white/80 backdrop-blur-sm p-1.5 mb-8 shadow-lg">
                {['Overview', 'Amenities', 'Equipment', 'Coaches', 'Reviews'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-xl py-3 text-sm font-medium leading-5 transition-all duration-200',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-100 ring-primary-400',
                        selected
                          ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/90 hover:text-primary-600'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-2">
                {/* Overview Panel */}
                <Tab.Panel className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-100">
                  <div className="prose prose-sm sm:prose-base max-w-none mb-8 text-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">About this facility</h3>
                    <p className="whitespace-pre-line leading-relaxed">{facilityData.longDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Location Section */}
                    <div className="transform hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Location
                      </h4>
                      <p className="text-gray-700 mb-2">{facilityData.address}</p>
                      <div className="mt-4 h-72 w-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl overflow-hidden border border-indigo-200 shadow-lg relative group">
                        {/* Map placeholder */}
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=6.9271,79.8612&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C6.9271,79.8612&key=YOUR_API_KEY')" }}></div>
                          <div className="text-center p-4 relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-primary-400 mx-auto mb-3 animate-bounce-subtle">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            <h5 className="text-lg font-bold text-primary-700 mb-1">Interactive Map</h5>
                            <p className="text-gray-600 mb-2">Click to view directions</p>
                            <p className="inline-block px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-xs text-primary-700">Lat: {facilityData.mapLocation.lat}, Lng: {facilityData.mapLocation.lng}</p>
                          </div>
                        </div>
                        
                        {/* Overlay for hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-6 transition-opacity duration-300">
                          <button className="px-4 py-2 bg-white text-primary-700 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Open in Google Maps
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Hours Section */}
                    <div className="transform hover:scale-[1.02] transition-transform duration-300">
                      <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        Contact Information
                      </h4>
                      <ul className="space-y-4 text-sm text-gray-700">
                        <li className="flex items-start bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg shadow-sm border border-purple-100/50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-purple-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          <span className="font-medium">{facilityData.contactInfo.phone}</span>
                        </li>
                        <li className="flex items-start bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg shadow-sm border border-indigo-100/50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-indigo-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          <span className="font-medium">{facilityData.contactInfo.email}</span>
                        </li>
                        <li className="flex items-start bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg shadow-sm border border-blue-100/50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                          </svg>
                          <a href={facilityData.contactInfo.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary-600 hover:underline">{facilityData.contactInfo.website}</a>
                        </li>
                      </ul>

                      <h4 className="text-xl font-bold mt-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Operating Hours
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 shadow-lg">
                        {facilityData.operatingHours.map((hours, index) => (
                          <div 
                            key={hours.day} 
                            className={`flex justify-between p-2 rounded-lg ${index % 2 === 0 ? 'bg-white/50' : 'bg-transparent'} hover:bg-white/80 transition-colors duration-200`}
                          >
                            <span className="font-medium text-primary-800">{hours.day}</span>
                            <span className="text-indigo-700">{hours.open} - {hours.close}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Amenities Panel */}
                <Tab.Panel className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-100">
                  <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Facilities & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-10">
                    {facilityData.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100/50 transform hover:scale-105 transition-transform duration-300 group">
                        <div className="p-2 bg-gradient-to-br from-primary-400 to-indigo-600 rounded-full mr-3 shadow-md group-hover:shadow-lg transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800 group-hover:text-primary-700 transition-colors duration-300">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Special Rates & Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityData.specialRates.map((rate) => (
                      <div key={rate.name} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-px group transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                        <div className="bg-white rounded-2xl p-6 h-full">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">{rate.name}</h4>
                            <div className="bg-gradient-to-r from-primary-500 to-indigo-600 text-white text-sm font-bold rounded-full px-4 py-1 shadow-md group-hover:shadow-lg transition-all duration-300">
                              {formatCurrency(rate.rate)}/hr
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{rate.description}</p>
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 text-sm text-indigo-700 border border-indigo-100 shadow-inner">
                            <strong className="text-purple-700">Conditions:</strong> {rate.conditions}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>

                {/* Equipment Panel */}
                <Tab.Panel className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-100">
                  <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Equipment for Rent</h3>
                  <div className="overflow-x-auto custom-scrollbar rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-indigo-200 border border-indigo-200 rounded-xl overflow-hidden">
                      <thead className="bg-gradient-to-r from-primary-600 to-indigo-700">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Equipment</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Cost</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Availability</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-indigo-100">
                        {facilityData.equipmentForRent.map((equipment, index) => (
                          <tr key={equipment.name} className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-indigo-50/50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-primary-500 rounded-lg mr-3 shadow-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                  </svg>
                                </div>
                                <span className="font-medium text-gray-900">{equipment.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-sm font-medium rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-primary-700 border border-indigo-200 shadow-sm">
                                {formatCurrency(equipment.pricePerHour)}/hr
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${
                                equipment.available > 5 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                                  : equipment.available > 0 
                                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' 
                                  : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                              }`}>
                                {equipment.available > 0 ? `${equipment.available} available` : 'Out of stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-10 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-300 opacity-10 rounded-full"></div>
                    <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-400 opacity-10 rounded-full"></div>
                    <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      Equipment Rental Information
                    </h4>
                    <ul className="space-y-3 text-sm text-blue-800 relative z-10">
                      <li className="flex items-start bg-blue-100/50 backdrop-blur-sm p-3 rounded-lg border border-blue-200/70 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Equipment must be returned in the same condition as when rented.</span>
                      </li>
                      <li className="flex items-start bg-blue-100/50 backdrop-blur-sm p-3 rounded-lg border border-blue-200/70 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>A refundable security deposit may be required for certain equipment.</span>
                      </li>
                      <li className="flex items-start bg-blue-100/50 backdrop-blur-sm p-3 rounded-lg border border-blue-200/70 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>For equipment reservations, please add them during the booking process or contact the facility directly.</span>
                      </li>
                    </ul>
                  </div>
                </Tab.Panel>

                {/* Coaches Panel */}
                <Tab.Panel className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-100">
                  <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Available Coaches</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {facilityData.coaches.map((coach) => (
                      <div key={coach.id} className="bg-gradient-to-br from-indigo-500 to-purple-600 p-px rounded-2xl overflow-hidden shadow-xl group transform hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl">
                        <div className="bg-white rounded-2xl overflow-hidden h-full">
                          <div className="flex flex-col sm:flex-row h-full">
                            <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                              <img
                                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                src={coach.image}
                                alt={coach.name}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent sm:hidden flex items-end">
                                <div className="p-4 w-full">
                                  <h4 className="text-lg font-bold text-white">{coach.name}</h4>
                                  <p className="text-white/80 text-sm">Specializes in {coach.specialization}</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-5 flex flex-col justify-between sm:w-3/5 relative">
                              <div>
                                <div className="hidden sm:flex justify-between items-start mb-1">
                                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-700">{coach.name}</h4>
                                  <div className="flex items-center bg-amber-400/20 rounded-full px-2 py-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-amber-500">
                                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-bold text-amber-600">{coach.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                                <div className="hidden sm:block">
                                  <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 mb-2 border border-indigo-200 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                    </svg>
                                    {coach.specialization}
                                  </p>
                                </div>
                                <div className="flex items-center text-lg font-bold text-indigo-700 mb-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 text-indigo-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {formatCurrency(coach.pricePerHour)}/hr
                                </div>
                                <div className="hidden sm:block text-gray-600 text-sm mb-4">
                                  Expert in cricket techniques with years of professional experience. Perfect for players looking to enhance their skills.
                                </div>
                              </div>
                              <button className="w-full mt-auto bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-colors duration-300 shadow-md hover:shadow-lg">
                                Book Session
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 text-center">
                    <Link
                      href="/trainers"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group"
                    >
                      View all trainers
                      <svg
                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                <Tab.Panel className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-indigo-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-4 sm:mb-0">User Reviews ({facilityData.reviewCount})</h3>
                    <button className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white py-2.5 px-6 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                      </svg>
                      Write a Review
                    </button>
                  </div>
                  <div className="space-y-6">
                    {facilityData.reviews.map((review, index) => (
                      <div 
                        key={review.id} 
                        className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01]"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-300 shadow-md">
                              <img
                                className="h-full w-full object-cover"
                                src={review.user.avatar}
                                alt={review.user.name}
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-lg text-indigo-900">{review.user.name}</h4>
                              <time className="text-xs font-medium bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full text-indigo-700 border border-indigo-100 shadow-sm">
                                {new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </time>
                            </div>
                            <div className="flex items-center mt-1 mb-3">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-2 text-sm font-medium text-indigo-700">
                                {review.rating === 5 ? "Outstanding!" : review.rating >= 4 ? "Excellent" : review.rating >= 3 ? "Good" : "Average"}
                              </span>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 shadow-inner">
                              <p className="text-gray-700 leading-relaxed">{review.content}</p>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                Helpful
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 text-center">
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group">
                      Load more reviews
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1">
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
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-px rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300 animate-fade-in">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-indigo-100">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Book this Facility</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Date Selection */}
                      <div>
                        <label htmlFor="date-select" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          Select a Date
                        </label>
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 shadow-inner border border-indigo-100">
                          {/* Simple date buttons - Replace with actual calendar component */}
                          <div className="grid grid-cols-3 gap-2">
                            {facilityData.availableDates.map((dateObj) => (
                              <button
                                key={dateObj.date}
                                className={`text-center py-3 rounded-lg text-sm border-2 transition-all duration-200 shadow-sm ${
                                  selectedDate === dateObj.date
                                    ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white border-primary-600 font-bold shadow-md transform scale-105'
                                    : 'bg-white border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                                }`}
                                onClick={() => {
                                    setSelectedDate(dateObj.date);
                                    setSelectedTimeSlot('');
                                    setEquipmentSelection({});
                                }}
                              >
                                {new Date(dateObj.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Time Slot Selection */}
                      {selectedDate && (
                        <div className="animate-fade-in">
                          <label htmlFor="time-slot-select" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Available Time Slots
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {facilityData.availableDates
                              .find(d => d.date === selectedDate)?.slots
                              .map((slot) => (
                                <button
                                  key={slot.time}
                                  className={`py-3 px-3 rounded-lg text-sm border-2 transition-all duration-200 text-center ${
                                    !slot.available
                                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60 line-through'
                                      : selectedTimeSlot === slot.time
                                        ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white border-primary-600 font-bold shadow-md transform scale-105 ring-2 ring-offset-2 ring-primary-300'
                                        : 'bg-white border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                                  }`}
                                  onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                                  disabled={!slot.available}
                                >
                                  {slot.time}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Equipment Selection */}
                      {selectedTimeSlot && (
                        <div className="animate-fade-in">
                          <label htmlFor="equipment-select" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Equipment Selection (Optional)
                          </label>
                          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 shadow-inner border border-indigo-100 custom-scrollbar">
                            {facilityData.equipmentForRent.map((equipment) => (
                              <div key={equipment.name} className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-2.5 rounded-lg border border-indigo-100 shadow-sm hover:shadow transition-shadow duration-200">
                                <div>
                                  <div className="font-medium text-sm text-indigo-900">{equipment.name}</div>
                                  <div className="text-indigo-600 text-xs font-medium">{formatCurrency(equipment.pricePerHour)}/hr</div>
                                </div>
                                <select
                                  className="rounded-lg border-indigo-200 text-sm py-1.5 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white"
                                  value={equipmentSelection[equipment.name] || 0}
                                  onChange={(e) => handleEquipmentChange(equipment.name, parseInt(e.target.value))}
                                  disabled={equipment.available === 0}
                                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
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

                      {/* Booking Summary */}
                      {(selectedDate && selectedTimeSlot) && (
                        <div className="border-t-2 border-indigo-100 pt-5 mt-6 animate-fade-in space-y-3">
                          <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            Booking Summary
                          </h4>
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 shadow-inner border border-indigo-100">
                            <div className="flex justify-between text-sm border-b border-indigo-100 pb-2 mb-2">
                              <span className="text-gray-700">Facility Fee ({selectedTimeSlot})</span>
                              <span className="text-indigo-900 font-medium">{formatCurrency(facilityData.pricePerHour * 2)}</span>
                            </div>

                            {Object.entries(equipmentSelection).map(([name, quantity]) => {
                              if (quantity > 0) {
                                const equipment = facilityData.equipmentForRent.find(e => e.name === name);
                                if (equipment) {
                                  return (
                                    <div key={name} className="flex justify-between text-sm border-b border-indigo-100 pb-2 mb-2">
                                      <span className="text-gray-700">{name} (x{quantity})</span>
                                      <span className="text-indigo-900 font-medium">{formatCurrency(equipment.pricePerHour * quantity * 2)}</span>
                                    </div>
                                  );
                                }
                              }
                              return null;
                            })}

                            <div className="flex justify-between font-bold text-lg mt-4 pt-1">
                              <span className="text-gray-900">Total</span>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{formatCurrency(calculateTotal())}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Proceed Button */}
                      <button
                        className={`w-full py-3.5 mt-6 rounded-xl font-bold text-white text-base flex items-center justify-center ${
                          selectedDate && selectedTimeSlot
                            ? 'bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300'
                            : 'bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70'
                        }`}
                        disabled={!(selectedDate && selectedTimeSlot)}
                        onClick={handleProceedToBooking}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Proceed to Booking
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-3">
                        You won't be charged yet. Payment is required on the next step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar facilities section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 border-t border-indigo-100 relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-10 text-center">Similar Facilities You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Placeholder similar facilities - use FacilityCard component if available */}
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/400x300?stadium&sig=${item}`}
                    alt={`Similar Facility ${item}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-primary-700">Cricket Stadium</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">Cricket Stadium {item}</h3>
                  <div className="flex items-center text-sm text-amber-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold">4.{7 - item}</span>
                    <span className="text-gray-600 ml-1">({50 + item * 15} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Rs. {6500 + item * 500}/hr</span>
                    <Link
                      href={`/facilities/similar-${item}`}
                      className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 animate-fade-in backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-white/80 transition-colors z-[1000] bg-black/30 backdrop-blur-sm p-2 rounded-full"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation buttons */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-[1000] bg-black/30 backdrop-blur-sm p-2 rounded-full"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-[1000] bg-black/30 backdrop-blur-sm p-2 rounded-full"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Image container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl w-full group"
          >
            <img
              src={lightboxImage}
              alt="Enlarged facility view"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl mx-auto animate-fade-in"
            />
            
            <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl">
              <p className="text-white font-medium text-center">
                {facilityData.name} - Premium Cricket Stadium in Colombo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add custom style for scrollbars */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(219, 234, 254, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
}