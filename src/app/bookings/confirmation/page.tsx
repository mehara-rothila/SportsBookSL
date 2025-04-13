// src/app/bookings/confirmation/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, CalendarIcon, MapPinIcon, TruckIcon, TicketIcon } from '@heroicons/react/24/outline';

// Mock booking data
const bookingData = {
  id: 'BOOK-12345',
  facilityName: 'Premadasa Cricket Stadium',
  facilityAddress: '223/1, Khettarama Road, Colombo 14, Sri Lanka',
  date: '2025-04-15',
  time: '14:00-16:00',
  participants: 4,
  equipment: [
    { name: 'Cricket Bat', quantity: 2 },
    { name: 'Cricket Ball (Set of 6)', quantity: 1 }
  ],
  hasTransportation: true,
  totalAmount: 18000
};

export default function BookingConfirmationPage() {
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  
  // Calculate countdown to booking date
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const bookingDateTime = new Date(bookingData.date + 'T' + bookingData.time.split('-')[0] + ':00');
      const now = new Date();
      const difference = bookingDateTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { 
        hours: days * 24 + hours, 
        minutes, 
        seconds 
      };
    };
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    setTimeRemaining(calculateTimeRemaining());
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-600 py-8 px-6 text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-white mb-4" />
            <h1 className="text-3xl font-bold text-white">Booking Confirmed!</h1>
            <p className="mt-2 text-primary-100">Your facility booking has been successfully processed</p>
          </div>
          
          <div className="p-8">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                <span className="text-sm font-medium bg-primary-100 text-primary-800 py-1 px-2 rounded-full">
                  {bookingData.id}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Date & Time</p>
                    <p className="text-sm text-gray-500">
                      {new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-gray-500">{bookingData.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Facility</p>
                    <p className="text-sm text-gray-500">{bookingData.facilityName}</p>
                    <p className="text-sm text-gray-500">{bookingData.facilityAddress}</p>
                  </div>
                </div>
                
                {bookingData.equipment.length > 0 && (
                  <div className="flex items-start">
                    <TicketIcon className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Equipment</p>
                      <ul className="text-sm text-gray-500">
                        {bookingData.equipment.map((item, index) => (
                          <li key={index}>{item.name} × {item.quantity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {bookingData.hasTransportation && (
                  <div className="flex items-start">
                    <TruckIcon className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Transportation</p>
                      <p className="text-sm text-gray-500">Round-trip transportation included</p>
                      <p className="text-sm text-gray-500">Driver details will be shared before your booking date</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">Rs. {bookingData.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Until Your Booking</h3>
              
              {isExpired ? (
                <p className="text-gray-700">Your booking time has passed</p>
              ) : (
                <div className="flex space-x-4 justify-center">
                  <div className="bg-white rounded-lg shadow px-3 py-2 w-24 text-center">
                    <div className="text-3xl font-bold text-primary-600">{timeRemaining.hours}</div>
                    <div className="text-xs text-gray-500 uppercase">Hours</div>
                  </div>
                  <div className="bg-white rounded-lg shadow px-3 py-2 w-24 text-center">
                    <div className="text-3xl font-bold text-primary-600">{timeRemaining.minutes}</div>
                    <div className="text-xs text-gray-500 uppercase">Minutes</div>
                  </div>
                  <div className="bg-white rounded-lg shadow px-3 py-2 w-24 text-center">
                    <div className="text-3xl font-bold text-primary-600">{timeRemaining.seconds}</div>
                    <div className="text-xs text-gray-500 uppercase">Seconds</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h3 className="text-amber-800 font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>A booking confirmation has been sent to your email</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You can cancel your booking up to 24 hours before the scheduled time</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Please arrive 15 minutes before your booking time</span>
                </li>
                {bookingData.hasTransportation && (
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Your transportation details will be sent 2 hours before pickup</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/bookings"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View My Bookings
              </Link>
              <Link
                href="/facilities"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Book Another Facility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}