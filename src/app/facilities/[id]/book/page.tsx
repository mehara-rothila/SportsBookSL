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
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da' // Example image
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
  // Add other equipment IDs used in EquipmentRental component if they exist
};
// --- End Mock Data ---

// Helper for class names (Optional, Tailwind handles this well)
// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

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
    // Consider using Intl.NumberFormat for more robust formatting
    return `Rs. ${amount.toLocaleString('en-LK')}`;
  };

  // Calculate costs
  const calculateEquipmentCost = () => {
    return Object.entries(selectedEquipment).reduce((sum, [equipId, qty]) => {
      const price = mockEquipmentDetails[equipId]?.pricePerHour || 0;
      return sum + (qty * price * 2); // Assuming 2-hour slot basis
    }, 0);
  };

  const calculateTotalCost = () => {
    const facilityCost = selectedDate && selectedTime ? facilityData.hourlyRate : 0; // Ensure date/time selected
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
    // Basic validation
    if (!selectedDate || !selectedTime) {
        alert('Please select a date and time.');
        setCurrentStep(1);
        return;
    }
    if (!paymentDetails.cardHolder || !paymentDetails.cardNumber || !paymentDetails.expiration || !paymentDetails.cvc) {
        alert('Please fill in all payment details.');
        setCurrentStep(3);
        return;
    }
    // Consider adding basic validation for card number format, expiration date, CVC length

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
        // paymentDetails should NEVER be logged in production environments
    });

    // Simulate API call
    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

        // ---!!! In a real app: Replace simulation with actual API call !!!---
        // const response = await fetch('/api/bookings', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     facilityId: params.id,
        //     date: selectedDate?.toISOString().split('T')[0],
        //     time: selectedTime,
        //     participants: parseInt(participants),
        //     equipment: selectedEquipment,
        //     needsTransportation,
        //     specialRequests,
        //     totalCost: calculateTotalCost(),
        //     // Send payment token, not raw details
        //   }),
        // });
        //
        // if (!response.ok) {
        //   throw new Error('Booking failed');
        // }
        // const result = await response.json();
        // ---!!!---------------------------------------------------------!!!---


        // Navigate to confirmation page on success
        router.push(`/bookings/confirmation?facility=${facilityData.name}`); // Pass some data if needed

    } catch (error) {
        console.error("Booking submission failed:", error);
        alert('There was an error submitting your booking. Please try again.');
        setIsSubmitting(false); // Allow user to try again
    }
    // No need to setIsSubmitting(false) on success because we navigate away
  };

  const isStep1Complete = !!selectedDate && !!selectedTime;
  // Step 2 can be considered complete once step 1 is done, as add-ons are optional
  // You might add validation here if equipment rental becomes mandatory under certain conditions
  const isStep2Complete = isStep1Complete;


  // Stepper configuration (removed redundant steps array)
  const stepperConfig = [
    { id: 1, name: 'Select Date & Time', icon: CalendarDaysIcon },
    { id: 2, name: 'Add-ons', icon: SparklesIcon },
    { id: 3, name: 'Review & Pay', icon: CreditCardIcon },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* Optional: SVG pattern background can be kept if desired */}
      {/* <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%236366f1\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div> */}

      {/* Decorative blobs */}
      <div className="absolute top-40 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-200"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Enhanced Header with Animation */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block animate-bounce-subtle mb-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-primary-500/20 to-indigo-500/20 text-primary-700 border border-primary-200 shadow-sm backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              BOOKING EXPERIENCE
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 animate-gradient-x">Book Your Facility</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Complete your booking for <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{facilityData.name}</span> in just a few simple steps.
          </p>
        </div>

        {/* Animated Steps Indicator */}
        <nav aria-label="Progress" className="mb-12 sm:mb-16 max-w-2xl mx-auto">
            <ol role="list" className="flex justify-between items-center">
                {stepperConfig.map((step, stepIdx) => (
                    <li key={step.id} className={`flex-1 ${stepIdx < stepperConfig.length - 1 ? 'pr-4 sm:pr-8' : ''}`}>
                        <button
                            type="button"
                            onClick={() => {
                                if (step.id === 1) setCurrentStep(1);
                                else if (step.id === 2 && isStep1Complete) setCurrentStep(2);
                                else if (step.id === 3 && isStep1Complete && isStep2Complete) setCurrentStep(3);
                            }}
                            disabled={ (step.id === 2 && !isStep1Complete) || (step.id === 3 && (!isStep1Complete || !isStep2Complete)) }
                            className={`group relative flex flex-col items-center w-full text-center ${
                                (step.id === 2 && !isStep1Complete) || (step.id === 3 && (!isStep1Complete || !isStep2Complete))
                                ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {/* Line Connector */}
                            {stepIdx < stepperConfig.length - 1 ? (
                                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200" aria-hidden="true">
                                    <div className={`h-0.5 ${currentStep > step.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}`} style={{ width: 'calc(100% + 0rem)' }}></div>
                                </div>
                            ) : null}

                            <div className="relative flex items-center justify-center">
                                {/* Circle */}
                                <span className={`relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all duration-300
                                    ${currentStep === step.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg ring-2 ring-white'
                                    : currentStep > step.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md'
                                    : 'bg-white border-2 border-gray-300 group-hover:border-indigo-400'}
                                    ${( (step.id === 2 && !isStep1Complete) || (step.id === 3 && (!isStep1Complete || !isStep2Complete)) ) ? '!bg-gray-200 !border-gray-300 !cursor-not-allowed opacity-70' : ''}
                                `}>
                                    {currentStep > step.id ? (
                                        <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                                    ) : (
                                        <step.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${currentStep === step.id ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'}
                                          ${( (step.id === 2 && !isStep1Complete) || (step.id === 3 && (!isStep1Complete || !isStep2Complete)) ) ? '!text-gray-400' : ''}
                                        `} aria-hidden="true" />
                                    )}
                                </span>
                            </div>
                            <span className={`mt-2 block text-xs sm:text-sm font-medium transition-colors duration-200
                              ${currentStep >= step.id ? 'text-indigo-700' : 'text-gray-500 group-hover:text-indigo-600'}
                              ${( (step.id === 2 && !isStep1Complete) || (step.id === 3 && (!isStep1Complete || !isStep2Complete)) ) ? '!text-gray-400 cursor-not-allowed' : ''}
                            `}>
                                {step.name}
                            </span>
                        </button>
                    </li>
                ))}
            </ol>
        </nav>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            {/* Step 1: Date and Time Selection */}
            {currentStep === 1 && (
              <div className="space-y-8 sm:space-y-10 animate-fade-in">
                {/* Weather Widget Card */}
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                   <div className="bg-white rounded-[15px] overflow-hidden p-1">
                       <WeatherWidget
                           facilityId={facilityData.id}
                           facilityName={facilityData.name}
                           isOutdoor={facilityData.isOutdoor}
                           sportType={facilityData.sportType}
                           bookingDate={selectedDate?.toISOString().split('T')[0]} // Pass selected date for forecast
                       />
                   </div>
                 </div>


                {/* Calendar Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                  <div className="bg-white rounded-[15px] overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-indigo-100">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 flex items-center">
                        <CalendarDaysIcon className="w-7 h-7 mr-3 text-indigo-500"/>
                        Select Date & Time
                      </h2>
                      <p className="mt-2 text-gray-600">Choose your preferred date and available time slot.</p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <BookingCalendar
                        availableDates={availableDates} // Use fetched/props data here ideally
                        onDateSelect={setSelectedDate}
                        onTimeSelect={setSelectedTime}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                  <div className="bg-white rounded-[15px] overflow-hidden">
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
                                className="appearance-none block w-full rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 focus:ring-opacity-50 pr-10 py-3 text-gray-700 bg-white"
                                value={participants}
                                onChange={(e) => setParticipants(e.target.value)}
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236366f1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                              >
                                {/* Create options dynamically */}
                                {[...Array(30)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1} Participant{i > 0 ? 's' : ''}
                                  </option>
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
                          <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-shadow duration-200">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 rounded-xl pointer-events-none"></div>
                              <textarea
                                id="special-requests"
                                name="special-requests"
                                rows={4}
                                className="relative z-10 block w-full bg-white/90 backdrop-blur-sm rounded-xl border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-0 sm:text-sm placeholder:text-gray-400 resize-none"
                                placeholder="E.g., Need specific net setup, wheelchair access..."
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
                      inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg text-base sm:text-lg font-bold transition-all duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group
                      ${isStep1Complete
                        ? 'bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                      }
                    `}
                  >
                    <span className="mr-2">Continue to Add-ons</span>
                    <div className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                      <ChevronRightIcon className="h-4 w-4 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {currentStep === 2 && (
              <div className="space-y-8 sm:space-y-10 animate-fade-in">
                {/* Equipment Rental Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="bg-white rounded-[15px] overflow-hidden p-1">
                        {/* Assuming EquipmentRental takes these props */}
                        <EquipmentRental
                            facilityId={facilityData.id}
                            sportType={facilityData.sportType}
                            onEquipmentSelect={handleEquipmentSelect}
                            initialSelections={selectedEquipment}
                        />
                    </div>
                </div>

                {/* Transportation Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="bg-white rounded-[15px] overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 flex items-center mb-6">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                               </svg>
                                Transportation Add-on
                            </h2>
                            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 sm:p-6 border border-blue-200/60 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-400/5 to-indigo-500/10 transform rotate-45 translate-x-12 sm:translate-x-20 -translate-y-12 sm:-translate-y-20 rounded-3xl pointer-events-none"></div>

                                <div className="relative flex items-start">
                                    <div className="flex items-center h-6 pt-0.5">
                                      {/* Custom Checkbox Wrapper */}
                                      <div className="relative inline-block w-5 h-5">
                                        <input
                                            id="transportation"
                                            name="transportation"
                                            type="checkbox"
                                            className="sr-only peer" // Hide default, keep functionality
                                            checked={needsTransportation}
                                            onChange={() => setNeedsTransportation(!needsTransportation)}
                                        />
                                        {/* Custom Visual */}
                                        <label
                                          htmlFor="transportation"
                                          className={`absolute inset-0 w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer
                                          ${needsTransportation ? 'border-transparent bg-gradient-to-r from-indigo-500 to-purple-600' : 'border-indigo-300 bg-white peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-indigo-500/50'}`}
                                        >
                                           {/* Checkmark Icon */}
                                           {needsTransportation && (
                                              <svg className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                           )}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                        <label htmlFor="transportation" className="font-bold text-indigo-900 cursor-pointer select-none">
                                          Need round-trip transportation?
                                        </label>
                                        <p className="text-indigo-800/80 mt-1 max-w-2xl">
                                          Convenient travel to & from the facility. Estimated cost: <span className="font-semibold">{formatCurrency(1000)}</span>.
                                        </p>
                                    </div>
                                </div>

                                <div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-500 ease-out ${needsTransportation ? 'opacity-100 max-h-[500px] scale-y-100' : 'opacity-0 max-h-0 scale-y-95 overflow-hidden'}`}>
                                  {[
                                    { icon: UserCircleIcon, title: 'Professional Drivers', desc: 'Experienced & reliable' },
                                    { icon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, title: 'Door-to-door Service', desc: 'Pickup & drop at your location' },
                                    { icon: ClockIcon, title: 'Timely Service', desc: 'Never miss your booking' }
                                  ].map((item, index) => (
                                    <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-100 flex flex-col items-center text-center shadow-sm">
                                        <div className="p-3 bg-blue-100 rounded-full mb-2">
                                          {typeof item.icon === 'function' ? item.icon() : <item.icon className="w-6 h-6 text-blue-600" />}
                                        </div>
                                        <h3 className="font-medium text-blue-900 text-sm mb-0.5">{item.title}</h3>
                                        <p className="text-xs text-blue-700/80">{item.desc}</p>
                                    </div>
                                  ))}
                                </div>
                            </div>

                            {/* Only show TransportationBooking if checkbox is checked */}
                            {needsTransportation && (
                                <div className="animate-fade-in mt-6">
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
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-indigo-300 shadow-sm text-sm sm:text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 group"
                  >
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 group-hover:bg-indigo-200 transition-colors duration-200">
                      <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                    </div>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!isStep2Complete} // Should always be enabled if step 1 is complete based on current logic
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 group"
                  >
                    <span className="mr-2">Review & Pay</span>
                     <div className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                        <ChevronRightIcon className="h-4 w-4 text-white" />
                     </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Payment */}
            {currentStep === 3 && (
              <div className="space-y-8 sm:space-y-10 animate-fade-in">
                {/* Review Card */}
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                  <div className="bg-white rounded-[15px] overflow-hidden">
                    <div className="p-6 md:p-8">
                       <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center mb-6 sm:mb-8">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                          </svg>
                          Review Your Booking
                       </h2>
                      <div className="space-y-6 sm:space-y-8">
                          {/* Facility & Date/Time Review */}
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                            {/* Facility Box */}
                            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 rounded-xl p-4 sm:p-5 border border-indigo-200/60 shadow-sm relative overflow-hidden group">
                              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 bg-indigo-400/10 rounded-full pointer-events-none"></div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /> </svg>
                                 Facility
                              </h3>
                              <div className="flex items-start">
                                 <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-indigo-200 bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <img src={facilityData.image} alt={facilityData.name} className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" />
                                 </div>
                                 <div className="ml-3 sm:ml-4">
                                    <p className="text-base sm:text-lg font-bold text-indigo-900 leading-tight">{facilityData.name}</p>
                                    <p className="text-xs text-indigo-700 flex items-center mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-400 flex-shrink-0"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                                      <span className="truncate">{facilityData.address}</span>
                                    </p>
                                 </div>
                              </div>
                           </div>

                            {/* Date & Time Box */}
                            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-xl p-4 sm:p-5 border border-purple-200/60 shadow-sm relative overflow-hidden group">
                                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-20 h-20 sm:w-24 sm:h-24 bg-purple-400/10 rounded-full pointer-events-none"></div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 flex items-center">
                                  <CalendarDaysIcon className="w-4 h-4 mr-1.5" /> Date & Time
                                </h3>
                                <p className="text-base sm:text-lg font-bold text-purple-900 leading-tight">
                                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) ?? 'Not Selected'}
                                </p>
                                <div className="flex items-center mt-1.5">
                                   <div className="p-1 bg-purple-100 rounded-full mr-2 shadow-sm ring-1 ring-purple-200/50"> <ClockIcon className="w-3.5 h-3.5 text-purple-700"/> </div>
                                   <p className="text-sm sm:text-base text-purple-800 font-medium">{selectedTime || 'Not Selected'}</p>
                                </div>
                                <p className="text-sm text-purple-700 flex items-center mt-2">
                                  <UserCircleIcon className="w-4 h-4 mr-1" />
                                  {participants} participant{parseInt(participants) !== 1 ? 's' : ''}
                                </p>
                           </div>
                          </div>

                          {/* Equipment Review */}
                          {Object.keys(selectedEquipment).length > 0 && Object.values(selectedEquipment).some(qty => qty > 0) && (
                             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-200/60 shadow-sm relative overflow-hidden group">
                              <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-blue-400/5 rounded-full pointer-events-none"></div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center">
                                  <SparklesIcon className="w-4 h-4 mr-1.5" /> Equipment Rental
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                  {Object.entries(selectedEquipment).map(([equipId, quantity]) => {
                                    if (quantity > 0) {
                                      const details = mockEquipmentDetails[equipId];
                                      const itemCost = (details?.pricePerHour || 0) * quantity * 2; // x2 for 2hr slot
                                      return (
                                        <div key={equipId} className="flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 shadow-sm border border-blue-100/70">
                                            <div className="flex items-center overflow-hidden">
                                               <div className="p-1.5 bg-blue-100 rounded-md mr-2 shadow-sm flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600"> <path d="M5.5 16a3.5 3.5 0 01-.369-6.98L7.89 6.25A3.5 3.5 0 0114.5 3.5a3.5 3.5 0 013.495 3.073L18 8a3 3 0 01-3 3h-1.5a.5.5 0 010-1H15a2 2 0 10-1.447-1.879l-2.516-.63a.5.5 0 01-.392-.475l-.214-1.63A2.5 2.5 0 009.5 4.5a2.5 2.5 0 00-2.456 2.158L6.67 8.846l-.36-.18A2.5 2.5 0 001.5 11a2.5 2.5 0 002.5 2.5h1.5a.5.5 0 010 1H4a3.5 3.5 0 011.5 2.5z" /> </svg></div>
                                               <span className="text-sm font-medium text-gray-800 truncate" title={details?.name || 'Equipment'}>{details?.name || 'Equipment'}</span>
                                               <span className="ml-1.5 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 flex-shrink-0">x{quantity}</span>
                                            </div>
                                            <span className="text-sm font-bold text-indigo-900 whitespace-nowrap ml-2">{formatCurrency(itemCost)}</span>
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
                            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl p-4 sm:p-5 border border-indigo-200/60 shadow-sm relative overflow-hidden group">
                              <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-24 h-24 sm:w-40 sm:h-40 bg-indigo-400/5 rounded-full pointer-events-none"></div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                                 Transportation
                              </h3>
                               <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-indigo-100/70">
                                 <div>
                                    <span className="text-sm font-medium text-gray-800">Round-trip service included</span>
                                    <span className="block text-xs text-indigo-700 mt-0.5">Door-to-door pickup & drop</span>
                                 </div>
                                 <div className="text-right">
                                    <span className="text-sm font-bold text-indigo-900">{formatCurrency(1000)}</span>
                                    <span className="block text-xs text-indigo-500 mt-0.5">Fixed rate</span>
                                 </div>
                              </div>
                           </div>
                          )}

                          {/* Special Requests Review */}
                          {specialRequests && (
                             <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-pink-100 rounded-xl p-4 sm:p-5 border border-purple-200/60 shadow-sm relative overflow-hidden group">
                                <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 bg-purple-400/5 rounded-full pointer-events-none"></div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                                   Special Requests
                                </h3>
                                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-purple-100/70">
                                   <p className="text-sm text-purple-900 italic">"{specialRequests}"</p>
                                </div>
                             </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>


                {/* Payment Card */}
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-px rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                   <div className="bg-white rounded-[15px] overflow-hidden">
                     <div className="p-6 md:p-8">
                       <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center mb-6 sm:mb-8">
                         <CreditCardIcon className="w-7 h-7 mr-3 text-indigo-500"/>
                         Payment Details
                       </h2>

                        {/* Price Breakdown */}
                       <div className="mb-8 sm:mb-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 border border-indigo-200/50 shadow-md relative overflow-hidden">
                          <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-32 h-32 sm:w-40 sm:h-40 bg-primary-400/5 rounded-full pointer-events-none"></div>
                          <div className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 w-40 h-40 sm:w-48 sm:h-48 bg-indigo-400/5 rounded-full pointer-events-none"></div>
                          <h4 className="text-base font-bold text-indigo-900 mb-4 flex items-center relative z-10">
                              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-primary-600"/>
                              Price Breakdown
                          </h4>
                          <div className="space-y-2 sm:space-y-3 relative z-10">
                              <div className="flex justify-between items-center pb-2 border-b border-indigo-100/80">
                                 <div className="flex items-center">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-indigo-100 flex items-center justify-center mr-2 sm:mr-3 shadow-sm flex-shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600"> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /> </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">Facility Booking <span className="text-gray-500 hidden sm:inline">({selectedTime})</span></span>
                                 </div>
                                 <span className="text-sm font-bold text-indigo-900">{formatCurrency(facilityData.hourlyRate)}</span>
                              </div>

                              {calculateEquipmentCost() > 0 && (
                                <div className="flex justify-between items-center pt-1 pb-2 border-b border-indigo-100/80">
                                   <div className="flex items-center">
                                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 shadow-sm flex-shrink-0">
                                         <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                      </div>
                                      <span className="text-sm text-gray-700">Equipment Rental</span>
                                   </div>
                                   <span className="text-sm font-bold text-indigo-900">{formatCurrency(calculateEquipmentCost())}</span>
                                </div>
                              )}

                              {needsTransportation && (
                                <div className="flex justify-between items-center pt-1 pb-2 border-b border-indigo-100/80">
                                   <div className="flex items-center">
                                     <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-purple-100 flex items-center justify-center mr-2 sm:mr-3 shadow-sm flex-shrink-0">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                                      </div>
                                      <span className="text-sm text-gray-700">Transportation</span>
                                   </div>
                                   <span className="text-sm font-bold text-indigo-900">{formatCurrency(1000)}</span>
                                </div>
                              )}

                              <div className="flex justify-between items-baseline pt-2 mt-1">
                                <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                                <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600">{formatCurrency(calculateTotalCost())}</span>
                              </div>
                          </div>
                       </div>

                        {/* Payment Form */}
                        <div className="space-y-5 sm:space-y-6">
                            {/* Card Info Section */}
                            <div className="relative group">
                              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-primary-400 via-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                              <div className="relative bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-sm border border-indigo-100 z-10 space-y-4">
                                  <div>
                                     <label htmlFor="card-holder" className="sr-only">Cardholder Name</label>
                                     <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserCircleIcon className="w-5 h-5 text-indigo-400"/></div>
                                        <input
                                            type="text" id="card-holder" name="cardHolder" required autoComplete='cc-name'
                                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 focus:ring-opacity-50 placeholder-gray-400"
                                            placeholder="Cardholder Name" value={paymentDetails.cardHolder} onChange={handlePaymentInputChange}
                                        />
                                    </div>
                                  </div>
                                  <div>
                                      <label htmlFor="card-number" className="sr-only">Card Number</label>
                                      <div className="relative">
                                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CreditCardIcon className="w-5 h-5 text-indigo-400"/></div>
                                          <input
                                              type="tel" id="card-number" name="cardNumber" required inputMode='numeric' pattern='[\d ]{16,19}' autoComplete='cc-number' maxLength={19}
                                              className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 focus:ring-opacity-50 placeholder-gray-400"
                                              placeholder="0000 0000 0000 0000" value={paymentDetails.cardNumber} onChange={handlePaymentInputChange}
                                          />
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                      <div>
                                          <label htmlFor="expiration" className="sr-only">Expiration Date (MM / YY)</label>
                                          <div className="relative">
                                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarDaysIcon className="w-5 h-5 text-indigo-400"/></div>
                                              <input
                                                  type="tel" id="expiration" name="expiration" required autoComplete='cc-exp' pattern='\d\d */ *\d\d' maxLength={7}
                                                  className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 focus:ring-opacity-50 placeholder-gray-400"
                                                  placeholder="MM / YY" value={paymentDetails.expiration} onChange={handlePaymentInputChange}
                                              />
                                          </div>
                                      </div>
                                      <div>
                                          <label htmlFor="cvc" className="sr-only">CVC</label>
                                          <div className="relative">
                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-indigo-400"> <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V6H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 7.5V5.5a3 3 0 10-6 0V8.5h6z" clipRule="evenodd" /> </svg></div>
                                             <input
                                                type="tel" id="cvc" name="cvc" required autoComplete='cc-csc' inputMode='numeric' pattern='\d{3,4}' maxLength={4}
                                                className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 focus:ring-opacity-50 placeholder-gray-400"
                                                placeholder="CVC" value={paymentDetails.cvc} onChange={handlePaymentInputChange}
                                              />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                           </div>

                          {/* Secure Payment Note */}
                           <p className="text-xs text-indigo-600 flex items-center justify-center sm:justify-start mt-1">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600"> <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V6H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 7.5V5.5a3 3 0 10-6 0V8.5h6z" clipRule="evenodd" /> </svg>
                             Secure payment processing. Your details are encrypted.
                           </p>

                           {/* Terms Checkbox */}
                           <div className="flex items-center">
                              <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                 I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 font-medium underline">Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 font-medium underline">Privacy Policy</a>.
                              </label>
                           </div>
                        </div>
                      </div>
                   </div>
                 </div>


                {/* Navigation & Submit */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border-2 border-indigo-300 shadow-sm text-sm sm:text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 group"
                  >
                     <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 group-hover:bg-indigo-200 transition-colors duration-200">
                       <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                     </div>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting} // Disable button when submitting
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 border border-transparent text-base sm:text-lg font-extrabold rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-[1.03] group
                      ${isSubmitting
                        ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white cursor-not-allowed opacity-80'
                        : 'bg-gradient-to-r from-indigo-600 via-primary-600 to-purple-600 text-white hover:from-indigo-700 hover:via-primary-700 hover:to-purple-700 hover:shadow-2xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>Complete Booking</span>
                        <span className="ml-2 hidden sm:inline px-2 py-0.5 rounded-md bg-white/20 text-xs font-bold">{formatCurrency(calculateTotalCost())}</span>
                        <div className="relative w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200 ml-2 sm:hidden">
                            <ChevronRightIcon className="h-4 w-4 text-white" />
                         </div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 lg:top-24">
              <div className="bg-gradient-to-br from-primary-500 via-indigo-600 to-purple-700 p-px rounded-2xl shadow-2xl">
                <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 rounded-[15px] overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-4 sm:py-5">
                       <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                          <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0"/>
                          Booking Summary
                       </h3>
                    </div>
                    <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
                        {/* Facility Info */}
                         <div className="flex items-start pb-4 sm:pb-5 border-b border-indigo-100/80">
                            <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm group">
                                <img src={facilityData.image} alt={facilityData.name} className="h-full w-full object-cover" />
                             </div>
                             <div className="ml-3 sm:ml-4 flex-1">
                               <h4 className="text-sm sm:text-base font-bold text-indigo-900 leading-snug">{facilityData.name}</h4>
                               <p className="text-xs text-indigo-700 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-400 flex-shrink-0"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                                <span className="truncate">{facilityData.location}</span>
                               </p>
                            </div>
                        </div>

                        {/* Dynamic Summary Items */}
                        <div className="flex justify-between items-center text-sm pb-2 border-b border-indigo-100/50">
                           <span className="font-medium text-indigo-800 flex items-center whitespace-nowrap mr-2">
                             <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-indigo-500"/> Date & Time
                           </span>
                           <div className="text-right">
                             <span className={`block font-bold ${selectedDate ? 'text-indigo-900' : 'text-gray-400'}`}>
                               {selectedDate ? selectedDate.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
                             </span>
                             <span className={`block text-xs mt-0.5 ${selectedTime ? 'text-indigo-700' : 'text-gray-400'}`}>
                               {selectedTime || 'Select time'}
                             </span>
                           </div>
                        </div>

                        <div className="flex justify-between items-center text-sm pb-2 border-b border-indigo-100/50">
                           <span className="font-medium text-indigo-800 flex items-center"> <UserCircleIcon className="w-4 h-4 mr-1.5 text-indigo-500"/> Participants </span>
                           <span className="text-indigo-900 font-bold"> {participants} {parseInt(participants) > 1 ? 'people' : 'person'} </span>
                        </div>

                       {calculateEquipmentCost() > 0 && (
                           <div className="pt-2 pb-2 border-b border-indigo-100/50">
                               <div className="flex justify-between items-center text-sm mb-2">
                                   <span className="font-medium text-indigo-800 flex items-center"> <SparklesIcon className="w-4 h-4 mr-1.5 text-indigo-500"/> Equipment </span>
                                   <span className="text-indigo-900 font-bold">{formatCurrency(calculateEquipmentCost())}</span>
                               </div>
                               {/* Optional: List individual items */}
                               {/* <div className="space-y-1 pl-5 text-xs">
                                   {Object.entries(selectedEquipment).map(([equipId, quantity]) => { ... })}
                               </div> */}
                           </div>
                       )}

                        {needsTransportation && (
                            <div className="flex justify-between items-center text-sm pt-2 pb-2 border-b border-indigo-100/50">
                               <span className="font-medium text-indigo-800 flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-indigo-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                                   Transportation
                               </span>
                               <span className="text-indigo-900 font-bold">{formatCurrency(1000)}</span>
                            </div>
                        )}


                        {/* Final Total */}
                        <div className="pt-3 sm:pt-4 mt-2">
                           <div className="flex justify-between items-baseline">
                             <span className="text-base font-bold text-indigo-900">Total Amount</span>
                             <span className={`text-xl sm:text-2xl font-black ${calculateTotalCost() > 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600' : 'text-gray-500'}`}>
                                {calculateTotalCost() > 0 ? formatCurrency(calculateTotalCost()) : formatCurrency(0)}
                              </span>
                           </div>
                            {calculateTotalCost() > 0 && <p className="text-xs text-indigo-500 text-right mt-0.5">Payable now</p>}
                        </div>

                        {/* Additional Information */}
                         <div className="mt-4 pt-4 border-t border-indigo-100 space-y-1.5">
                            <div className="flex items-center text-xs text-indigo-700/90">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-indigo-400 flex-shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                               <span>Check <a href="/cancellation-policy" target="_blank" rel="noopener noreferrer" className='underline hover:text-indigo-600'>cancellation policy</a>.</span>
                            </div>
                            <div className="flex items-center text-xs text-indigo-700/90">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-indigo-400 flex-shrink-0"><path d="M3.5 2A1.5 1.5 0 002 3.5v1.75c0 .414.336.75.75.75h14.5a.75.75 0 00.75-.75V3.5A1.5 1.5 0 0016.5 2h-13z" /><path d="M2 7.5v9A1.5 1.5 0 003.5 18h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0016.5 6h-13A1.5 1.5 0 002 7.5zm6.25 3.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" /></svg>
                               <span>Booking confirmation via email.</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div> {/* End Sidebar Column */}
        </div> {/* End Main Grid */}
      </div> {/* End Max Width Container */}
    </div> // End Top Level Div
  );
} // End BookingPage Component