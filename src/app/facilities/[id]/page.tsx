// src/app/facilities/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Assuming BookingCalendar component is not used directly here, but logic is inline
// import BookingCalendar from '@/components/bookings/BookingCalendar';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation'; // Import useRouter

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
    <div className="bg-gray-50 min-h-screen"> {/* Changed background */}
      {/* Hero section */}
      <div className="relative">
        <div className="h-[60vh] w-full relative group"> {/* Added group for potential hover effects */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105" // Added subtle zoom on hover
            style={{ backgroundImage: `url(${mainImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> {/* Slightly stronger gradient */}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10"> {/* Adjusted padding */}
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">{facilityData.name}</h1> {/* Adjusted size */}
                <div className="flex flex-wrap items-center text-white text-sm md:text-base mb-4 gap-x-4 gap-y-1"> {/* Added gap for wrapping */}
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400 mr-1"> {/* Adjusted size */}
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{facilityData.rating}</span>
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
                    <span key={sport} className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-medium text-white shadow-sm"> {/* Adjusted size */}
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery thumbnails */}
        <div className="bg-white shadow-md py-3 border-t border-b border-gray-200"> {/* Added border */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> {/* Added scrollbar styling */}
              {facilityData.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 h-16 w-24 md:h-20 md:w-32 rounded-lg overflow-hidden transition-all duration-200 border-2 ${mainImage === image ? 'border-primary-500 scale-105 shadow-md' : 'border-transparent hover:border-primary-300 hover:opacity-90'}`} // Enhanced selected/hover state
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image}
                    alt={`${facilityData.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy" // Added lazy loading
                  />
                </button>
              ))}
              <button
                className="flex-shrink-0 h-16 w-24 md:h-20 md:w-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-primary-600 transition-colors duration-200 border-2 border-transparent" // Adjusted style
                onClick={() => openLightbox(facilityData.images[0])}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 mb-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-xs font-medium">View all</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12"> {/* Adjusted padding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"> {/* Increased gap */}
          {/* Left column: Facility details */}
          <div className="lg:col-span-2">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-8"> {/* Added margin-bottom */}
                {['Overview', 'Amenities', 'Equipment', 'Coaches', 'Reviews'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors duration-150',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-100 ring-primary-400', // Adjusted focus ring
                        selected
                          ? 'bg-white shadow text-primary-700'
                          : 'text-gray-600 hover:bg-white/60 hover:text-primary-600'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-2">
                {/* Overview Panel */}
                <Tab.Panel className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-gray-200/75"> {/* Added padding, shadow, border */}
                  <div className="prose prose-sm sm:prose-base max-w-none mb-8 text-gray-700"> {/* Adjusted prose size */}
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">About this facility</h3>
                    <p className="whitespace-pre-line">{facilityData.longDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Location Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-900">Location</h4>
                      <p className="text-gray-700 mb-2">{facilityData.address}</p>
                      <div className="mt-4 h-60 w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                        {/* Map placeholder */}
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                          <div className="text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 mx-auto mb-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            <p className="text-gray-500 text-sm">Interactive map placeholder</p>
                            <p className="text-xs text-gray-400 mt-1">Lat: {facilityData.mapLocation.lat}, Lng: {facilityData.mapLocation.lng}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Hours Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {/* ... Contact list items ... */}
                         <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          <span>{facilityData.contactInfo.phone}</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          <span>{facilityData.contactInfo.email}</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                          </svg>
                          <a href={facilityData.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 hover:underline">{facilityData.contactInfo.website}</a>
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold mt-8 mb-4 text-gray-900">Operating Hours</h4>
                      <div className="space-y-1 text-sm text-gray-700 bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {facilityData.operatingHours.map((hours) => (
                          <div key={hours.day} className="flex justify-between">
                            <span className="font-medium text-gray-800">{hours.day}</span>
                            <span>{hours.open} - {hours.close}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Amenities Panel */}
                <Tab.Panel className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-gray-200/75">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">Facilities & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm text-gray-700">
                    {facilityData.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-12 mb-6 text-gray-900">Special Rates & Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityData.specialRates.map((rate) => (
                      <div key={rate.name} className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200/50 shadow-sm p-6 transition hover:shadow-md">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-primary-800">{rate.name}</h4>
                          <div className="bg-primary-100 text-primary-800 text-sm font-semibold rounded-full px-3 py-1 whitespace-nowrap">
                            {formatCurrency(rate.rate)}/hr
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rate.description}</p>
                        <div className="bg-primary-100/50 rounded-md p-3 text-xs text-primary-700 border border-primary-200/60">
                          <strong>Conditions:</strong> {rate.conditions}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>

                {/* Equipment Panel */}
                <Tab.Panel className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-gray-200/75">
                   <h3 className="text-xl font-semibold mb-6 text-gray-900">Equipment for Rent</h3>
                   <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                       <thead className="bg-gray-50">
                         <tr>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-gray-200">
                         {facilityData.equipmentForRent.map((equipment) => (
                           <tr key={equipment.name} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.name}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(equipment.pricePerHour)}/hr</td>
                             <td className="px-6 py-4 whitespace-nowrap">
                               <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${equipment.available > 5 ? 'bg-green-100 text-green-800' : equipment.available > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                 {equipment.available > 0 ? `${equipment.available} available` : 'Out of stock'}
                               </span>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                   {/* ... (Equipment Rental Info box remains the same) ... */}
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200/80">
                        <h4 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Equipment Rental Information
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-700">
                            {/* ... List items ... */}
                             <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Equipment must be returned in the same condition as when rented.</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>A refundable security deposit may be required for certain equipment.</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>For equipment reservations, please add them during the booking process or contact the facility directly.</span>
                            </li>
                        </ul>
                    </div>
                </Tab.Panel>

                {/* Coaches Panel */}
                <Tab.Panel className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-gray-200/75">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">Available Coaches</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityData.coaches.map((coach) => (
                      <div key={coach.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col sm:flex-row group transition hover:shadow-lg">
                        <div className="sm:w-1/3 flex-shrink-0 h-48 sm:h-auto">
                          <img
                            className="h-full w-full object-cover"
                            src={coach.image}
                            alt={coach.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 flex flex-col justify-between sm:w-2/3">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{coach.name}</h4>
                              <div className="flex items-center text-sm text-amber-600 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-amber-500">
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <span>{coach.rating.toFixed(1)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Specialization: {coach.specialization}</p>
                            <p className="text-base font-semibold text-gray-800 mb-3">{formatCurrency(coach.pricePerHour)}/hr</p>
                          </div>
                          <button className="w-full mt-auto bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 border border-primary-200">
                            Book Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                   {/* ... (View all trainers link remains the same) ... */}
                   <div className="mt-8 text-center">
                    <Link
                      href="/trainers"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                    >
                      View all trainers
                      <svg
                        className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
                <Tab.Panel className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-gray-200/75">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 sm:mb-0">User Reviews ({facilityData.reviewCount})</h3>
                    <button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white py-2 px-5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                      </svg>
                      Write a Review
                    </button>
                  </div>
                  <div className="space-y-8">
                    {facilityData.reviews.map((review) => (
                      <div key={review.id} className="pb-8 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <img
                            className="h-10 w-10 rounded-full flex-shrink-0"
                            src={review.user.avatar}
                            alt={review.user.name}
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-gray-800">{review.user.name}</h4>
                              <time className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time> {/* Different date format */}
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                   {/* ... (Load more reviews button remains the same) ... */}
                   <div className="mt-8 flex justify-center">
                    <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center text-sm group">
                      Load more reviews
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-y-0.5">
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden sticky top-24"> {/* Enhanced shadow/border */}
              <div className="p-6 border-b border-gray-200"> {/* Added border */}
                <h3 className="text-xl font-semibold text-gray-900">Book this Facility</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">Select a Date</label>
                    <div className="border border-gray-300 rounded-lg p-4 bg-white">
                      {/* Simple date buttons - Replace with actual calendar component */}
                      <div className="grid grid-cols-3 gap-2">
                        {facilityData.availableDates.map((dateObj) => (
                          <button
                            key={dateObj.date}
                            className={`text-center py-2 rounded-md text-sm border ${
                              selectedDate === dateObj.date
                                ? 'bg-primary-600 text-white border-primary-600 font-semibold shadow-sm'
                                : 'border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                            } transition-all duration-150`}
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
                      <label htmlFor="time-slot-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {facilityData.availableDates
                          .find(d => d.date === selectedDate)?.slots
                          .map((slot) => (
                            <button
                              key={slot.time}
                              className={`py-2 px-3 rounded-lg text-sm border transition-all duration-150 text-center ${
                                !slot.available
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                  : selectedTimeSlot === slot.time
                                    ? 'bg-primary-600 text-white border-primary-600 font-semibold shadow-sm ring-2 ring-offset-1 ring-primary-300' // Enhanced selected state
                                    : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50 text-gray-700'
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
                      <label htmlFor="equipment-select" className="block text-sm font-medium text-gray-700 mb-2">Equipment Selection (Optional)</label>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-2 border rounded-lg p-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> {/* Added border/bg */}
                        {facilityData.equipmentForRent.map((equipment) => (
                          <div key={equipment.name} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm text-gray-800">{equipment.name}</div>
                              <div className="text-gray-500 text-xs">{formatCurrency(equipment.pricePerHour)}/hr</div>
                            </div>
                            <select
                              className="rounded-md border-gray-300 text-sm py-1 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                              value={equipmentSelection[equipment.name] || 0}
                              onChange={(e) => handleEquipmentChange(equipment.name, parseInt(e.target.value))}
                              disabled={equipment.available === 0}
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
                    <div className="border-t border-gray-200 pt-5 mt-5 animate-fade-in space-y-2">
                       <h4 className="text-sm font-medium text-gray-700 mb-2">Booking Summary</h4>
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Facility Fee ({selectedTimeSlot})</span>
                         <span className="text-gray-800">{formatCurrency(facilityData.pricePerHour * 2)}</span>
                       </div>

                       {Object.entries(equipmentSelection).map(([name, quantity]) => {
                         if (quantity > 0) {
                           const equipment = facilityData.equipmentForRent.find(e => e.name === name);
                           if (equipment) {
                             return (
                               <div key={name} className="flex justify-between text-sm">
                                 <span className="text-gray-600">{name} (x{quantity})</span>
                                 <span className="text-gray-800">{formatCurrency(equipment.pricePerHour * quantity * 2)}</span>
                               </div>
                             );
                           }
                         }
                         return null;
                       })}

                       <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t border-gray-200">
                         <span className="text-gray-900">Total Estimate</span>
                         <span className="text-primary-700">{formatCurrency(calculateTotal())}</span>
                       </div>
                    </div>
                  )}

                  {/* Proceed Button */}
                  <button
                    className={`w-full py-3 mt-6 rounded-lg font-semibold text-white text-base ${
                      selectedDate && selectedTimeSlot
                        ? 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                        : 'bg-gray-300 cursor-not-allowed' // Adjusted disabled color
                    } transition-all duration-200 ease-in-out transform hover:scale-[1.02]`} // Added transform
                    disabled={!(selectedDate && selectedTimeSlot)}
                    onClick={handleProceedToBooking}
                  >
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

      {/* Similar facilities section */}
      <section className="bg-gray-100 py-16 border-t border-gray-200"> {/* Changed background */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Facilities You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder similar facilities - use FacilityCard component if available */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200/75 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`https://source.unsplash.com/random/400x300?stadium&sig=${item}`} // Using random images
                    alt={`Similar Facility ${item}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 truncate">Similar Facility {item}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-400 mr-1">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span>4.{7 - item} ({50 + item * 15})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold text-sm">Rs. {6500 + item * 500}/hr</span>
                    <Link
                      href={`/facilities/similar-${item}`} // Example link
                      className="text-primary-600 text-sm font-medium hover:text-primary-700 hover:underline"
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

      {/* Image lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 animate-fade-in" // Added fade-in
          onClick={() => setLightboxOpen(false)} // Close on backdrop click
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-opacity z-[1000]"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }} // Prevent backdrop click
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"> {/* Increased stroke width */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Added container to prevent image click closing */}
          <div onClick={(e) => e.stopPropagation()} className="relative">
             <img
                src={lightboxImage}
                alt="Enlarged facility view"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" // Added rounding/shadow
             />
          </div>
        </div>
      )}
    </div>
  );
}

// Remember to add the fade-in animation to your CSS/config if you haven't already:
/*
@layer utilities {
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
}
*/