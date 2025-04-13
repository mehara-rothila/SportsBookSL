// src/app/facilities/[id]/book/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { ChevronRightIcon, ChevronLeftIcon, CheckIcon, CreditCardIcon, UserCircleIcon, CalendarDaysIcon, ClockIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/solid'; // Using solid icons
import BookingCalendar from '@/components/bookings/BookingCalendar';
import EquipmentRental from '../../../../components/equipment/EquipmentRental'; // Adjusted path based on previous examples
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
  // ... (same availability data as before) ...
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
  const searchParams = useSearchParams(); // Hook to read query parameters

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
    // Enhanced Page Background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 sm:py-20 relative overflow-hidden">
       {/* Subtle background pattern */}
       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px"
          }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Book Your Facility</h1>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            Complete your booking for <span className="font-semibold text-primary-700">{facilityData.name}</span> in just a few steps.
          </p>
        </div>

        {/* Enhanced Booking Steps Indicator */}
        <nav aria-label="Progress" className="mb-12 max-w-3xl mx-auto">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                {currentStep > step.id ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-primary-600 rounded-full" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className="relative w-10 h-10 flex items-center justify-center bg-primary-600 rounded-full hover:bg-primary-700 transition"
                      aria-label={`Go to step ${step.id}`}
                    >
                      <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                    </button>
                     <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-700 whitespace-nowrap">{step.name}</span>
                  </>
                ) : currentStep === step.id ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-gray-200 rounded-full" />
                    </div>
                    <div
                      className="relative w-10 h-10 flex items-center justify-center bg-white border-4 border-primary-600 rounded-full"
                      aria-current="step"
                    >
                      <span className="h-2.5 w-2.5 bg-primary-600 rounded-full" aria-hidden="true" />
                    </div>
                     <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary-600 whitespace-nowrap">{step.name}</span>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-gray-200 rounded-full" />
                    </div>
                    <div className="group relative w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400 transition">
                       <step.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition" aria-hidden="true" />
                    </div>
                     <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap">{step.name}</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Date and Time Selection */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                {/* Weather Widget Card */}
                 <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                    <WeatherWidget
                        facilityId={facilityData.id}
                        facilityName={facilityData.name}
                        isOutdoor={facilityData.isOutdoor}
                        sportType={facilityData.sportType}
                        bookingDate={selectedDate?.toISOString().split('T')[0]}
                    />
                 </div>

                {/* Calendar Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                  <div className="p-6 md:p-8 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                       <CalendarDaysIcon className="w-6 h-6 mr-2 text-primary-600"/>
                       Select Date & Time
                    </h2>
                  </div>
                  {/* Use the enhanced BookingCalendar */}
                  <BookingCalendar
                    availableDates={availableDates}
                    onDateSelect={setSelectedDate}
                    onTimeSelect={setSelectedTime}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                  />
                </div>

                {/* Additional Details Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <UserCircleIcon className="w-6 h-6 mr-2 text-primary-600"/>
                        Additional Details
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Participants
                        </label>
                        <select
                          id="participants"
                          name="participants"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5" // Adjusted padding
                          value={participants}
                          onChange={(e) => setParticipants(e.target.value)}
                        >
                          {[...Array(30)].map((_, i) => (
                            <option key={i} value={(i + 1).toString()}>{i + 1} Participant{i > 0 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests <span className="text-gray-500">(Optional)</span>
                        </label>
                        <textarea
                          id="special-requests"
                          name="special-requests"
                          rows={4} // Increased rows
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm placeholder:text-gray-400"
                          placeholder="e.g., Need specific net setup, accessibility requirements..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                        ></textarea>
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
                    className={classNames(
                      'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150 ease-in-out transform hover:scale-105',
                      isStep1Complete
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    )}
                  >
                    Continue to Add-ons
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Equipment and Transportation */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                 {/* Equipment Rental Card */}
                 <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                    <EquipmentRental
                        facilityId={facilityData.id}
                        sportType={facilityData.sportType}
                        onEquipmentSelect={handleEquipmentSelect}
                        initialSelections={selectedEquipment} // Pass initial state back
                    />
                 </div>

                {/* Transportation Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <SparklesIcon className="w-6 h-6 mr-2 text-secondary-500"/> {/* Changed Icon */}
                        Transportation Add-on
                    </h2>
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"> {/* Added background */}
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id="transportation"
                            name="transportation"
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                            checked={needsTransportation}
                            onChange={() => setNeedsTransportation(!needsTransportation)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label htmlFor="transportation" className="font-medium text-gray-900 cursor-pointer">
                            Need round-trip transportation?
                          </label>
                          <p className="text-gray-500">Convenient travel to and from the facility. (Est. Cost: {formatCurrency(1000)})</p>
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

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150 ease-in-out"
                  >
                    <ChevronLeftIcon className="mr-2 h-5 w-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!isStep2Complete} // Add logic if step 2 has requirements
                     className={classNames(
                      'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150 ease-in-out transform hover:scale-105',
                      isStep2Complete // Adjust condition if needed
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    )}
                  >
                    Review & Pay
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Payment */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                {/* Review Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Review Your Booking</h2>
                    <div className="space-y-6">
                      {/* Facility & Date/Time Review */}
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Facility</h3>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-14 w-14 bg-cover rounded-lg border border-gray-200" style={{ backgroundImage: `url(${facilityData.image})` }}></div>
                            <div className="ml-3">
                              <p className="text-base font-semibold text-gray-900">{facilityData.name}</p>
                              <p className="text-xs text-gray-500">{facilityData.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Date & Time</h3>
                          <p className="text-base font-semibold text-gray-900">
                            {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-base text-primary-700 font-medium">{selectedTime}</p>
                          <p className="text-xs text-gray-500 mt-1">{participants} participant{parseInt(participants) !== 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      {/* Equipment Review */}
                      {Object.keys(selectedEquipment).length > 0 && (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Equipment Rental</h3>
                          <ul className="space-y-2">
                            {Object.entries(selectedEquipment).map(([equipId, quantity]) => (
                              <li key={equipId} className="flex justify-between text-sm">
                                <span className="text-gray-700">
                                  {mockEquipmentDetails[equipId]?.name || 'Equipment'} × {quantity}
                                </span>
                                <span className="text-gray-900 font-medium">{formatCurrency((mockEquipmentDetails[equipId]?.pricePerHour || 0) * quantity * 2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Transportation Review */}
                      {needsTransportation && (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Transportation</h3>
                          <div className="flex justify-between text-sm">
                             <span className="text-gray-700">Round-trip service</span>
                             <span className="text-gray-900 font-medium">{formatCurrency(1000)}</span>
                          </div>
                        </div>
                      )}

                      {/* Special Requests Review */}
                      {specialRequests && (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Special Requests</h3>
                          <p className="text-sm text-gray-700 italic">{specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <CreditCardIcon className="w-6 h-6 mr-2 text-primary-600"/>
                        Payment Details
                    </h2>

                    {/* Price Breakdown */}
                    <div className="mb-8 p-4 bg-primary-50 rounded-lg border border-primary-200 space-y-2">
                       <h4 className="text-sm font-semibold text-primary-800 mb-2">Price Breakdown</h4>
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Facility Booking ({selectedTime})</span>
                         <span className="font-medium text-gray-800">{formatCurrency(facilityData.hourlyRate)}</span>
                       </div>
                       {Object.keys(selectedEquipment).length > 0 && (
                         <div className="flex justify-between text-sm">
                           <span className="text-gray-600">Equipment Rental</span>
                           <span className="font-medium text-gray-800">{formatCurrency(calculateEquipmentCost())}</span>
                         </div>
                       )}
                       {needsTransportation && (
                         <div className="flex justify-between text-sm">
                           <span className="text-gray-600">Transportation</span>
                           <span className="font-medium text-gray-800">{formatCurrency(1000)}</span>
                         </div>
                       )}
                       <div className="border-t border-primary-200 pt-3 mt-3">
                         <div className="flex justify-between text-base font-semibold">
                           <span className="text-primary-900">Total Amount Due</span>
                           <span className="text-primary-900">{formatCurrency(calculateTotalCost())}</span>
                         </div>
                       </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Holder Name
                        </label>
                        <input
                          type="text" id="card-holder" name="cardHolder" required
                          className="input-field-enhanced" // Use a reusable class
                          placeholder="As it appears on card"
                          value={paymentDetails.cardHolder} onChange={handlePaymentInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                         {/* Consider using a dedicated card input component library for masking/validation */}
                        <input
                          type="text" id="card-number" name="cardNumber" required
                          className="input-field-enhanced"
                          placeholder="0000 0000 0000 0000"
                           value={paymentDetails.cardNumber} onChange={handlePaymentInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text" id="expiration" name="expiration" required
                            className="input-field-enhanced"
                            placeholder="MM / YY"
                             value={paymentDetails.expiration} onChange={handlePaymentInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC / CVV
                          </label>
                          <input
                            type="text" id="cvc" name="cvc" required
                            className="input-field-enhanced"
                            placeholder="123"
                             value={paymentDetails.cvc} onChange={handlePaymentInputChange}
                          />
                        </div>
                      </div>
                       <p className="text-xs text-gray-500 flex items-center mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                          </svg>
                          Secure payment processing.
                       </p>
                    </div>
                  </div>
                </div>

                {/* Navigation & Submit */}
                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150 ease-in-out"
                  >
                    <ChevronLeftIcon className="mr-2 h-5 w-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    className={classNames(
                      'inline-flex items-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150 ease-in-out transform hover:scale-105',
                      isSubmitting
                        ? 'bg-primary-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600' // Gradient button
                    )}
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
                      `Pay ${formatCurrency(calculateTotalCost())} & Confirm`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24"> {/* Make sidebar sticky */}
              <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-lg border border-gray-200/75 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-5">
                  <h3 className="text-xl font-semibold leading-6 text-white flex items-center">
                     <ClockIcon className="w-6 h-6 mr-2"/>
                     Booking Summary
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {/* Facility Info */}
                  <div className="flex items-center pb-4 border-b border-gray-200">
                    <div className="flex-shrink-0 h-16 w-16 bg-cover rounded-lg border border-gray-200" style={{ backgroundImage: `url(${facilityData.image})` }}></div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold text-gray-900">{facilityData.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 mr-1 text-gray-400">
                           <path fillRule="evenodd" d="M8 16a.5.5 0 0 1-.5-.5V1.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 1 1-.708.708L8.5 1.707V15.5a.5.5 0 0 1-.5.5Z M1.146 4.854a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 4H13.293l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.293 5H2.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2Z" clipRule="evenodd" />
                         </svg>
                         {facilityData.location}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Summary Items */}
                  {selectedDate && selectedTime && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1.5 text-gray-400"/> Date & Time</span>
                      <span className="text-gray-800 text-right">{selectedDate.toLocaleDateString('en-CA')} <br/> {selectedTime}</span>
                    </div>
                  )}
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium flex items-center"><UserCircleIcon className="w-4 h-4 mr-1.5 text-gray-400"/> Participants</span>
                      <span className="text-gray-800">{participants}</span>
                    </div>

                  {Object.keys(selectedEquipment).length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                       <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Equipment</h4>
                       {Object.entries(selectedEquipment).map(([equipId, quantity]) => (
                         <div key={equipId} className="flex justify-between text-sm mb-1">
                           <span className="text-gray-600">{mockEquipmentDetails[equipId]?.name || 'Equipment'} × {quantity}</span>
                           <span className="text-gray-800">{formatCurrency((mockEquipmentDetails[equipId]?.pricePerHour || 0) * quantity * 2)}</span>
                         </div>
                       ))}
                    </div>
                  )}

                  {needsTransportation && (
                     <div className="pt-3 border-t border-gray-200">
                       <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Transportation</h4>
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Round-trip service</span>
                         <span className="text-gray-800">{formatCurrency(1000)}</span>
                       </div>
                    </div>
                  )}

                  {/* Final Total */}
                  <div className="border-t-2 border-primary-200 pt-4 mt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-semibold text-gray-900">Total Estimate</span>
                      <span className="text-2xl font-bold text-primary-700">{formatCurrency(calculateTotalCost())}</span>
                    </div>
                     <p className="text-xs text-gray-500 text-right mt-1">Payable on next step</p>
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

