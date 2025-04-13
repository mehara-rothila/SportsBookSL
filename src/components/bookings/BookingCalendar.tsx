'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getDay, isToday, isAfter, isBefore, isSameDay } from 'date-fns';

type BookingSlot = {
  time: string;
  available: boolean;
};

type DateAvailability = {
  date: Date;
  slots: BookingSlot[];
};

interface BookingCalendarProps {
  availableDates?: DateAvailability[];
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function BookingCalendar({
  availableDates = [],
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
  minDate = new Date(),
  maxDate = addMonths(new Date(), 3)
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<BookingSlot[]>([]);
  
  // Generate days for the calendar
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    setCalendarDays(daysInMonth);
  }, [currentMonth]);
  
  // Update available time slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const dateAvailability = availableDates.find(d => 
        isSameDay(new Date(d.date), selectedDate)
      );
      
      if (dateAvailability) {
        setAvailableTimeSlots(dateAvailability.slots);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  }, [selectedDate, availableDates]);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Check if a date has available slots
  const hasAvailableSlots = (date: Date) => {
    const dateAvailability = availableDates.find(d => 
      isSameDay(new Date(d.date), date)
    );
    
    return dateAvailability && dateAvailability.slots.some(slot => slot.available);
  };
  
  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    return isBefore(date, minDate) || 
           isAfter(date, maxDate) || 
           !hasAvailableSlots(date);
  };
  
  // Day name headers for the calendar
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Calculate empty cells at the start to align the calendar
  const startWeekday = getDay(startOfMonth(currentMonth));
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Calendar header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1">
          {/* Day names */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
          
          {/* Empty cells for alignment */}
          {Array.from({ length: startWeekday }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day) => {
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isDisabled = isDateDisabled(day);
            const availableDay = hasAvailableSlots(day);
            
            return (
              <button
                key={day.toString()}
                type="button"
                onClick={() => !isDisabled && onDateSelect(day)}
                disabled={isDisabled}
                className={`
                  relative p-2 rounded-full flex items-center justify-center transition-colors duration-200
                  ${isSelected ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                  ${!isSelected && !isDisabled ? 'hover:bg-gray-100' : ''}
                  ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}
                  ${isToday(day) && !isSelected ? 'border border-primary-500' : ''}
                `}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
                
                {/* Indicator for available days */}
                {availableDay && !isSelected && !isDisabled && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Time slots */}
      {selectedDate && availableTimeSlots.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-md font-medium mb-3">Available Times</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => slot.available && onTimeSelect(slot.time)}
                className={`
                  py-2 text-sm font-medium rounded-md text-center transition-colors duration-200
                  ${selectedTime === slot.time ? 'bg-primary-600 text-white' : ''}
                  ${!selectedTime && slot.available ? 'bg-white hover:bg-gray-100 border border-gray-300 text-gray-700' : ''}
                  ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* No available times message */}
      {selectedDate && availableTimeSlots.length === 0 && (
        <div className="border-t border-gray-200 p-4 text-center">
          <p className="text-gray-500">No available time slots for this date.</p>
        </div>
      )}
      
      {/* Summary of selection */}
      {selectedDate && selectedTime && (
        <div className="border-t border-gray-200 p-4 bg-primary-50">
          <div className="text-center">
            <p className="text-sm text-gray-600">Your selection:</p>
            <p className="font-medium text-gray-900">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}