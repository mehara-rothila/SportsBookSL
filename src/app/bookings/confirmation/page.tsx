'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, CalendarIcon, MapPinIcon, TruckIcon, TicketIcon, InformationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Added InformationCircleIcon, ArrowRightIcon

// Mock booking data (same as before)
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

  // Calculate countdown (same logic as before)
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

    setTimeRemaining(calculateTimeRemaining()); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  // Helper to format numbers with leading zeros
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    // Enhanced background and padding
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced main card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/75">
          {/* Enhanced Header Section */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 py-10 px-6 text-center relative overflow-hidden">
             {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dotted-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#dotted-pattern)"></rect></svg>
            </div>
            <CheckCircleIcon className="relative mx-auto h-20 w-20 text-white mb-5 animate-pulse" /> {/* Added subtle pulse */}
            <h1 className="relative text-4xl font-bold text-white tracking-tight">Booking Confirmed!</h1>
            <p className="relative mt-3 text-lg text-primary-100/90">
              Your facility booking is secured. Get ready for your session!
            </p>
          </div>

          {/* Enhanced Content Padding */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Enhanced Booking Details Section */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 sm:mb-0">Booking Details</h2>
                <span className="text-xs font-semibold bg-primary-100 text-primary-800 py-1.5 px-3 rounded-full uppercase tracking-wider self-start sm:self-center">
                  ID: {bookingData.id}
                </span>
              </div>

              <div className="space-y-6">
                {/* Detail Item Structure */}
                <div className="flex items-start">
                  <CalendarIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <p className="text-base font-medium text-gray-800">Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-gray-600">{bookingData.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <p className="text-base font-medium text-gray-800">Facility</p>
                    <p className="text-sm text-gray-600 font-semibold">{bookingData.facilityName}</p>
                    <p className="text-sm text-gray-600">{bookingData.facilityAddress}</p>
                  </div>
                </div>

                {bookingData.equipment.length > 0 && (
                  <div className="flex items-start">
                    <TicketIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0 mr-4" />
                    <div>
                      <p className="text-base font-medium text-gray-800">Equipment Rented</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                        {bookingData.equipment.map((item, index) => (
                          <li key={index}>{item.name} <span className="text-gray-500">(Qty: {item.quantity})</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {bookingData.hasTransportation && (
                  <div className="flex items-start">
                    <TruckIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0 mr-4" />
                    <div>
                      <p className="text-base font-medium text-gray-800">Transportation</p>
                      <p className="text-sm text-gray-600">Round-trip transportation included.</p>
                      <p className="text-xs text-gray-500 mt-1">Driver details will be shared closer to the booking date.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Amount */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-baseline">
                  <p className="text-base font-medium text-gray-700">Total Amount Paid</p>
                  <p className="text-2xl font-bold text-primary-700">Rs. {bookingData.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Countdown Section */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Until Your Booking</h3>

              {isExpired ? (
                <p className="text-lg text-gray-700 font-medium">Your booking time has passed.</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-4">
                  {/* Countdown Box */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/80 px-4 py-3 w-28 text-center shadow-sm">
                    <div className="text-4xl font-bold text-primary-600 tabular-nums">{formatTime(timeRemaining.hours)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hours</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/80 px-4 py-3 w-28 text-center shadow-sm">
                    <div className="text-4xl font-bold text-primary-600 tabular-nums">{formatTime(timeRemaining.minutes)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Minutes</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/80 px-4 py-3 w-28 text-center shadow-sm">
                    <div className="text-4xl font-bold text-primary-600 tabular-nums">{formatTime(timeRemaining.seconds)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Seconds</div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Important Information Section */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-amber-900 font-semibold flex items-center mb-3 text-lg">
                <InformationCircleIcon className="h-6 w-6 mr-2 text-amber-600" />
                Important Information
              </h3>
              <ul className="space-y-3 text-sm text-amber-800">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-amber-600 mt-0.5" />
                  <span>A detailed booking confirmation has been sent to your registered email address.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-amber-600 mt-0.5" />
                  <span>Cancellations are permitted up to 24 hours prior to the scheduled booking time via your profile.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-amber-600 mt-0.5" />
                  <span>Please plan to arrive at the facility at least 15 minutes before your scheduled start time.</span>
                </li>
                {bookingData.hasTransportation && (
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-amber-600 mt-0.5" />
                    <span>Your transportation provider and pickup details will be confirmed via SMS/Email 2 hours before pickup.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                href="/profile?tab=bookings" // Example: Link directly to bookings tab
                className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out"
              >
                View My Bookings
              </Link>
              <Link
                href="/facilities"
                className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out group"
              >
                Book Another Facility
                <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}