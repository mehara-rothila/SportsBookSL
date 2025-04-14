// src/app/facilities/[id]/book/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRightIcon, ChevronLeftIcon, CheckIcon, CreditCardIcon, UserCircleIcon, CalendarDaysIcon, ClockIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/solid';
import BookingCalendar from '@/components/bookings/BookingCalendar';
import EquipmentRental from '../../../../components/equipment/EquipmentRental';
import TransportationBooking from '@/components/transportation/TransportationBooking';
import WeatherWidget from '@/components/weather/WeatherWidget';

// --- Mock Data (Should be replaced by fetched data or props) ---
const facilityData = {
  id: 'premadasa-cricket-stadium',
  name: 'Premadasa Cricket Stadium',
  location: 'Colombo, Sri Lanka',
  address: '223/1, Khettarama Road, Colombo 14, Sri Lanka',
  sportType: 'Cricket',
  isOutdoor: true,
  hourlyRate: 8000, // Base rate per 2-hour slot for calculation
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'
};

// Mock availability data for the calendar
const availableDates = [
  {
    date: new Date(2025, 3, 15), // April 15, 2025
    slots: [ { time: '08:00-10:00', available: true }, { time: '10:00-12:00', available: true }, { time: '12:00-14:00', available: false }, { time: '14:00-16:00', available: true }, { time: '16:00-18:00', available: false }, { time: '18:00-20:00', available: true } ]
  },
  {
    date: new Date(2025, 3, 16), // April 16, 2025
    slots: [ { time: '08:00-10:00', available: true }, { time: '10:00-12:00', available: false }, { time: '12:00-14:00', available: false }, { time: '14:00-16:00', available: true }, { time: '16:00-18:00', available: true }, { time: '18:00-20:00', available: true } ]
  },
  {
    date: new Date(2025, 3, 17), // April 17, 2025
    slots: [ { time: '08:00-10:00', available: true }, { time: '10:00-12:00', available: true }, { time: '12:00-14:00', available: true }, { time: '14:00-16:00', available: false }, { time: '16:00-18:00', available: false }, { time: '18:00-20:00', available: true } ]
  }
];

// Mock Equipment Data (Needed for cost calculation/display if not passed from EquipmentRental)
const mockEquipmentDetails: { [key: string]: { name: string; pricePerHour: number } } = {
  'eq-bat': { name: 'Cricket Bat', pricePerHour: 500 },
  'eq-ball': { name: 'Cricket Ball (Set)', pricePerHour: 800 },
  'eq-gloves': { name: 'Batting Gloves', pricePerHour: 250 },
  // Add other equipment IDs used in EquipmentRental component
};
// --- End Mock Data ---

