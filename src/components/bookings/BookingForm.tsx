'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookingFormProps {
  facilityId: string;
  facilityName: string;
}

export default function BookingForm({ facilityId, facilityName }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participants, setParticipants] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in a real app
  
  // Generate time slots for the select input
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };
  
  const timeOptions = generateTimeOptions();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!date || !startTime || !endTime) {
      setError('Please select date and time for your booking.');
      setIsLoading(false);
      return;
    }
    
    if (startTime >= endTime) {
      setError('End time must be after start time.');
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be an API call in a real application
      console.log('Booking:', { 
        facilityId, 
        date, 
        startTime, 
        endTime, 
        participants, 
        specialRequests 
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed
      window.location.href = `/bookings/confirmation?facility=${facilityId}`;
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Not logged in state
  if (!isLoggedIn) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-700 mb-4">Please sign in to book this facility.</p>
          <Link
            href="/login"
            className="btn-primary w-full"
          >
            Sign In
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          className="input-field"
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <select
            id="start-time"
            className="input-field"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          >
            <option value="">Select time</option>
            {timeOptions.map((time) => (
              <option key={`start-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <select
            id="end-time"
            className="input-field"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          >
            <option value="">Select time</option>
            {timeOptions.map((time) => (
              <option 
                key={`end-${time}`} 
                value={time}
                disabled={time <= startTime} // Disable times earlier than or equal to start time
              >
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Participants
        </label>
        <select
          id="participants"
          className="input-field"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        >
          {[...Array(30)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests (Optional)
        </label>
        <textarea
          id="special-requests"
          rows={3}
          className="input-field"
          placeholder="Any specific requirements or equipment needs..."
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        ></textarea>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          className={`w-full btn-primary py-3 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Book Now'
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        By clicking "Book Now" you agree to our{' '}
        <Link href="/terms" className="text-primary-600 hover:text-primary-500">
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link href="/cancellation-policy" className="text-primary-600 hover:text-primary-500">
          Cancellation Policy
        </Link>.
      </p>
    </form>
  );
}