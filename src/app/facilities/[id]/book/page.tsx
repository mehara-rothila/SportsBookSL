// src/app/facilities/[id]/book/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import BookingCalendar from '@/components/bookings/BookingCalendar';
import EquipmentRental from '../../../../components/equipment/EquipmentRental';
import TransportationBooking from '@/components/transportation/TransportationBooking';
import WeatherWidget from '@/components/weather/WeatherWidget';

// Mock facility data
const facilityData = {
  id: 'premadasa-cricket-stadium',
  name: 'Premadasa Cricket Stadium',
  location: 'Colombo, Sri Lanka',
  address: '223/1, Khettarama Road, Colombo 14, Sri Lanka',
  sportType: 'Cricket',
  isOutdoor: true,
  hourlyRate: 8000,
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'
};

// Mock availability data for the calendar
const availableDates = [
  {
    date: new Date(2025, 3, 15), // April 15, 2025
    slots: [
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true },
      { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true },
      { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true }
    ]
  },
  {
    date: new Date(2025, 3, 16), // April 16, 2025
    slots: [
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: false },
      { time: '12:00-14:00', available: false },
      { time: '14:00-16:00', available: true },
      { time: '16:00-18:00', available: true },
      { time: '18:00-20:00', available: true }
    ]
  },
  {
    date: new Date(2025, 3, 17), // April 17, 2025
    slots: [
      { time: '08:00-10:00', available: true },
      { time: '10:00-12:00', available: true },
      { time: '12:00-14:00', available: true },
      { time: '14:00-16:00', available: false },
      { time: '16:00-18:00', available: false },
      { time: '18:00-20:00', available: true }
    ]
  }
];

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<{[key: string]: number}>({});
  const [needsTransportation, setNeedsTransportation] = useState<boolean>(false);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [participants, setParticipants] = useState<string>('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For price calculation
  const calculateEquipmentCost = () => {
    // This would use actual equipment data in a real implementation
    return Object.values(selectedEquipment).reduce((sum, qty) => sum + (qty * 500), 0);
  };
  
  const calculateTotalCost = () => {
    const facilityCost = 8000; // Base rate
    const equipmentCost = calculateEquipmentCost();
    const transportationCost = needsTransportation ? 1000 : 0;
    
    return facilityCost + equipmentCost + transportationCost;
  };
  
  // Handle equipment selection from the EquipmentRental component
  const handleEquipmentSelect = (selections: {[key: string]: number}) => {
    setSelectedEquipment(selections);
  };
  
  // Handle booking submission
  const handleSubmitBooking = () => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      router.push('/bookings/confirmation');
    }, 2000);
  };
  
  const isFacilityBooked = !!selectedDate && !!selectedTime;
  
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Facility</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your booking at {facilityData.name}</p>
          
          {/* Booking Steps */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-500'}`}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-white border-2 border-gray-300'}`}>
                  1
                </span>
                <span className="ml-2 text-sm font-medium hidden sm:block">Select Date & Time</span>
              </div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-500'}`}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-white border-2 border-gray-300'}`}>
                  2
                </span>
                <span className="ml-2 text-sm font-medium hidden sm:block">Equipment & Transportation</span>
              </div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-500'}`}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-white border-2 border-gray-300'}`}>
                  3
                </span>
                <span className="ml-2 text-sm font-medium hidden sm:block">Review & Pay</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Date and Time Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Weather Widget */}
                <WeatherWidget 
                  facilityId={facilityData.id} 
                  facilityName={facilityData.name} 
                  isOutdoor={facilityData.isOutdoor} 
                  sportType={facilityData.sportType}
                  bookingDate={selectedDate?.toISOString().split('T')[0]}
                />
                
                {/* Calendar */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
                    <BookingCalendar 
                      availableDates={availableDates}
                      onDateSelect={setSelectedDate}
                      onTimeSelect={setSelectedTime}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                    />
                  </div>
                </div>
                
                {/* Additional Details */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                          Number of Participants
                        </label>
                        <select
                          id="participants"
                          name="participants"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          value={participants}
                          onChange={(e) => setParticipants(e.target.value)}
                        >
                          {[...Array(30)].map((_, i) => (
                            <option key={i} value={(i + 1).toString()}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          id="special-requests"
                          name="special-requests"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Any specific requirements or notes about your booking..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!isFacilityBooked}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      isFacilityBooked
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Equipment and Transportation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Equipment Rental */}
                <EquipmentRental 
                  facilityId={facilityData.id}
                  sportType={facilityData.sportType}
                  onEquipmentSelect={handleEquipmentSelect}
                />
                
                {/* Transportation Option */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Transportation</h2>
                    
                    <div className="mb-6">
                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="transportation"
                            name="transportation"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={needsTransportation}
                            onChange={() => setNeedsTransportation(!needsTransportation)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="transportation" className="font-medium text-gray-700">
                            I need transportation
                          </label>
                          <p className="text-gray-500">Book transportation to and from this facility</p>
                        </div>
                      </div>
                    </div>
                    
                    {needsTransportation && (
                      <TransportationBooking 
                        facilityId={facilityData.id}
                        facilityName={facilityData.name}
                        facilityAddress={facilityData.address}
                        bookingDate={selectedDate?.toLocaleDateString()}
                        bookingTime={selectedTime}
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Continue
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review and Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Booking</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Facility</h3>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 bg-cover rounded-md" style={{ backgroundImage: `url(${facilityData.image})` }}></div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{facilityData.name}</p>
                              <p className="text-xs text-gray-500">{facilityData.address}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Date & Time</h3>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <p className="text-sm text-gray-700">{selectedTime}</p>
                          <p className="text-xs text-gray-500 mt-1">{participants} participant{parseInt(participants) !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      
                      {Object.keys(selectedEquipment).length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Equipment Rental</h3>
                          <ul className="space-y-2">
                            {Object.entries(selectedEquipment).map(([equipId, quantity]) => (
                              <li key={equipId} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  {/* Using mock names here - in real app would look up equipment details */}
                                  {equipId === 'eq-1' ? 'Cricket Bat' : 
                                   equipId === 'eq-2' ? 'Cricket Ball (Set of 6)' : 
                                   equipId === 'eq-3' ? 'Batting Gloves' : 
                                   'Equipment'} × {quantity}
                                </span>
                                <span className="text-gray-900 font-medium">Rs. {quantity * 500}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {needsTransportation && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Transportation</h3>
                          <p className="text-sm text-gray-600">Round-trip transportation included</p>
                          <p className="text-sm text-gray-900 font-medium mt-1">Rs. 1,000</p>
                        </div>
                      )}
                      
                      {specialRequests && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Special Requests</h3>
                          <p className="text-sm text-gray-600">{specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
                    
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Facility Booking ({selectedTime})</span>
                        <span className="font-medium">Rs. 8,000</span>
                      </div>
                      
                      {Object.keys(selectedEquipment).length > 0 && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Equipment Rental</span>
                          <span className="font-medium">Rs. {calculateEquipmentCost()}</span>
                        </div>
                      )}
                      
                      {needsTransportation && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Transportation</span>
                          <span className="font-medium">Rs. 1,000</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">Rs. {calculateTotalCost()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700">
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          id="card-holder"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="card-number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="•••• •••• •••• ••••"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expiration"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="•••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Booking'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
              <div className="bg-primary-600 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-white">Booking Summary</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 bg-cover rounded-md" style={{ backgroundImage: `url(${facilityData.image})` }}></div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{facilityData.name}</h4>
                      <p className="text-sm text-gray-500">{facilityData.location}</p>
                    </div>
                  </div>
                  
                  {selectedDate && selectedTime && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Date & Time</h4>
                      <p className="text-sm text-gray-700">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-700">{selectedTime}</p>
                    </div>
                  )}
                  
                  {parseInt(participants) > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Participants</h4>
                      <p className="text-sm text-gray-700">{participants} participant{parseInt(participants) !== 1 ? 's' : ''}</p>
                    </div>
                  )}
                  
                  {Object.keys(selectedEquipment).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Equipment</h4>
                      <ul className="text-sm text-gray-700">
                        {Object.entries(selectedEquipment).map(([equipId, quantity]) => (
                          <li key={equipId}>
                            {/* Using mock names here - in real app would look up equipment details */}
                            {equipId === 'eq-1' ? 'Cricket Bat' : 
                             equipId === 'eq-2' ? 'Cricket Ball (Set of 6)' : 
                             equipId === 'eq-3' ? 'Batting Gloves' : 
                             'Equipment'} × {quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {needsTransportation && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Transportation</h4>
                      <p className="text-sm text-gray-700">Round-trip transportation included</p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Price Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Facility Fee</span>
                        <span>Rs. 8,000</span>
                      </div>
                      
                      {Object.keys(selectedEquipment).length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Equipment Rental</span>
                          <span>Rs. {calculateEquipmentCost()}</span>
                        </div>
                      )}
                      
                      {needsTransportation && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transportation</span>
                          <span>Rs. 1,000</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>Rs. {calculateTotalCost()}</span>
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