// Helper for class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);

  // --- Initialize state from query parameters ---
  const initialDateStr = searchParams.get('date');
  const initialTime = searchParams.get('time') || '';
  const initialEquipmentStr = searchParams.get('equipment');

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDateStr ? new Date(initialDateStr) : null
  );
  const [selectedTime, setSelectedTime] = useState<string>(initialTime);
  const [selectedEquipment, setSelectedEquipment] = useState<{[key: string]: number}>(
    initialEquipmentStr ? JSON.parse(initialEquipmentStr) : {}
  );
  // --- End Initialization ---

  const [needsTransportation, setNeedsTransportation] = useState<boolean>(false);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [participants, setParticipants] = useState<string>('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
      cardHolder: '',
      cardNumber: '',
      expiration: '',
      cvc: ''
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-LK')}`;
  };

  // Calculate costs
  const calculateEquipmentCost = () => {
    return Object.entries(selectedEquipment).reduce((sum, [equipId, qty]) => {
      // Use mock details for calculation - replace with actual data source if available
      const price = mockEquipmentDetails[equipId]?.pricePerHour || 0;
      return sum + (qty * price * 2); // Assuming 2-hour slot
    }, 0);
  };

  const calculateTotalCost = () => {
    const facilityCost = facilityData.hourlyRate; // Assuming rate is per slot
    const equipmentCost = calculateEquipmentCost();
    const transportationCost = needsTransportation ? 1000 : 0; // Example fixed cost
    return facilityCost + equipmentCost + transportationCost;
  };

  // Handle equipment selection from the EquipmentRental component
  const handleEquipmentSelect = (selections: {[key: string]: number}) => {
    setSelectedEquipment(selections);
  };

  // Handle payment input changes
  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle booking submission
  const handleSubmitBooking = async () => {
    // Add basic validation for payment details if needed
    if (!paymentDetails.cardHolder || !paymentDetails.cardNumber || !paymentDetails.expiration || !paymentDetails.cvc) {
        alert('Please fill in all payment details.');
        return;
    }

    setIsSubmitting(true);
    console.log("Submitting Booking:", {
        facilityId: params.id,
        date: selectedDate?.toISOString().split('T')[0],
        time: selectedTime,
        participants,
        equipment: selectedEquipment,
        transportation: needsTransportation,
        specialRequests,
        totalCost: calculateTotalCost(),
        // paymentDetails should NOT be logged in production like this
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to confirmation page on success
    // In real app, check API response before navigating
    router.push('/bookings/confirmation');
    // No need to setIsSubmitting(false) as we are navigating away
  };

  const isStep1Complete = !!selectedDate && !!selectedTime;
  const isStep2Complete = true; // Assume step 2 is always completeable for now

  const steps = [
    { id: 1, name: 'Select Date & Time', icon: CalendarDaysIcon },
    { id: 2, name: 'Add-ons', icon: SparklesIcon }, // Changed name & icon
    { id: 3, name: 'Review & Pay', icon: CreditCardIcon },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%236366f1\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-32">
        {/* Enhanced Header with Animation */}
        <div className="mb-16 text-center">
          <div className="inline-block animate-bounce-subtle">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-primary-500/20 to-indigo-500/20 text-primary-700 border border-primary-200 shadow-sm backdrop-blur-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              BOOKING EXPERIENCE
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 animate-gradient-x">Book Your Facility</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Complete your booking for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{facilityData.name}</span> in just a few simple steps.
          </p>
        </div>

        {/* Animated Steps Indicator */}
        <nav aria-label="Progress" className="mb-16 max-w-3xl mx-auto">
          <ol role="list" className="overflow-hidden">
            <li className="relative pb-10 flex">
              <div className="flex flex-col items-center">
                <span className="h-full absolute inset-0 flex items-center" aria-hidden="true">
                  <span className={`h-full w-0.5 ${currentStep > 1 ? 'bg-gradient-to-b from-primary-600 to-indigo-600' : 'bg-gray-200'}`}></span>
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                    currentStep === 1 
                      ? 'bg-gradient-to-r from-primary-500 to-indigo-600 shadow-lg ring-2 ring-white' 
                      : currentStep > 1 
                        ? 'bg-gradient-to-r from-primary-500 to-indigo-600 shadow-md' 
                        : 'bg-white border-2 border-gray-300'
                  } group transition-all duration-300`}
                >
                  {currentStep > 1 ? (
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : currentStep === 1 ? (
                    <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : (
                    <CalendarDaysIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-700" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="ml-6 w-full">
                <h3 className={`text-lg font-semibold ${
                  currentStep >= 1 ? 'text-indigo-700' : 'text-gray-500'
                }`}>
                  Select Date & Time
                </h3>
                <p className={`mt-2 text-sm ${
                  currentStep >= 1 ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Choose when you'd like to book the facility and view available time slots.
                </p>
              </div>
            </li>

            <li className="relative pb-10 flex">
              <div className="flex flex-col items-center">
                <span className="h-full absolute inset-0 flex items-center" aria-hidden="true">
                  <span className={`h-full w-0.5 ${currentStep > 2 ? 'bg-gradient-to-b from-indigo-600 to-purple-600' : 'bg-gray-200'}`}></span>
                </span>
                <button
                  type="button"
                  onClick={() => isStep1Complete && setCurrentStep(2)}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                    !isStep1Complete 
                      ? 'bg-white border-2 border-gray-300 cursor-not-allowed opacity-50' 
                      : currentStep === 2 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg ring-2 ring-white' 
                        : currentStep > 2 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md' 
                          : 'bg-white border-2 border-indigo-300'
                  } group transition-all duration-300`}
                  disabled={!isStep1Complete}
                >
                  {currentStep > 2 ? (
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : currentStep === 2 ? (
                    <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : (
                    <SparklesIcon className={`h-6 w-6 ${isStep1Complete ? 'text-indigo-500 group-hover:text-indigo-700' : 'text-gray-400'}`} aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="ml-6 w-full">
                <h3 className={`text-lg font-semibold ${
                  !isStep1Complete ? 'text-gray-400' : currentStep >= 2 ? 'text-indigo-700' : 'text-gray-600'
                }`}>
                  Choose Add-ons
                </h3>
                <p className={`mt-2 text-sm ${
                  !isStep1Complete ? 'text-gray-300' : currentStep >= 2 ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  Select equipment to rent and add transportation if needed.
                </p>
              </div>
            </li>

            <li className="relative flex">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => isStep1Complete && isStep2Complete && setCurrentStep(3)}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                    !isStep1Complete || !isStep2Complete
                      ? 'bg-white border-2 border-gray-300 cursor-not-allowed opacity-50' 
                      : currentStep === 3 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg ring-2 ring-white' 
                        : 'bg-white border-2 border-purple-300'
                  } group transition-all duration-300`}
                  disabled={!isStep1Complete || !isStep2Complete}
                >
                  <CreditCardIcon className={`h-6 w-6 ${
                    !isStep1Complete || !isStep2Complete 
                      ? 'text-gray-400' 
                      : currentStep === 3 
                        ? 'text-white' 
                        : 'text-purple-500 group-hover:text-purple-700'
                  }`} aria-hidden="true" />
                </button>
              </div>
              <div className="ml-6 w-full">
                <h3 className={`text-lg font-semibold ${
                  !isStep1Complete || !isStep2Complete 
                    ? 'text-gray-400' 
                    : currentStep === 3 
                      ? 'text-indigo-700' 
                      : 'text-gray-600'
                }`}>
                  Review & Pay
                </h3>
                <p className={`mt-2 text-sm ${
                  !isStep1Complete || !isStep2Complete ? 'text-gray-300' : currentStep === 3 ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  Confirm your booking details and complete payment.
                </p>
              </div>
            </li>
          </ol>
        </nav>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Step 1: Date and Time Selection */}
            {currentStep === 1 && (
              <div className="space-y-10 animate-fade-in">
                {/* Weather Widget Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-1">
                      <WeatherWidget
                          facilityId={facilityData.id}
                          facilityName={facilityData.name}
                          isOutdoor={facilityData.isOutdoor}
                          sportType={facilityData.sportType}
                          bookingDate={selectedDate?.toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Calendar Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-indigo-100">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 flex items-center">
                        <CalendarDaysIcon className="w-7 h-7 mr-3 text-indigo-500"/>
                        Select Date & Time
                      </h2>
                      <p className="mt-2 text-gray-600">Choose your preferred date and available time slot for booking.</p>
                    </div>
                    {/* Use the enhanced BookingCalendar */}
                    <div className="p-6">
                      <BookingCalendar
                        availableDates={availableDates}
                        onDateSelect={setSelectedDate}
                        onTimeSelect={setSelectedTime}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 flex items-center mb-6">
                        <UserCircleIcon className="w-7 h-7 mr-3 text-indigo-500"/>
                        Additional Details
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            Number of Participants
                          </label>
                          <div className="relative">
                            <select
                              id="participants"
                              name="participants"
                              className="block w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50 pr-10 py-3 text-gray-700 appearance-none bg-white"
                              value={participants}
                              onChange={(e) => setParticipants(e.target.value)}
                              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                            >
                              {[...Array(30)].map((_, i) => (
                                <option key={i} value={(i + 1).toString()}>{i + 1} Participant{i > 0 ? 's' : ''}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-indigo-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            Special Requests <span className="text-indigo-400 font-normal ml-1">(Optional)</span>
                          </label>
                          <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all duration-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 rounded-xl"></div>
                            <textarea
                              id="special-requests"
                              name="special-requests"
                              rows={4}
                              className="block w-full bg-white/90 backdrop-blur-sm rounded-xl border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-0 sm:text-sm placeholder:text-gray-400 relative z-10"
                              placeholder="E.g., Need specific net setup, accessibility requirements, special coaching arrangements..."
                              value={specialRequests}
                              onChange={(e) => setSpecialRequests(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!isStep1Complete}
                    className={`
                      inline-flex items-center px-8 py-3.5 rounded-xl shadow-lg text-lg font-bold transition-all duration-300 transform hover:translate-y-[-2px]
                      ${isStep1Complete
                        ? 'bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                      }
                    `}
                  >
                    <span className="mr-2">Continue to Add-ons</span>
                    <div className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Equipment and Transportation */}
            {currentStep === 2 && (
              <div className="space-y-10 animate-fade-in">
                {/* Equipment Rental Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-1">
                      <EquipmentRental
                          facilityId={facilityData.id}
                          sportType={facilityData.sportType}
                          onEquipmentSelect={handleEquipmentSelect}
                          initialSelections={selectedEquipment}
                      />
                    </div>
                  </div>
                </div>

                {/* Transportation Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 flex items-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        Transportation Add-on
                      </h2>
                      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/60 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/5 to-indigo-500/10 transform rotate-45 translate-x-20 -translate-y-20 rounded-3xl"></div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-6">
                            <div className="relative">
                              <input
                                id="transportation"
                                name="transportation"
                                type="checkbox"
                                className="h-5 w-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                checked={needsTransportation}
                                onChange={() => setNeedsTransportation(!needsTransportation)}
                              />
                              <div className={`absolute -inset-0.5 rounded-md pointer-events-none transition-opacity ${needsTransportation ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)' }}></div>
                            </div>
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="transportation" className="font-bold text-indigo-900 cursor-pointer">
                              Need round-trip transportation?
                            </label>
                            <p className="text-indigo-800/80 mt-1 max-w-2xl">We'll arrange convenient travel to and from the facility. Our trusted transportation partners ensure you arrive on time and stress-free. <span className="font-semibold">(Est. Cost: {formatCurrency(1000)})</span></p>
                          </div>
                        </div>
                        
                        <div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-500 ${needsTransportation ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                              </svg>
                            </div>
                            <h3 className="font-medium text-blue-900 mb-1">Professional Drivers</h3>
                            <p className="text-xs text-blue-700/80">Experienced and reliable drivers</p>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                            </div>
                            <h3 className="font-medium text-blue-900 mb-1">Door-to-door Service</h3>
                            <p className="text-xs text-blue-700/80">Pickup and drop at your location</p>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-100 rounded-full mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="font-medium text-blue-900 mb-1">Timely Service</h3>
                            <p className="text-xs text-blue-700/80">Never miss your booking slot</p>
                          </div>
                        </div>
                      </div>

                      {needsTransportation && (
                        <div className="animate-fade-in">
                          <TransportationBooking
                            facilityId={facilityData.id}
                            facilityName={facilityData.name}
                            facilityAddress={facilityData.address}
                            bookingDate={selectedDate?.toLocaleDateString()}
                            bookingTime={selectedTime}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center px-6 py-3 border-2 border-indigo-300 shadow-sm text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <div className="relative w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 group-hover:bg-indigo-200 transition-colors">
                      <ChevronLeftIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!isStep2Complete}
                    className="inline-flex items-center px-8 py-3.5 rounded-xl shadow-lg text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
                  >
                    <span className="mr-2">Review & Pay</span>
                    <div className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Payment */}
            {currentStep === 3 && (
              <div className="space-y-10 animate-fade-in">
                {/* Review Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                        Review Your Booking
                      </h2>
                      <div className="space-y-8">
                        {/* Facility & Date/Time Review */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200/60 shadow-sm relative overflow-hidden group transform transition-all duration-300 hover:shadow-md">
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-400/10 rounded-full"></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                              </svg>
                              Facility
                            </h3>
                            <div className="flex items-start">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-indigo-200 bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                                <img 
                                  src={facilityData.image} 
                                  alt={facilityData.name}
                                  className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-700"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="text-lg font-bold text-indigo-900">{facilityData.name}</p>
                                <p className="text-xs text-indigo-700 flex items-center mt-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {facilityData.address}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200/60 shadow-sm relative overflow-hidden group transform transition-all duration-300 hover:shadow-md">
                            <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-400/10 rounded-full"></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                              Date & Time
                            </h3>
                            <p className="text-lg font-bold text-purple-900">
                              {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <div className="flex items-center mt-2">
                              <div className="p-1.5 bg-purple-200 rounded-full mr-2 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-700">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <p className="text-base text-purple-800 font-medium">{selectedTime}</p>
                            </div>
                            <p className="text-sm text-purple-700 flex items-center mt-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                              </svg>
                              {participants} participant{parseInt(participants) !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        {/* Equipment Review */}
                        {Object.keys(selectedEquipment).length > 0 && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200/60 shadow-sm relative overflow-hidden group transform transition-all duration-300 hover:shadow-md">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full"></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Equipment Rental
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(selectedEquipment).map(([equipId, quantity]) => {
                                if (quantity > 0) {
                                  return (
                                    <div key={equipId} className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-indigo-100">
                                      <div className="flex items-center">
                                        <div className="p-1.5 bg-blue-100 rounded-full mr-2 shadow-sm">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                          </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-800">{mockEquipmentDetails[equipId]?.name || 'Equipment'}</span>
                                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">x{quantity}</span>
                                      </div>
                                      <span className="text-sm font-bold text-indigo-900">{formatCurrency((mockEquipmentDetails[equipId]?.pricePerHour || 0) * quantity * 2)}</span>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        )}

                        {/* Transportation Review */}
                        {needsTransportation && (
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200/60 shadow-sm relative overflow-hidden group transform transition-all duration-300 hover:shadow-md">
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-400/10 rounded-full"></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-4 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                              </svg>
                              Transportation
                            </h3>
                            <div className="flex justify-between bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-indigo-100">
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-indigo-900">Round-trip service</span>
                                <span className="text-sm text-indigo-700 mt-1">Door-to-door pickup & drop service</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-base font-bold text-indigo-900">{formatCurrency(1000)}</span>
                                <span className="text-xs text-indigo-700 mt-1">Fixed rate</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Special Requests Review */}
                        {specialRequests && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200/60 shadow-sm relative overflow-hidden group transform transition-all duration-300 hover:shadow-md">
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-400/10 rounded-full"></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                              </svg>
                              Special Requests
                            </h3>
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100">
                              <p className="text-sm text-purple-900 italic">"{specialRequests}"</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-500">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center mb-8">
                        <CreditCardIcon className="w-7 h-7 mr-3 text-indigo-500"/>
                        Payment Details
                      </h2>

                      {/* Price Breakdown */}
                      <div className="mb-10 bg-gradient-to-r from-primary-50/70 to-indigo-50/70 rounded-2xl p-6 border border-primary-200/50 shadow-md relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-400/5 rounded-full"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-400/5 rounded-full"></div>
                        
                        <h4 className="text-base font-bold text-indigo-900 mb-4 flex items-center">
                          <CurrencyDollarIcon className="w-5 h-5 mr-2 text-primary-600"/>
                          Price Breakdown
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center mr-3 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                              </div>
                              <span className="text-gray-700">Facility Booking <span className="text-gray-500">({selectedTime})</span></span>
                            </div>
                            <span className="font-bold text-indigo-900">{formatCurrency(facilityData.hourlyRate)}</span>
                          </div>
                          
                          {Object.keys(selectedEquipment).length > 0 && (
                            <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-3 shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">Equipment Rental</span>
                              </div>
                              <span className="font-bold text-indigo-900">{formatCurrency(calculateEquipmentCost())}</span>
                            </div>
                          )}
                          
                          {needsTransportation && (
                            <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center mr-3 shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">Transportation</span>
                              </div>
                              <span className="font-bold text-indigo-900">{formatCurrency(1000)}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-2 mt-2">
                            <span className="text-lg font-bold text-gray-900">Total Amount Due</span>
                            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{formatCurrency(calculateTotalCost())}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Form with 3D effect */}
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl blur-sm opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                          <div className="relative bg-white rounded-xl p-6 shadow-sm border border-indigo-100 z-10">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Card Information
                            </label>
                            <div className="space-y-4">
                              <div>
                                <div className="relative">
                                  <input
                                    type="text" 
                                    id="card-holder" 
                                    name="cardHolder" 
                                    required
                                    className="pl-10 w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50"
                                    placeholder="Cardholder Name"
                                    value={paymentDetails.cardHolder} 
                                    onChange={handlePaymentInputChange}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="relative">
                                  <input
                                    type="text" 
                                    id="card-number" 
                                    name="cardNumber" 
                                    required
                                    className="pl-10 w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50"
                                    placeholder="0000 0000 0000 0000"
                                    value={paymentDetails.cardNumber} 
                                    onChange={handlePaymentInputChange}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                  <input
                                    type="text" 
                                    id="expiration" 
                                    name="expiration" 
                                    required
                                    className="pl-10 w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50"
                                    placeholder="MM / YY"
                                    value={paymentDetails.expiration} 
                                    onChange={handlePaymentInputChange}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="relative">
                                  <input
                                    type="text" 
                                    id="cvc" 
                                    name="cvc" 
                                    required
                                    className="pl-10 w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50"
                                    placeholder="CVC"
                                    value={paymentDetails.cvc} 
                                    onChange={handlePaymentInputChange}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-xs text-indigo-600 flex items-center mt-4">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                              </svg>
                              Secure payment processing. Your card information is encrypted.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-5 w-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2"
                          />
                          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation & Submit */}
                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center px-6 py-3 border-2 border-indigo-300 shadow-sm text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <div className="relative w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 group-hover:bg-indigo-200 transition-colors">
                      <ChevronLeftIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    className={`
                      inline-flex items-center px-10 py-4 border-2 border-transparent text-lg font-extrabold rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-[1.03]
                      ${isSubmitting
                        ? 'bg-indigo-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 via-primary-600 to-purple-600 text-white hover:from-indigo-700 hover:via-primary-700 hover:to-purple-700 hover:shadow-2xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <span>Complete Booking</span>
                        <span className="ml-2 px-2 py-1 rounded-lg bg-white/20 text-sm">{formatCurrency(calculateTotalCost())}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-primary-500 to-indigo-700 p-px rounded-2xl shadow-2xl">
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <ClockIcon className="w-6 h-6 mr-2"/>
                      Booking Summary
                    </h3>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Facility Info */}
                    <div className="flex items-center pb-5 border-b border-indigo-100">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm group">
                        <img 
                          src={facilityData.image} 
                          alt={facilityData.name}
                          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-bold text-indigo-900">{facilityData.name}</h4>
                        <p className="text-xs text-indigo-700 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-400">
                            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                          </svg>
                          {facilityData.location}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Summary Items */}
                    {/* Date & Time */}
                    <div className="flex justify-between items-center text-sm pb-2 border-b border-indigo-100/50">
                      <span className="font-medium text-indigo-800 flex items-center">
                        <div className="p-1 bg-indigo-100 rounded-md mr-2 shadow-sm">
                          <CalendarDaysIcon className="w-4 h-4 text-indigo-600"/>
                        </div>
                        Date & Time
                      </span>
                      <div className="text-right">
                        <span className="block text-indigo-900 font-bold">
                          {selectedDate ? selectedDate.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }) : '-'}
                        </span>
                        <span className="block text-indigo-700 text-xs mt-0.5">
                          {selectedTime || '-'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Participants */}
                    <div className="flex justify-between items-center text-sm pb-2 border-b border-indigo-100/50">
                      <span className="font-medium text-indigo-800 flex items-center">
                        <div className="p-1 bg-indigo-100 rounded-md mr-2 shadow-sm">
                          <UserCircleIcon className="w-4 h-4 text-indigo-600"/>
                        </div>
                        Participants
                      </span>
                      <span className="text-indigo-900 font-bold">
                        {participants} {parseInt(participants) > 1 ? 'people' : 'person'}
                      </span>
                    </div>

                    {/* Equipment */}
                    {Object.keys(selectedEquipment).length > 0 && (
                      <div className="pt-2 pb-2 border-b border-indigo-100/50">
                        <h4 className="font-medium text-indigo-800 flex items-center text-sm mb-3">
                          <div className="p-1 bg-indigo-100 rounded-md mr-2 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          Equipment
                        </h4>
                        <div className="space-y-2 pl-8">
                          {Object.entries(selectedEquipment).map(([equipId, quantity]) => {
                            if (quantity > 0) {
                              return (
                                <div key={equipId} className="flex justify-between text-xs">
                                  <span className="text-indigo-700">
                                    {mockEquipmentDetails[equipId]?.name || 'Equipment'} <span className="text-indigo-400">× {quantity}</span>
                                  </span>
                                  <span className="text-indigo-900 font-bold">{formatCurrency((mockEquipmentDetails[equipId]?.pricePerHour || 0) * quantity * 2)}</span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Transportation */}
                    {needsTransportation && (
                      <div className="pt-2 pb-2 border-b border-indigo-100/50">
                        <h4 className="font-medium text-indigo-800 flex items-center text-sm mb-1">
                          <div className="p-1 bg-indigo-100 rounded-md mr-2 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                          </div>
                          Transportation
                        </h4>
                        <div className="pl-8">
                          <div className="flex justify-between text-xs">
                            <span className="text-indigo-700">Round-trip service</span>
                            <span className="text-indigo-900 font-bold">{formatCurrency(1000)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Final Total */}
                    <div className="pt-2 mt-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-base font-extrabold text-indigo-900">Total Amount</span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{formatCurrency(calculateTotalCost())}</span>
                      </div>
                      <p className="text-xs text-indigo-500 text-right mt-1">Due today by card payment</p>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <div className="flex items-center text-xs text-indigo-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <span>Free cancellation up to 24 hours before booking time</span>
                      </div>
                      <div className="flex items-center text-xs text-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Booking confirmation will be sent via email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable input field class (add to globals.css or keep here if preferred)
const inputFieldEnhanced = `
  appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg
  shadow-sm placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
  sm:text-sm transition duration-150 ease-in-out
`;

// Custom scrollbar style can be added to globals.css
const customScrollbar = `
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
`;